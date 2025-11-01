// React
import { useEffect, useRef, useState } from "react";
// Components
import Loading from "@/components/Loading";
import Button from "@/components/Button";
// Scss
import styles from "./TaskForm.module.scss";
import { Link } from "react-router";

function TaskForm({ inittialData, onSubmit, submitText, isLoading }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [titleNameError, setTitleNameError] = useState(null);
  const [titlePriorityError, setTitlePriorityError] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskName = name.trim();

    if (taskName === "") {
      setTitleNameError("🚨 Tiêu đề không được để trống!");
      inputRef.current.focus();
      return;
    }

    if (!priority) {
      setTitlePriorityError("🚨 Vui lòng chọn mức ưu tiên!");
      return;
    }

    // Cập nhật khi name và priority lên dữ liệu
    onSubmit({
      name: taskName,
      priority: priority,
    });
  };
  // focus vào Input
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Cập nhật state khi inittialData thay đổi cho các trường name và priority
  useEffect(() => {
    setName(inittialData?.name ?? "");
    setPriority(inittialData?.priority ?? "");
  }, [inittialData]);

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <div className={styles.field}>
        {/* Title */}
        <label>
          <span>Title</span>
          <input
            type="text"
            ref={inputRef}
            placeholder="Nhập tên công việc..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setTitleNameError(null);
            }}
          />
          {titleNameError ?? (
            <div className={styles.error}>{titleNameError}</div>
          )}
        </label>
        {/* Choose */}
        <div className={styles.block}>
          <label>Priority</label>
          <div className={styles.selecWrapper}>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setTitlePriorityError(null);
              }}
            >
              <option value="" disabled>
                Choose Task Priority
              </option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            {titlePriorityError ?? (
              <div className={styles.error}>{titlePriorityError}</div>
            )}
          </div>
        </div>
        {/* Btn */}
        <div className={styles.btnWapper}>
          <Button outline>{submitText}</Button>
          <Link to={"/todo-app"}>
            <Button outline>Cancel</Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
export default TaskForm;
