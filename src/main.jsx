import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "@/store/index.js";
import { Provider as ReduxProvider } from "@/contexts/ReduxProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
