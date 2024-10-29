import { BrowserWindow, IpcMain } from "electron";

export default function IPC_Handler(IPC: IpcMain) {
  IPC.on("minimize", (event) =>
    BrowserWindow.fromId(event.sender.id)?.minimize(),
  );

  IPC.on("maximize", (event) => {
    const window = BrowserWindow.fromId(event.sender.id);

    if (window?.isMaximized()) window.restore();
    else window?.maximize();
  });

  IPC.on("close", (event) => BrowserWindow.fromId(event.sender.id)?.hide());
}
