// Components
import TaskForm from "@/components/TaskForm";
import { useDispatch, useSelector } from "@/libs/react-redux";
import {
  SET_ERROR,
  SET_LOADING,
  UPDATE_TASK,
} from "@/store/reducers/taskReducer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./EditTask.module.scss";
const API = "http://localhost:3001/tasks";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const disabled = useDispatch();
  const [task, setTask] = useState({});
  console.log(task);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    let timeoutId;
    disabled({
      type: SET_LOADING,
      payload: true,
    });

    fetch(`${API}/${id}`)
      .then((res) => {
        if (res.status === 404) {
          navigate("/todo-app");
          return;
        }
        if (!res.ok) throw new Error("Có lỗi khi lấy dữ liệu!");
        return res.json();
      })
      .then((data) => {
        timeoutId = setTimeout(() => {
          setTask(data);
          disabled({
            type: SET_LOADING,
            payload: false,
          });
        }, [1000]);
      })
      .catch((error) => {
        disabled({
          type: SET_ERROR,
          payload: error.message,
        });
      });
    return () => clearTimeout(timeoutId);
  }, [disabled, id, navigate]);

  const handleEditTask = async (task) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error("lỗi khi sửa task.");
      const updatedTask = await res.json();

      disabled({
        type: UPDATE_TASK,
        payload: updatedTask,
      });
      navigate("/todo-app");
    } catch (error) {
      disabled({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Edit Task #{id}</h1>
      </header>
      <main>
        <TaskForm
          inittialData={task}
          onSubmit={handleEditTask}
          submitText="Update"
          isLoading={loading}
        />
      </main>
    </div>
  );
}
export default EditTask;
