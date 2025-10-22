import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../libs/react-redux";
import { taskAPI } from "../../services/api";

import styles from "./NewTask.module.scss";
import TaskForm from "@/components/TaskForm";
const NewTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const newTask = await taskAPI.create(formData);
      dispatch({ type: "ADD_TASK", payload: newTask });
      navigate("/");
    } catch (err) {
      setError(err.message || "Không thể tạo task. Vui lòng thử lại!");
      console.error("Error creating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Tạo Task Mới</h1>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      <TaskForm
        initialData={{
          name: "",
          priority: "Medium",
          completed: false,
        }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitText="Tạo Task"
        isLoading={isSubmitting}
      />
    </div>
  );
};
export default NewTask;
