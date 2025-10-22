import React, { useState, useEffect, useRef } from "react";
import styles from "./TaskForm.module.scss";
const TaskForm = ({
  initialData = { name: "", priority: "Medium", completed: false },
  onSubmit,
  onCancel,
  submitText = "Lưu",
  isLoading = false,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [priority, setPriority] = useState(initialData.priority || "Medium");
  const [completed, setCompleted] = useState(initialData.completed || false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Auto focus khi component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const validateName = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return "Tên task không được để trống";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit({
      name: name.trim(),
      priority,
      completed,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>
          Tên Task <span style={styles.required}>*</span>
        </label>
        <input
          ref={inputRef}
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
          placeholder="Nhập tên task..."
          style={{
            ...styles.input,
            ...(error ? styles.inputError : {}),
            ...(isLoading ? styles.inputDisabled : {}),
          }}
        />
        {error && <div style={styles.errorMessage}>{error}</div>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="priority" style={styles.label}>
          Độ ưu tiên
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isLoading}
          style={{
            ...styles.select,
            ...(isLoading ? styles.inputDisabled : {}),
          }}
        >
          <option value="Low">Thấp</option>
          <option value="Medium">Trung bình</option>
          <option value="High">Cao</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={isLoading}
            style={styles.checkbox}
          />
          <span style={styles.checkboxText}>Đã hoàn thành</span>
        </label>
      </div>

      <div style={styles.buttonGroup}>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...styles.submitButton,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
        >
          {isLoading ? "Đang xử lý..." : submitText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          style={{
            ...styles.cancelButton,
            ...(isLoading ? styles.buttonDisabled : {}),
          }}
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
