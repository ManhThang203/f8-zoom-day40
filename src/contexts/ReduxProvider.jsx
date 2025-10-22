import { createContext } from "react";
// tạo create Context
const Context = createContext();

// Chuyền dữ liệu xuống các component con
const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
export { Context, Provider };
