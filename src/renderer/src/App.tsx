import { ThemeProvider } from "@renderer/components/theme-provider";
import Router from "@renderer/app/Router/Router";

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
}

export default App;
