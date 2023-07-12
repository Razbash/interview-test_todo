/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import { ListItem } from "./ListItem";
import { selectAllTasks } from "../features/tasksSlice";

export const Tasks: React.FC = () => {
  const tasks = useSelector(selectAllTasks);

  return (
    <ul>
      {tasks.map((task) => (
        // В этом случае нет смысла обоачивать объект task в item, а лучше передать через деструктуризацию {...task}. Причину можно посмотреть в src/Lists/ListItem.tsx в строке 12
        <ListItem key={task.id} item={task} />
      ))}
    </ul>
  );
};
// Этот комментарий тут не к месту, в этом компоненте svg иконки даже не используются
// можно попробовать вынести svg в отдельный файл в виде кода
