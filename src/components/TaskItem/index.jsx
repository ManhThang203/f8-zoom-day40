import clsx from "clsx";
// React
import { Link } from "react-router";
import { LuPen } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
// Components
import Button from "@/components/Button";
// Scss
import styles from "./TaskItem.module.scss";

function TaskItem({ task, onEdit, onDeleted }) {
  const badgeClass = clsx({
    [styles.badgeLow]: task.priority === "Low",
    [styles.badgeMedium]: task.priority === "Medium",
    [styles.badgeHight]: task.priority === "Hight",
  });
  return (
    <div className={styles.item}>
      {/* Item Left */}
      <label style={styles.itemLeft}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onEdit({ ...task, completed: !task.completed })}
        />
        <span
          className={clsx(styles.title, {
            [styles.done]: task.completed,
          })}
        >
          {task.name}
        </span>
      </label>
      {/* Item Right */}
      <div className={styles.itemRight}>
        <span className={clsx(styles.badge, badgeClass)}>{task.priority}</span>
        <Link to={`${task.id}/edit`}>
          <Button outline className={styles.btn}>
            <LuPen />
          </Button>
        </Link>
        <Button outline className={styles.btn} onClick={onDeleted}>
          <AiOutlineDelete />
        </Button>
      </div>
    </div>
  );
}
export default TaskItem;
