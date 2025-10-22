import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../../libs/react-redux";
import { taskAPI } from "../../services/api";
import TaskForm from "../../components/TaskForm/TaskForm";
import styles from "./EditTask.module.scss";
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const task = tasks.find((t) => t.id === parseInt(id));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      // Si la tâche existe déjà dans le store
      if (task) {
        setTaskData(task);
        setIsLoading(false);
        return;
      }

      // Sinon, fetch depuis l'API
      try {
        const data = await taskAPI.getById(id);
        setTaskData(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching task:", err);
        // Task n'existe pas (404) ou autre erreur
        if (err.response?.status === 404) {
          alert("Task non trouvé!");
        }
        navigate("/");
      }
    };

    fetchTask();
  }, [id, task, navigate]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedTask = await taskAPI.update(id, formData);
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      navigate("/");
    } catch (err) {
      setError(err.message || "Không thể cập nhật task. Vui lòng thử lại!");
      console.error("Error updating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  if (!taskData) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Chỉnh sửa Task</h1>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      <TaskForm
        initialData={taskData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitText="Cập nhật"
        isLoading={isSubmitting}
      />
    </div>
  );
};
export default EditTask;
