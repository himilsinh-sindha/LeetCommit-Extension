document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['githubToken', 'selectedRepo'], ({ githubToken, selectedRepo }) => {
    if (githubToken) {
      setStatusMessage('GitHub token already stored.', 'success');
      document.getElementById('authorize').textContent = 'Authorized';
      fetchRepositories(githubToken);
    }
  });
});

document.getElementById('authorize').addEventListener('click', () => {
  setStatusMessage('Authorizing with GitHub...', 'info');
  chrome.identity.launchWebAuthFlow({
    url: `https://github.com/login/oauth/authorize?client_id=Ov23lidlyozRcd1ZTHD2&scope=repo`,
    interactive: true
  }, function (redirect_url) {
    if (chrome.runtime.lastError || !redirect_url) {
      setStatusMessage('Authorization failed.', 'error');
      console.error('Authorization failed:', chrome.runtime.lastError);
      return;
    }
    const code = new URL(redirect_url).searchParams.get('code');
    if (code) {
      fetch('https://leet-commit.vercel.app/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      })
      .then(response => response.json())
      .then(data => {
        const token = data.access_token;
        if (token) {
          chrome.storage.sync.set({ 'githubToken': token }, () => {
            setStatusMessage('Token stored successfully.', 'success');
            console.log('Token stored successfully');
            fetchRepositories(token);
          });
        } else {
          setStatusMessage('No token found in response.', 'error');
          console.error('No token found in response');
        }
      })
      .catch(error => {
        setStatusMessage('Failed to exchange code for token.', 'error');
        console.error('Failed to exchange code for token:', error);
      });
    } else {
      setStatusMessage('No code found in redirect URL.', 'error');
      console.error('No code found in redirect URL');
    }
  });
});

function fetchRepositories(token) {
  setLoading(true);
  fetch('https://api.github.com/user/repos', {
    headers: {
      'Authorization': `token ${token}`
    }
  })
  .then(response => {
    setLoading(false);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories: ' + response.statusText);
    }
    return response.json();
  })
  .then(repos => {
    const repoSelect = document.getElementById('repoSelect');
    repoSelect.innerHTML = '<option value="">Select Repository</option>';
    repos.forEach(repo => {
      const option = document.createElement('option');
      option.value = repo.full_name;
      option.textContent = repo.name;
      repoSelect.appendChild(option);
    });
    setStatusMessage('Repositories fetched successfully.', 'success');
    document.getElementById('authorize').textContent = 'Authorized';
    
    chrome.storage.sync.get('selectedRepo', ({ selectedRepo }) => {
      if (selectedRepo) {
        repoSelect.value = selectedRepo;
        // setStatusMessage('Selected repository: ' + selectedRepo.split('/').pop());
      }
    });
  })
  .catch(error => {
    setLoading(false);
    document.getElementById('authorize').textContent = 'Authorize GitHub';
    setStatusMessage('Failed to fetch repositories.', 'error');
    console.error(error);
  });
}

document.getElementById('commit').addEventListener('click', () => {
  chrome.storage.sync.get(['githubToken', 'selectedRepo'], ({ githubToken, selectedRepo }) => {
    if (!githubToken) {
      setStatusMessage('No GitHub token found. Please authorize first.', 'error');
      console.error('No GitHub token found. Please authorize first.');
      return;
    }
    const repo = document.getElementById('repoSelect').value;
    if (repo) {
      chrome.storage.sync.set({ 'selectedRepo': repo });
    } else if (!selectedRepo) {
      setStatusMessage('No repository selected.', 'error');
      return;
    }
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          const codeLanguageElement = document.querySelector('.flex.items-center.gap-2.pb-2.text-sm.font-medium.text-text-tertiary.dark\\:text-text-tertiary');
          if (!codeLanguageElement) {
            console.error('Failed to find the code language element');
            return { error: 'Failed to find the code language element' };
          }
          const codeLanguage = codeLanguageElement.textContent.replace("Code", "");
          // console.log("Selected Code Language:", codeLanguage);
          const languageToExtensionMap = {
            'C++': { extension: 'cpp', className: 'language-cpp' },
            'Python': { extension: 'py', className: 'language-python' },
            'Python3': { extension: 'py', className: 'language-python' },
            'JavaScript': { extension: 'js', className: 'language-javascript' },
            'Java': { extension: 'java', className: 'language-java' },
          };
          const languageDetails = languageToExtensionMap[codeLanguage];
          if (!languageDetails) {
            return { error: 'Unsupported or unknown programming language' };
          }
          // console.log("Selected Language Details :", languageDetails);
          const fileExtension = languageDetails.extension;
          const languageClass = languageDetails.className;
          const folderName = codeLanguage;
          const codeElement = document.querySelector(`code.${languageClass}`);
          // console.log("Selected Code Language:", codeElement);
          const titleElement = document.querySelector('.text-title-large a');
          if (codeElement && titleElement && fileExtension) {
            const code = codeElement.textContent;
            const title = titleElement.textContent.trim().replace(/\s+/g, '_') + '.' + fileExtension;
            // console.log("Title", title);
            return { code, title,folderName };
          } else if (!codeElement) {
            return { error: 'No code on screen' };
          } else {
            return null;
          }
        }
      }, (results) => {
        if (chrome.runtime.lastError || !results || !results[0] || results[0].result === null) {
          setStatusMessage('Failed to retrieve code or title from LeetCode.', 'error');
          console.error('Failed to retrieve code or title from LeetCode:', chrome.runtime.lastError);
          return;
        }
        if (results[0].result.error) {
          setStatusMessage(results[0].result.error, 'error');
          console.error(results[0].result.error);
          return;
        }
        const { code, title,folderName } = results[0].result;
        const currentRepo = repo || selectedRepo;
        if (!currentRepo) {
          setStatusMessage('No repository selected.', 'error');
          return;
        }
        setLoading(true);

        fetch(`https://api.github.com/repos/${currentRepo}/contents/${folderName}`, {
          headers: {
            'Authorization': `token ${githubToken}`
          }
        })
        .then(response => {
          if (response.status === 404) {
            const createFolderBody = {
              message: `Create ${folderName} folder`,
              content: btoa(''),
              path: `${folderName}/README.md` 
            };
            return fetch(`https://api.github.com/repos/${currentRepo}/contents/${folderName}/README.md`, {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(createFolderBody)
            });
          } else {
            // Folder exists, now commit the code
            return response.json();
          }
        })
        .then(() => {
          // Check if the file exists before updating it
          return fetch(`https://api.github.com/repos/${currentRepo}/contents/${folderName}/${title}`, {
            headers: {
              'Authorization': `token ${githubToken}`
            }
          });
        })
        .then(response => {
          const body = {
            message: 'Solved ' + title,
            content: btoa(code),
            path: `${folderName}/${title}`
          };
        
          if (response.ok) {
            return response.json().then(data => {
              body.sha = data.sha; 
              return fetch(`https://api.github.com/repos/${currentRepo}/contents/${folderName}/${title}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `token ${githubToken}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              });
            });
          } else if (response.status === 404) {
            // File doesn't exist, create it
            return fetch(`https://api.github.com/repos/${currentRepo}/contents/${folderName}/${title}`, {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            });
          }
        })
        .then(response => {
          setLoading(false);
          if (response.ok) {
            setStatusMessage('Code committed successfully.', 'success');
            console.log('Code committed successfully');
          } else {
            return response.json().then(data => {
              setStatusMessage('Failed to commit code: ' + data.message, 'error');
              console.error('Failed to commit code:', data.message);
            });
          }
        })
        .catch(error => {
          setLoading(false);
          setStatusMessage('Error committing code.', 'error');
          console.error('Error committing code:', error);
        });
      });
    });
  });
});

function setStatusMessage(message, type) {
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;

  if (type === 'success') {
    statusMessage.style.color = 'green';
  } else if (type === 'error') {
    statusMessage.style.color = 'red';
  } else {
    statusMessage.style.color = '#7f8c8d';
  }
}

function setLoading(isLoading) {
  const loadingIndicator = document.getElementById('loadingIndicator');
  loadingIndicator.style.display = isLoading ? 'block' : 'none';
}
