import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Page from "../Page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
