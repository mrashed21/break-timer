"use strict";
// import * as vscode from "vscode";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// let mainInterval: ReturnType<typeof setInterval> | undefined;
// let breakInterval: ReturnType<typeof setInterval> | undefined;
// let seconds = 0;
// export function activate(context: vscode.ExtensionContext) {
//   const statusBar = vscode.window.createStatusBarItem(
//     vscode.StatusBarAlignment.Right,
//     100
//   );
//   statusBar.text = getTimeDisplay();
//   statusBar.tooltip = "Time since VS Code opened";
//   statusBar.show();
//   mainInterval = setInterval(() => {
//     seconds++;
//     statusBar.text = getTimeDisplay();
//     // Every 50 minutes (3000 seconds)
//     if (seconds % 3000 === 0) {
//       vscode.window.showWarningMessage(
//         "⏳ 50 minutes passed! Please take a break for 5 minutes.",
//         "Start Break"
//       ).then((selection) => {
//         if (selection === "Start Break") {
//           startBreakCountdown();
//         }
//       });
//     }
//   }, 1000);
//   context.subscriptions.push(statusBar);
// }
// export function deactivate() {
//   if (mainInterval) clearInterval(mainInterval);
//   if (breakInterval) clearInterval(breakInterval);
// }
// function getTimeDisplay(): string {
//   const h = Math.floor(seconds / 3600)
//     .toString()
//     .padStart(2, "0");
//   const m = Math.floor((seconds % 3600) / 60)
//     .toString()
//     .padStart(2, "0");
//   const s = (seconds % 60).toString().padStart(2, "0");
//   return `⏱️ ${h}:${m}:${s}`;
// }
// function startBreakCountdown() {
//   let breakSeconds = 300; // 5 minutes
//   vscode.window.showInformationMessage("🚶 Break started: 5 minutes countdown!");
//   breakInterval = setInterval(() => {
//     breakSeconds--;
//     const m = Math.floor(breakSeconds / 60).toString().padStart(2, "0");
//     const s = (breakSeconds % 60).toString().padStart(2, "0");
//     vscode.window.setStatusBarMessage(`🧘 Break Time: ${m}:${s}`, 1000);
//     if (breakSeconds <= 0) {
//       clearInterval(breakInterval);
//       vscode.window.showInformationMessage("✅ Break over! You can start working again.");
//     }
//   }, 1000);
// }
const vscode = __importStar(require("vscode"));
let totalSeconds = 0;
let statusBar;
let timerInterval;
const WORK_DURATION = 50 * 60; // 50 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes
function activate(context) {
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.show();
    updateStatusBar();
    timerInterval = setInterval(() => {
        totalSeconds++;
        updateStatusBar();
        if (totalSeconds % (WORK_DURATION + BREAK_DURATION) % WORK_DURATION === 0) {
            clearInterval(timerInterval);
            startBreakWebView(context);
        }
    }, 1000);
    context.subscriptions.push(statusBar);
}
exports.activate = activate;
function deactivate() {
    if (timerInterval)
        clearInterval(timerInterval);
}
exports.deactivate = deactivate;
function updateStatusBar() {
    const h = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    statusBar.text = `⏱️ ${h}:${m}:${s}`;
    statusBar.tooltip = "Time since VS Code opened";
}
function startBreakWebView(context) {
    const panel = vscode.window.createWebviewPanel("breakTimer", "⏳ Break Time - 5 Minutes", vscode.ViewColumn.One, { enableScripts: true });
    panel.webview.html = getBreakHtml();
    panel.webview.onDidReceiveMessage((message) => {
        if (message.command === "breakFinished") {
            panel.dispose();
            vscode.window.showInformationMessage("✅ Break Over! Back to work.");
            startWorkTimer();
        }
    });
}
function startWorkTimer() {
    timerInterval = setInterval(() => {
        totalSeconds++;
        updateStatusBar();
        if (totalSeconds % (WORK_DURATION + BREAK_DURATION) % WORK_DURATION === 0) {
            clearInterval(timerInterval);
            startBreakWebView(vscode.extensions.getExtension("your.extension.id").extensionPath);
        }
    }, 1000);
}
function getBreakHtml() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 3rem;
          font-family: sans-serif;
          background-color: #1e1e1e;
          color: #00ffcc;
          flex-direction: column;
        }
        h2 { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <h2>Take a break</h2>
      <div id="timer">05:00</div>

      <script>
        let seconds = 300;
        const timerEl = document.getElementById("timer");

        const interval = setInterval(() => {
          seconds--;
          const m = String(Math.floor(seconds / 60)).padStart(2, '0');
          const s = String(seconds % 60).padStart(2, '0');
          timerEl.textContent = \`\${m}:\${s}\`;

          if (seconds <= 0) {
            clearInterval(interval);
            const vscode = acquireVsCodeApi();
            vscode.postMessage({ command: 'breakFinished' });
          }
        }, 1000);
      </script>
    </body>
    </html>
  `;
}
//# sourceMappingURL=extension.js.map