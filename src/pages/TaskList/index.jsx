import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "@/libs/react-redux";
import { taskAPI } from "../../services/api";

import styles from "./TaskList.module.scss";
import TaskItem from "@/components/TaskItem";
const TaskList = () => {
  console.log("TaskList component re-rendered");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.tasks || []);
  const loading = useSelector((state) => state.tasks?.loading || false);
  const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const data = await taskAPI.getAll();
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
        console.error("Error fetching tasks:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa task này?")) {
      return;
    }

    setDeletingIds((prev) => [...prev, id]);

    try {
      await taskAPI.delete(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Không thể xóa task. Vui lòng thử lại!");
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  };

  const handleCreateNew = () => {
    navigate("/new-task");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Danh sách Tasks</h1>
        <button style={styles.createButton} onClick={handleCreateNew}>
          + Tạo Task Mới
        </button>
      </div>

      {tasks.length === 0 ? (
        <div style={styles.emptyState}>
          <p>Chưa có task nào</p>
          <button style={styles.emptyButton} onClick={handleCreateNew}>
            Tạo task đầu tiên
          </button>
        </div>
      ) : (
        <div style={styles.taskList}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => handleEdit(task.id)}
              onDelete={() => handleDelete(task.id)}
              isDeleting={deletingIds.includes(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default TaskList;
