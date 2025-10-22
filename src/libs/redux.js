const __DO_NOT_USE__ActionTypes = {
  type: "@@redux/ManhThang.c.e.g.y.3.8",
};
// createStore nhận vào reducer và initState
const createStore = (reducer, initState) => {
  // nhận giá trị state khởi tạo và action hiện tại từ reducer
  let state = reducer(initState, __DO_NOT_USE__ActionTypes);

  // mảng này nhậ và các callback
  const listners = [];
  return {
    // getState trả về state và có thể cập nhật state khi dispatch thay đổi
    getState() {
      return state;
    },
    // dispatch nhận vào action
    // cập nhật state mới
    // gọi lại hàm listner khi đã cập  nhật song state
    dispatch(action) {
      state = reducer(state, action);
      listners.forEach((listner) => listner());
    },
    subscribe(listner) {
      // thêm callback vào mảng listners
      listners.push(listner);
      // hàm subscribe trả về callback và xử lý
      return () => {
        const index = listners.indexOf(listner);
        // xóa phản từ trong mảng
        listners.splice(index, 1);
      };
    },
  };
};
export default createStore;
