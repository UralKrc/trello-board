import { DragEventHandler, memo } from "react";
import "./styles.css";

export type TCardMetadata = {
  cardIndex: number;
  columnIndex: number;
};

export type TCardProps = TCardMetadata & {
  title: string;
  description: string;
  date: string;
  removeCard: ({ cardIndex, columnIndex }: TCardMetadata) => void;
  editCard: ({ cardIndex, columnIndex }: TCardMetadata) => void;
  drag: (data: Omit<TCardProps, 'removeClick' | 'drag'>) => void;
};

function Card ({ 
  title, 
  description, 
  date, 
  cardIndex, 
  columnIndex, 
  removeCard,
  editCard,
  drag,
}: TCardProps) {
  const handleRemoveCard = () => {
    removeCard({ cardIndex, columnIndex });
  };

  const handleEditCard = () => {
    editCard({ cardIndex, columnIndex });
  };

  const handleDragStart: DragEventHandler<HTMLDivElement> = (event: React.DragEvent) => {
    const cardData = {
      title,
      description,
      cardIndex,
      columnIndex,
      date,
      editCard: () => handleEditCard(),
      removeCard: () => handleRemoveCard(),
    };

    event.dataTransfer.setData("text", JSON.stringify(cardData));
    drag(cardData);
  };

  return (
    <div className="card" draggable="true" onDragStart={handleDragStart}>
      <div>
        <span className="card-heading">Title</span>
        <div className="card-content">{title}</div>
        {
          description ? (
            <>
              <span className="card-heading">Description</span>
              <div className="card-description">
                {description}
              </div>
            </>
          ) : null
        }
      </div>
      <div>
        <span className="card-heading">Created At:</span>
        <div className="card-description">{date}</div>
      </div>
      <div className="action-buttons">
        <button onClick={handleEditCard}
            className="icon-button"
          >
          edit
        </button>
        <button onClick={handleRemoveCard}
          className="icon-button"
        >
          delete
        </button>
      </div>
    </div >
  );
}

export default memo(Card);