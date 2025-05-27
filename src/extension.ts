import * as vscode from "vscode";

let interval: ReturnType<typeof setInterval> | undefined;
let seconds = 0;

export function activate(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBar.text = getTimeDisplay();
  statusBar.tooltip = "Time since VS Code opened";
  statusBar.show();

  interval = setInterval(() => {
    seconds++;
    statusBar.text = getTimeDisplay();

    if (seconds % 3000 === 0) {
      vscode.window.showWarningMessage(
        "⏳ 50 minutes passed! Please take a break."
      );
    }
  }, 1000);

  context.subscriptions.push(statusBar);
}

export function deactivate() {
  if (interval) {
    clearInterval(interval);
  }
}

function getTimeDisplay(): string {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `⏱️ ${h}:${m}:${s}`;
}
