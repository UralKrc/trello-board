import { DragEventHandler, ReactNode } from "react";
import "./styles.css";

export type TColumnProps = {
  index: number;
  label: string;
  remove: (key: number) => void;
  children: ReactNode;
  dropCard: (columnIndex: number) => void;
}

function Column ({
  index,
  label,
  children,
  remove,
  dropCard,
}: TColumnProps) {
  const handleDeleteClick = () => {
    remove(index);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    dropCard(index);
  };

  const allowDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
  };

  return (
    <div className="column">
      <div className="container">
        <div className="column-header">
          <h4 className="">{label}</h4>
          <button 
            type="button"
            className="close-button"
            onClick={handleDeleteClick}>
              &times;
            </button>
        </div>
      </div>
      <div 
        className="cards" 
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onDragEnter={allowDrop}
      >
        {children}
      </div>
    </div>
  )
}

export default Column;