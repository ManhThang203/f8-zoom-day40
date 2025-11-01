// React
import { useEffect, useState } from "react";
// libs
import { useDispatch, useSelector } from "@/libs/react-redux";
// Reducers
import {
  DELETE_TASK,
  SEARCH_TASK,
  SET_ERROR,
  SET_LOADING,
  SET_TASKS,
  UPDATE_TASK,
} from "@/store/reducers/taskReducer";
// Components
import Loading from "@/components/Loading";
import TaskItem from "@/components/TaskItem";
import Button from "@/components/Button";
// Scss
import styles from "./TaskList.module.scss";

import { Link } from "react-router";

const API = "http://localhost:3001/tasks";

function TaskList() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [deletedId, setDeletedId] = useState(null);

  const tasks = useSelector((state) => {
    const query = (state.searchQuery ?? "").toLowerCase();
    if (!query) return state.tasks;

    const filterTasks = state.tasks.filter((task) =>
      task.name.toLowerCase().includes(query)
    );
    return filterTasks;
  });

  console.log(tasks);

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  // Xử lý call api
  useEffect(() => {
    let timeoutId;
    const fetchTasks = async () => {
      try {
        dispatch({
          type: SET_LOADING,
          payload: true,
        });
        const res = await fetch(API);
        if (!res.ok) throw new Error("Call api thất bại.");

        const data = await res.json();

        timeoutId = setTimeout(() => {
          dispatch({
            type: SET_TASKS,
            payload: data,
          });
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
          dispatch({
            type: SET_ERROR,
            payload: null,
          });
        }, 1000);
      } catch (error) {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
      }
    };
    fetchTasks();

    // Hàm clear
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  // Hàm xử lý khi thay text input thay đổi
  const handleSearchTextChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    dispatch({
      type: SEARCH_TASK,
      payload: value,
    });
  };

  // Hàm xử lý cập nhật
  const handleEditTask = async (task) => {
    try {
      const res = await fetch(`${API}/${task.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ completed: task.completed }),
      });

      if (!res.ok) throw new Error("Đã xảy ra lỗi khi cập nhật.");

      const updatedTask = await res.json();

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    }
  };

  // Hàm sử lý xóa Task
  const handleDeleteTask = async (task) => {
    if (!confirm(`Bạn có chắc muốn xóa ${task.name} này không 🤔`)) return;

    setDeletedId(task.id);

    try {
      const res = await fetch(`${API}/${task.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Đã xảy ra lỗi khi xóa.");
      dispatch({
        type: DELETE_TASK,
        payload: task.id,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message,
      });
    } finally {
      setDeletedId(null);
    }
  };

  const showEmpty = tasks.length === 0;
  const showError = loading && error;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.titleHeading}>Todo App với Redux</h1>
          <div className={styles.inner}>
            <input
              type="text"
              placeholder="Tìm kiếm task mới"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <Link to={"new-task"}>
              <Button outline>Thêm Task Mới</Button>
            </Link>
          </div>
        </header>
        <main>
          {/* Task List */}
          {loading && <Loading />}
          {showError ?? <div className={styles.error}>💥 {error}</div>}
          {showEmpty ? (
            <ul className={styles.list}>
              <li className={styles.empty}>Chưa có task nào</li>
            </ul>
          ) : (
            <ul className={styles.list}>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDeleted={() => handleDeleteTask(task)}
                  isdeletedId={task.id === deletedId}
                />
              ))}
            </ul>
          )}

          {/* Task Item */}
        </main>
      </div>
    </div>
  );
}
export default TaskList;
