// Libs
import createStore from "@/libs/redux";
// Reducers

import taskReducer from "./reducers/taskReducer";

// CreateStore nhận vào reducer và initState nếu thâm số thứ 2 là undifine thì khi gọi vào reducer nó lấy gia trị initState tron reducer
const store = createStore(taskReducer);

export default store;
