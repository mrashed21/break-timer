import * as vscode from "vscode";

let mainInterval: ReturnType<typeof setInterval> | undefined;
let breakInterval: ReturnType<typeof setInterval> | undefined;
let seconds = 0;

export function activate(context: vscode.ExtensionContext) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBar.text = getTimeDisplay();
  statusBar.tooltip = "Time since VS Code opened";
  statusBar.show();

  mainInterval = setInterval(() => {
    seconds++;
    statusBar.text = getTimeDisplay();

    // Every 50 minutes (3000 seconds)
    if (seconds % 3000 === 0) {
      vscode.window.showWarningMessage(
        "⏳ 50 minutes passed! Please take a break for 5 minutes.",
        "Start Break"
      ).then((selection) => {
        if (selection === "Start Break") {
          startBreakCountdown();
        }
      });
    }
  }, 1000);

  context.subscriptions.push(statusBar);
}

export function deactivate() {
  if (mainInterval) clearInterval(mainInterval);
  if (breakInterval) clearInterval(breakInterval);
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

function startBreakCountdown() {
  let breakSeconds = 300; // 5 minutes

  vscode.window.showInformationMessage("🚶 Break started: 5 minutes countdown!");

  breakInterval = setInterval(() => {
    breakSeconds--;

    const m = Math.floor(breakSeconds / 60).toString().padStart(2, "0");
    const s = (breakSeconds % 60).toString().padStart(2, "0");

    vscode.window.setStatusBarMessage(`🧘 Break Time: ${m}:${s}`, 1000);

    if (breakSeconds <= 0) {
      clearInterval(breakInterval);
      vscode.window.showInformationMessage("✅ Break over! You can start working again.");
    }
  }, 1000);
}
