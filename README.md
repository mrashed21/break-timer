# ⏱️ Break Timer Pro – A VS Code Productivity Extension

**Break Timer Pro** is a lightweight yet powerful Visual Studio Code extension that helps developers stay healthy and productive by reminding them to take regular breaks while coding.

If you're someone who spends long hours in front of the screen and often forgets to pause, this extension is designed just for you.

---

## 📌 Features

- ✅ **Auto Start**: The timer begins automatically when you open VS Code — no setup required.
- ⏳ **Live Time Display**: A live counter in the **bottom-right status bar** shows how long you’ve been coding.
- 🔔 **Break Reminders**: After every **50 minutes**, a visual alert notifies you to take a 5-minute break.
- ⚙️ **Minimal Interface**: Non-intrusive and smooth; works silently in the background.
- 🌙 **Lightweight & Fast**: Built with performance in mind — no bloat, just utility.

---

## 🖼️ Logo

![Break Timer Pro Logo](./images/logo.png)

---

## 💻 Installation

### Option 1: Install via VSIX

1. Download the `.vsix` file [Break Timer](./break-timer-pro-1.0.2.vsix).
2. Open VS Code and press `Ctrl+Shift+P` or `Cmd+Shift+P` to open the **Command Palette**.
3. Search for and select: **Extensions: Install from VSIX...**
4. Choose the downloaded `.vsix` file.
5. Restart VS Code, and the timer will start automatically.
___

or [ Download `Break Timer **.vsix` file and run the command ]
```
vs-code: code --install-extension break-timer-pro-1.0.2.vsix
```
```
vs-codium: codium --install-extension break-timer-pro-1.0.2.vsix
```

### Option 2: Build from Source

```bash
git clone https://github.com/mrashed21/break-timer.git
cd break-timer
npm install
npm run compile
vsce package
```
