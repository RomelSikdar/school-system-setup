import { Menu, Minus, Square, X } from "lucide-react";
import styles from "./style.module.css";

interface TitlebarProps {
  title?: string;
  draggable?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export default function TitleBar({
  title = "Electron App",
  draggable = false,
  onMinimize = () => {},
  onMaximize = () => {},
  onClose = () => {},
}: TitlebarProps) {
  return (
    <div
      className={`flex items-center justify-between bg-gray-800 text-white h-9 select-none ${draggable ? styles["draggable"] : ""}`}
    >
      <div
        className={`flex items-center px-2 h-full ${styles["non-draggable"]}`}
      >
        <Menu className="h-4 w-4 mr-2" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className={`flex ${styles["non-draggable"]}`}>
        <button
          onClick={onMinimize}
          className="px-4 h-9 hover:bg-gray-700 focus:outline-none"
          aria-label="Minimize"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={onMaximize}
          className="px-4 h-9 hover:bg-gray-700 focus:outline-none"
          aria-label="Maximize"
        >
          <Square className="h-4 w-4" />
        </button>
        <button
          onClick={onClose}
          className="px-4 h-9 hover:bg-red-600 focus:outline-none"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
