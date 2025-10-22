import React, { useState } from "react";
import styles from "./TaskItem.module.scss";
const TaskItem = ({ task, onEdit, onDelete, isDeleting = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa task này?")) {
      onDelete();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#f44336";
      case "Medium":
        return "#ff9800";
      case "Low":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "High":
        return "Cao";
      case "Medium":
        return "Trung bình";
      case "Low":
        return "Thấp";
      default:
        return priority;
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        ...(isHovered ? styles.containerHovered : {}),
        ...(task.completed ? styles.containerCompleted : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.content}>
        <div style={styles.mainInfo}>
          {task.completed && <span style={styles.checkIcon}>✓</span>}
          <h3
            style={{
              ...styles.title,
              ...(task.completed ? styles.titleCompleted : {}),
            }}
          >
            {task.name}
          </h3>
        </div>

        <div style={styles.meta}>
          <span
            style={{
              ...styles.priorityBadge,
              backgroundColor: getPriorityColor(task.priority),
            }}
          >
            {getPriorityText(task.priority)}
          </span>
          {task.completed && <span style={styles.statusBadge}>Hoàn thành</span>}
        </div>
      </div>

      <div style={styles.actions}>
        <button
          onClick={onEdit}
          disabled={isDeleting}
          style={{
            ...styles.editButton,
            ...(isDeleting ? styles.buttonDisabled : {}),
          }}
          onMouseEnter={(e) => {
            if (!isDeleting) {
              e.target.style.backgroundColor = "#1976D2";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#2196F3";
          }}
        >
          ✏️ Sửa
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            ...styles.deleteButton,
            ...(isDeleting ? styles.buttonDisabled : {}),
          }}
          onMouseEnter={(e) => {
            if (!isDeleting) {
              e.target.style.backgroundColor = "#d32f2f";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#f44336";
          }}
        >
          {isDeleting ? "⏳ Đang xóa..." : "🗑️ Xóa"}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
