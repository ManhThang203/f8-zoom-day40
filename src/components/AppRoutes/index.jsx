// React-router
import { HashRouter, Route, Routes } from "react-router";
// Layout
import DefaultLayout from "@/layout/DefaultLayout";
// Pages
import Home from "@/pages/Home";
import TodeApp from "@/pages/TodeApp";
import TaskList from "@/pages/TaskList";
import NewTask from "@/pages/NewTask";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="todo-app" element={<TodeApp />}>
            <Route index element={<TaskList />}></Route>
            <Route path="new" element={<NewTask />}></Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default AppRouter;
