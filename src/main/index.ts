import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import IPC_Handler from "./IPC_Handler";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minHeight: 670,
    minWidth: 800,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      devTools: is.dev,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    if (is.dev) mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

/**
 * Sets up the Electron application when it is ready.
 * - Sets the application user model ID to "com.electron".
 * - Listens for the creation of a browser window and watches for window shortcuts.
 * - Creates the main window of the application.
 * - Listens for the activation of the application and creates a new window if no windows are open.
 * @returns None
 */
app.whenReady().then(() => {
  // Set app user model id for windows
  // TODO: set user model to company ID instead
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  /**
   * Creates a new window.
   * @returns None
   */
  createWindow();

  /**
   * Initializes the IPC handler with the ipcMain object.
   * @param {ipcMain} ipcMain - The ipcMain object to handle IPC communication.
   * @returns None
   */
  IPC_Handler(ipcMain);

  /**
   * Listens for the 'activate' event on the app and creates a new window if there are no windows open.
   * @param {string} 'activate' - The event to listen for.
   * @param {function} ()=> - The callback function to execute when the event is triggered.
   * @returns None
   */
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/**
 * Listens for the 'window-all-closed' event on the app and triggers the 'hide' function.
 * @param {string} event - The event to listen for ('window-all-closed').
 * @param {function} callback - The function to trigger when the event occurs (app.hide).
 * @returns None
 */
app.on("window-all-closed", () => {});
