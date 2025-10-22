import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_LOADING,
  SET_ERROR,
} from "@/store/tasks/actionType";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
