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
};

const Card: React.FC<TCardProps> = ({ 
  title, 
  description, 
  date, 
  cardIndex, 
  columnIndex, 
  removeCard, 
}) => {

  const handleRemoveCard = () => {
    removeCard({ cardIndex, columnIndex });
  };

  return (
    <div className="card">
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
        <button onClick={handleRemoveCard}
          className="icon-button"
        >
          delete
        </button>
      </div>
    </div >
  );
}

export default Card;