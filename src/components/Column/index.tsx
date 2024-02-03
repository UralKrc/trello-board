import { ReactNode } from "react";
import "./styles.css";

export type TColumnProps = {
  index: number;
  label: string;
  remove: (key: number) => void;
  children: ReactNode;
}

const Column: React.FC<TColumnProps> = ({
  index,
  label,
  children,
  remove,
}: TColumnProps) => {

  const handleDeleteClick = () => {
    remove(index);
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
      <div className="cards">
        {children}
      </div>
    </div>
  )
}

export default Column;