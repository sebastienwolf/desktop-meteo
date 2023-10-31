console.log("Hello from Electron 👋");
const {
  app,
  BrowserWindow,
  ipcMain,
  autoUpdater,
  dialog,
} = require("electron");
const path = require("path");
const { updateElectronApp, UpdateSourceType } = require("update-electron-app");
const os = require("os-utils");
const server = "https://github.com/sebastienwolf/desktop-meteo";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL({ url });

setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60000);

updateElectronApp();
//   {
//   updateSource: {
//     type: UpdateSourceType.ElectronPublicUpdateService,
//     repo: "sebastienwolf/desktop-meteo",
//   },
//   updateInterval: "1 hour",
//   logger: require("electron-log"),
// }

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
  autoUpdater();
});

app.whenReady().then(() => {
  ipcMain.handle("cpu", () => {
    return new Promise((resolve) => {
      os.cpuUsage(function (v) {
        console.log("CPU Usage (%): " + v);
        resolve(v);
      });
    });
  });

  ipcMain.handle("ping", () => "pong");
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "A new version has been downloaded. Restart the application to apply the updates.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
