// React
import { useNavigate } from "react-router";
// Libs
import { useDispatch, useSelector } from "@/libs/react-redux";
// Components
import TaskForm from "@/components/TaskForm";
// Reducers
import { ADD_TASK, SET_ERROR, SET_LOADING } from "@/store/reducers/taskReducer";
// Scss
import styles from "./NewTask.module.scss";

const API = "http://localhost:3001/tasks";

function NewTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loadingl);

  const handleCreateTask = async (task) => {
    const payload = {
      name: task.name,
      priority: task.priority,
      completed: false,
    };

    try {
      const res = await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Đã xảy ra lỗi khi tạo tác vụ mới.");

      const createdTask = await res.json();

      dispatch({
        type: ADD_TASK,
        payload: createdTask,
      });
      navigate("/todo-app");
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    } finally {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Create New Task</h1>
        </header>
        <main>
          <TaskForm
            inittialData={{ name: "", priority: "" }}
            onSubmit={handleCreateTask}
            submitText="Create"
            isLoading={loading}
          />
        </main>
      </div>
    </div>
  );
}
export default NewTask;
