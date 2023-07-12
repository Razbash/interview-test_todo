import "./ModalBtn.css";

interface ModalBtnProps {
  type?: string;
  children: React.ReactNode;
  size?: string;
  onClick: () => void;
}

// Для пропсов type и size лучше создать енумы и передавать в пропсы не строку а один из допустимых значений из enum. Так мы исключим возможность опечатки и будет проще отслеживать все комбинации состояний кнопки.
export const ModalBtn: React.FC<ModalBtnProps> = ({
  type,
  children,
  size,
  onClick,
}) => {
  //  Будет лучше так:
  //  const btnClass = `modalbtn ${type === "primary" ? "primary" : ""} ${size === "large" ? "large" : ""}`;
  const btnClass =
    type === "primary"
      ? size === "large"
        ? "modalbtn primary large"
        : "modalbtn primary"
      : "modalbtn";
  return (
    <button className={btnClass} onClick={onClick}>
      {/* Во всех сценариях этого приложения в children передается текст а не ReactNode. Лучше вместо children просто передавать текст в пропсах */}
      {children}
    </button>
  );
};
