/* VENDOR */
import { useState } from "react";
import { useSelector } from "react-redux";

/* APPLICATION */
import edit from "../icons/edit.svg";
import remove from "../icons/remove.svg";
import { selectAllCategories } from "../features/categoriesSlice";
import { ModalEditItem } from "../Modal/ModalEditItem";
import { ModalRemoveItem } from "../Modal/ModalRemoveItem";

// Лишняя обертка элементов в item. Как минимум из-за этого приходится писать дополнительный interface. А лучше было бы создать единый interface в отдельном файле и импортировать его, так как он используется как минимум в 3-х местах.
interface ListItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    category?: string;
  };
}

// Устаревший вариант объявления функционального компонента. Начиная с React 17 рекомендуется использовать такую запись:
// export const ListItem = ({ item }: ListItemProps) => {
export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  // Тут нужно использовать useAppSelector который был создан в app/hooks.ts
  const categories = useSelector(selectAllCategories),
    [editModalActive, setEditModalActive] = useState(false)
  //  Тут лучше использовать const, а не let. Из-за этого разработчик допустил баг в строке 64
  let [removeModalActive, setRemoveModalActive] = useState(false);

  return (
    // React фрагмент тут не нужен, так как тег <li> и так оборачивает всё в единый элемент
    <>
      <li className="list-item">
        <div className="list-item-col1">
          <div className="list-item-col1-row1">
            <h3 className="list-item-col1-row1__title">{item.name}</h3>
            {/* Лучше вынести это в функцию */}
            {item.category && (
              <span className="list-item-col1-row1__category">
                {
                  categories.find((category) => category.id === item.category)
                    ?.name
                }
              </span>
            )}
          </div>
          <div className="list-item-col1-row2">{item.description}</div>
        </div>
        <div className="list-item-col2">
          <button
            className="list-item-col2__btn"
            onClick={() => {
              setEditModalActive(true);
            }}
          >
            {/* Плохая практика вставлять svg иконки в тег <img>:
                1. Плохая кроссбраузерность - старые версии браузеров могут не распознать это изображение
                2. Браузеру сложно такое кешировать
                3. Теряется весь потенциал svg иконок (изменение цвета, анимаций и т.д.)
                Лучшим решением будет обернуть svg иконки в компонент и импортировать сюда
             */}
            <img src={edit} alt="edit" />
          </button>
          <button
            className="list-item-col2__btn"
            // Баг: state меняется напрямую а не через setRemoveModalActive(). Кнопка не работает
            onClick={() => {
                setRemoveModalActive(true)
            }}
          >
            <img src={remove} alt="remove" />
          </button>
        </div>
        <ModalEditItem
          item={item}
          active={editModalActive}
          setActive={setEditModalActive}
        />
        <ModalRemoveItem
          item={item}
          active={removeModalActive}
          setActive={setRemoveModalActive}
        />
      </li>
    </>
  );
};
