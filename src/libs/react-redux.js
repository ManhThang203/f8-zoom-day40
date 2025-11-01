import { Context } from "@/contexts/ReduxProvider";
import { useContext, useEffect, useState } from "react";

// Trả ra store thông qua Context
function useStore() {
  const store = useContext(Context);
  return store;
}

// Trả ra hàm dispatch thông qua store
function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

// UseSelector nhận vào 1 callback và trong hàm callback nhận vào state và trả ra state tương ướng với gia trị và gán gia trị đó ra bên ngoài
// State được trả ra từ reducer và subscribe sẽ nghe thấy
// khi State thay dổi thì sẽ re-render lại component
function useSelector(selector) {
  const store = useStore();
  // selector(store.getState()) nhận vào giá trị mà người dùng muốn lấy làm gia trị khởi tạo
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    // subscribe lấy từ store
    // trong hàm subscribe sẽ lắng nghe sự thay đổi của state và re-render lại
    const unSubscribe = store.subscribe(() => {
      // selector(store.getState()) lấy ra gia trị cần lấy
      const nextState = selector(store.getState());
      if (state !== nextState) {
        setState(nextState);
      }
      return unSubscribe;
    });
  }, [selector, state, store]);

  return state;
}

export { useStore, useDispatch, useSelector };
