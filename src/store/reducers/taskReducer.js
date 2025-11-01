const initialState = {
  tasks: [],
  loading: false,
  error: null,
  searchQuery: "",
};

export const SET_TASKS = "SET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SEARCH_TASK = "SEARCH_TASK";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

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

    case SEARCH_TASK:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
