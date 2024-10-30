import TitleBar from "@renderer/components/TitleBar/TitleBar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
export default function Layout() {
  /**
   * Sends a minimize signal to the Electron main process to minimize the window.
   * @returns None
   */
  const handleMinimize = () => window.electron.ipcRenderer.send("minimize");

  /**
   * Sends a message to the Electron main process to maximize the window.
   * @returns None
   */
  const handleMaximize = () => window.electron.ipcRenderer.send("maximize");

  /**
   * Sends a close message to the Electron main process to close the window.
   * @returns None
   */
  const handleClose = () => window.electron.ipcRenderer.send("close");

  return (
    <div className="flex flex-col h-screen">
      <header className="relative top-0 w-full max-h-max">
        <TitleBar
          draggable
          icon={<Menu className="h-4 w-4 mr-2" />}
          onClose={handleClose}
          onMaximize={handleMaximize}
          onMinimize={handleMinimize}
        />
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
