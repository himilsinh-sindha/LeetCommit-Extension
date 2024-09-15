<p align="center">
  <img alt="" src="./images/icon128.png" width="128" height="128"/>
<h1 align="center">LeetCommit</h1>
<p align="center">
  <i>Automate Your LeetCode Submissions to GitHub 🚀</i>
</p>

**LeetCommit** is a Chrome extension designed to streamline the process of saving and managing your LeetCode solutions. By integrating directly with GitHub, this extension allows developers to automatically commit their LeetCode code submissions to their GitHub repositories, making it easier to track progress and maintain a personal code repository.

## Key Features

- **One-Time Authorization**: Authorize with GitHub just once and the extension will remember your details and last selected repository. 🔑
- **Automatic Filename Generation**: Fetches the problem title from LeetCode and uses it as the filename for the committed code (currently supports C++ only). 📄
- **Effortless Commit**: Push your LeetCode solutions to GitHub with a single click. ✅
- **Update Existing Solutions**: If a solution with the same filename already exists in your repository, it will be updated. 🔄

## Screenshots

Here are some screenshots showcasing the features of **LeetCommit**:

<table align="center">
  <tr>
    <td align="center">
      <img alt="LeetCommit Dashboard" src="./images/startup.png" width="150" style="max-width: 100%; height: auto;"/>
      <br/>
      <i>LeetCommit Startup Interface 🌟</i>
    </td>
    <td align="center">
      <img alt="LeetCommit Authorization" src="./images/permission.png" width="265" style="max-width: 100%; height: auto;"/>
      <br/>
      <i>GitHub Authorization 🔓</i>
    </td>
    <td align="center">
      <img alt="LeetCommit Success Message" src="./images/commitsuccess.png" width="150" style="max-width: 100%; height: auto;"/>
      <br/>
      <i>After Successful Commit 🎉</i>
    </td>
  </tr>
</table>

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

## Usage

1. **Solve a Problem on LeetCode**: Go to [LeetCode](https://leetcode.com) and solve any problem. 🧩
2. **Submit Your Solution**: After solving the problem, ensure it is successfully submitted and the code along with the analysis is visible on the screen. 📝
3. **Open LeetCommit**: Click on the **LeetCommit** extension icon in your browser toolbar. 🔧
4. **Select Repository**: Choose the GitHub repository where you want to commit your solution. 📂
5. **Commit to GitHub**: Click on **Commit to GitHub**. Your solution will be automatically committed and pushed to the selected GitHub repository. 🚀

   - **Note**: If there is no successfully submitted code on LeetCode, the extension will display an error message: **"No code on screen"**. ⚠️

## Contributing

Contributions are always welcome! If you’d like to improve this project:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request and describe the changes made.

## Issues

If you encounter any problems while using **LeetCommit**, feel free to open an issue [here](https://github.com/himilsinh-sindha/LeetCommit-Extension/issues). 🐛

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/himilsinh-sindha/LeetCommit-Extension/blob/main/LICENSE) file for details. 📜

---

If you find **LeetCommit** useful, please consider giving it a ⭐️ on GitHub to support its development and future improvements! 🙌

