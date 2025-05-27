# ⏱️ Break Timer – A VS Code Productivity Extension

**Break Timer** is a lightweight yet powerful Visual Studio Code extension that helps developers stay healthy and productive by reminding them to take regular breaks while coding.

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

![Break Timer Logo](./images/logo.png)

_Designed using AI – clean, minimal, and symbolic of a peaceful break._

---

## 💻 Installation

### Option 1: Install via VSIX

1. Download the `.vsix` file from the [Releases](https://github.com/your-username/break-timer/releases) page.
2. Open VS Code and press `Ctrl+Shift+P` or `Cmd+Shift+P` to open the **Command Palette**.
3. Search for and select: **Extensions: Install from VSIX...**
4. Choose the downloaded `.vsix` file.
5. Restart VS Code, and the timer will start automatically.

### Option 2: Build from Source

```bash
git clone https://github.com/your-username/break-timer.git
cd break-timer
npm install
npm run compile
vsce package
```
