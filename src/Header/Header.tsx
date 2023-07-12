/* VENDOR */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* APPLICATION */
import "./Header.css";
import { ModalCreateItem } from "../Modal/ModalCreateItem";

export const Header = () => {
  const { pathname } = useLocation(),
    isCategories = pathname.includes("categories"),
    [createModalActive, setCreateModalActive] = useState(false);

  return (
    <header className="header">
      <h1 className="header-title">ToDo List</h1>
      {/* Меню можно вынести в отдельный компонент */}
      {/* В целом меню лучше полностью переписать. Все элементы меню вынести в массив и перебирать его. А проверять элемент меню на активный лучше через компонент NavLink
        <NavLink to={element.link} style={({isActive}) => ({className: isActive ? 'header-list-item header-list-item-active' : 'header-list-item'})}>
       */}
      <nav className="header-nav">
        <ul className="header-list">
          <li
            className={
              !isCategories
                ? "header-list-item header-list-item-active"
                : "header-list-item"
            }
          >
            <Link to="tasks">Задачи</Link>
          </li>
          <li
            className={
              isCategories
                ? "header-list-item header-list-item-active"
                : "header-list-item"
            }
          >
            <Link to="categories">Категории</Link>
          </li>
        </ul>
        <button
          className="header-button"
          onClick={() => {
            setCreateModalActive(true);
          }}
        >
          {isCategories ? "Добавить категорию" : "Добавить задачу"}
        </button>
      </nav>
      <ModalCreateItem
        active={createModalActive}
        setActive={setCreateModalActive}
      />
    </header>
  );
};
