// React-router
import { HashRouter, Route, Routes } from "react-router";
// Layout
import DefaultLayout from "@/layout/DefaultLayout";
// Pages
import Home from "@/pages/Home";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default AppRouter;
