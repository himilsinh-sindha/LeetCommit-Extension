<p align="center">
  <img alt="" src="./images/icon128.png" width="128" height="128"/>
<h1 align="center">LeetCommit</h1>
<p align="center">
  <i>Automate Your LeetCode Submissions to GitHub 🚀</i>
</p>


**LeetCommit** is a Chrome extension that allows you to commit your LeetCode solutions directly to your GitHub repository. This extension simplifies the process of saving your coding solutions by automating the commit process.

## Features

- **Authorize with GitHub** to access your repositories.
- **Select a repository** to commit your solutions.
- **Automatically fetch the problem title** and use it as the filename. (Currently,it supports only CPP)
- **Commit your LeetCode solutions** with a single click.
- **Update existing solutions** if the file already exists in the repository.

  ---

## Screenshots

Here are some screenshots showcasing the features of **LeetCommit**:

<table align="center">
  <tr>
    <td align="center">
      <img alt="LeetCommit Dashboard" src="./images/startup.png" width="150" style="max-width: 100%; height: auto;"/>
      <br/>
      <i>Figure 1: LeetCommit dashboard for selecting a repository and pushing solutions</i>
    </td>
    <td align="center">
      <img alt="LeetCommit Authorization" src="./images/permission.png" width="400" style="max-width: 100%; height: auto;"/>
      <br/>
      <i>Figure 2: GitHub authorization interface</i>
    </td>
    <td align="center">
      <img alt="LeetCommit Success Message" src="./images/commitsuccess.png" width="150" style="max-width: 100%; height: auto;"/>
      <br/>
      <i>Figure 3: Success message after pushing the solution to GitHub</i>
    </td>
  </tr>
</table>



---

## Installation

### Install from GitHub

1. Clone or download this repository to your local machine.

   ```bash
   git clone https://github.com/himilsinh-sindha/LeetCommit-Extension.git
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Toggle **Developer Mode** on (top right corner).

4. Click on **Load unpacked** and select the folder where you cloned/downloaded the extension (the root folder containing `manifest.json`).

5. The **LeetCommit** extension will now appear in your Chrome extensions list.

### Set Up GitHub Authentication

1. After installing the extension, open **LeetCommit** by clicking on its icon in the Chrome toolbar.
2. Enter your **GitHub personal access token** to enable the extension to push code on your behalf. If you do not have a token, you can create one by following these steps:
   - Go to [GitHub Developer Settings](https://github.com/settings/tokens).
   - Click on **Generate new token**, and make sure to enable `repo` access.
   - Copy the generated token and paste it into the extension.
3. Customize your GitHub repository name, commit message format, and file naming conventions in the settings panel.

## Usage

1. Solve any problem on [LeetCode](https://leetcode.com).
2. Open **LeetCommit** and choose the problem solution you want to push to GitHub.
3. Click **Push to GitHub**, and the solution will be automatically committed and pushed to your configured GitHub repository.

## Contributing

Contributions are always welcome! If you’d like to improve this project:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request and describe the changes made.

## Issues

If you encounter any problems while using **LeetCommit**, feel free to open an issue [here](https://github.com/himilsinh-sindha/LeetCommit-Extension/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/himilsinh-sindha/LeetCommit-Extension/blob/main/LICENSE) file for details.
