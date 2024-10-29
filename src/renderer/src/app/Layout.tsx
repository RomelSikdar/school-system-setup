import TitleBar from "@renderer/components/TitleBar/TitleBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const handleMinimize = () => window.electron.ipcRenderer.send("minimize");

  const handleMaximize = () => window.electron.ipcRenderer.send("maximize");

  const handleClose = () => window.electron.ipcRenderer.send("close");

  return (
    <>
      <TitleBar
        draggable
        onClose={handleClose}
        onMaximize={handleMaximize}
        onMinimize={handleMinimize}
      />
      <Outlet />
    </>
  );
}
