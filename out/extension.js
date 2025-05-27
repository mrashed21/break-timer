"use strict";
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
const vscode = __importStar(require("vscode"));
let mainInterval;
let breakInterval;
let seconds = 0;
function activate(context) {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.text = getTimeDisplay();
    statusBar.tooltip = "Time since VS Code opened";
    statusBar.show();
    mainInterval = setInterval(() => {
        seconds++;
        statusBar.text = getTimeDisplay();
        // Every 50 minutes (3000 seconds)
        if (seconds % 3000 === 0) {
            vscode.window.showWarningMessage("⏳ 50 minutes passed! Please take a break for 5 minutes.", "Start Break").then((selection) => {
                if (selection === "Start Break") {
                    startBreakCountdown();
                }
            });
        }
    }, 1000);
    context.subscriptions.push(statusBar);
}
exports.activate = activate;
function deactivate() {
    if (mainInterval)
        clearInterval(mainInterval);
    if (breakInterval)
        clearInterval(breakInterval);
}
exports.deactivate = deactivate;
function getTimeDisplay() {
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
//# sourceMappingURL=extension.js.map