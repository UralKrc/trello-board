import { useState } from "react";
import { TCard } from "../../helpers/store";

type TAddCardProps = {
  addCardItem: (card: TCard & { columnIndex: number }) => void;
  columnIndex: number;
}

const AddCard: React.FC<TAddCardProps> = ({ addCardItem, columnIndex }) => {

  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [hasError, setError] = useState(false);

  const handleAddButtonClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardTitle) {
      setError(true);
      return;
    }
    
    setError(false);
    let timestamp = new Date();
    let date = new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' }).format(timestamp);
    addCardItem({
      columnIndex,
      title: cardTitle,
      description: cardDescription,
      date
    });
    setShowCard(false);
    setCardTitle('');
    setCardDescription('');
  };

  return (
    <>
      <button className="add-card-button" onClick={() => setShowCard(true)}
        type="button"
      >
        Add Card
      </button>
      { showCard ?
        <div className="card">
          <form onSubmit={handleAddButtonClick}>
            <input id="card-title"
              placeholder="Card Title"
              value={cardTitle}
              onChange={event => setCardTitle(event.target.value)} 
            />
            <input id="card-description"
              placeholder="Card Description"
              value={cardDescription}
              onChange={event => setCardDescription(event.target.value)} 
            />
            <div className="action-buttons">
              <button type="submit">
                Add Card
              </button>
              <button onClick={() => setShowCard(false)}>
                Cancel
              </button>
            </div>
          </form>
         { hasError ? <div className="error">Card Title is required</div> : null} 
        </div> :
        null
      }
    </>
  )
}

export default AddCard;