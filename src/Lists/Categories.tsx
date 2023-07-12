/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import { ListItem } from "./ListItem";
import { selectAllCategories } from "../features/categoriesSlice";

export const Categories = () => {
  const categories = useSelector(selectAllCategories);

  return (
    <ul>
      {categories.map((category) => (
        // Тут таже проблема что и в Lists/Tasks.tsx
        <ListItem key={category.id} item={category} />
      ))}
    </ul>
  );
};
