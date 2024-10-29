import TitleBar from "@renderer/components/TitleBar/TitleBar";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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

  const Bubble = ({ delay }) => (
    <motion.div
      className="absolute rounded-full bg-blue-200 opacity-70"
      initial={{ y: "100%", scale: 0, opacity: 0 }}
      animate={{
        y: "-100%",
        scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
        opacity: [0.7, 0.4, 0.7, 0.4, 0.7, 0],
      }}
      transition={{
        duration: 4,
        delay,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        repeat: Infinity,
      }}
      style={{
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 30 + 10}px`,
        height: `${Math.random() * 30 + 10}px`,
      }}
    />
  );

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  const bubbles = Array.from({ length: 20 }, (_, i) => (
    <Bubble key={i} delay={Math.random() * 2} />
  ));

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <TitleBar
        draggable
        onClose={handleClose}
        onMaximize={handleMaximize}
        onMinimize={handleMinimize}
      />

      <div className="flex-1 bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          {showSplash ? (
            <motion.div
              key="splash"
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 2 }}
            >
              {bubbles}
              <motion.div
                className="z-10 text-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                <motion.div
                  className="w-32 h-32 bg-white flex items-center justify-center mb-4 mx-auto"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-24 h-24 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20, x: 0 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1, y: 0, x: 0 }}
                >
                  Bubble App
                </motion.h1>
                <motion.p
                  className="text-xl text-white"
                  initial={{ opacity: 0, y: 20, x: 0 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  Dive into something new
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
