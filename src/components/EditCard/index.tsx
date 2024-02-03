import { useState, useEffect, memo } from "react";
import { TCardMetadata } from "../Card";
import Modal from "../Modal";
import { TCard } from "../../helpers/store";
import { getFormattedDate } from "../../helpers/getFormattedDate";

type EditCardProps = {
  editCard: (card: TCard & TCardMetadata) => void;
  columnIndex: number;
  cardIndex: number;
  card: TCard;
  closeModal: () => void;
};

const EditCard: React.FC<EditCardProps> = ({ editCard, columnIndex, cardIndex, card, closeModal }) => {
  const [cardTitle, setCardTitle] = useState(card.title);
  const [hasError, setError] = useState(false);
  const [cardDescription, setCardDescription] = useState(card.description);
  
  useEffect(() => {
    setCardTitle(card.title);
    setCardDescription(card.description);
  }, [card]);

  const handleEditButtonClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardTitle) {
      setError(true);
      return;
    }

    setError(false);
    const date = getFormattedDate();
    editCard({ 
      columnIndex, 
      cardIndex, 
      title: cardTitle, 
      description: cardDescription, 
      date, 
    });
    closeModal();
  };

  return (
    <Modal onClose={closeModal}>
      <h2>Edit Card</h2>
      <form className="form" onSubmit={handleEditButtonClick}>
        <label>
          Card Title:
          <input type="text" value={cardTitle} onChange={e => setCardTitle(e.target.value)} />
        </label>
        <label>
          Card Description:
          <textarea value={cardDescription} onChange={e => setCardDescription(e.target.value)} />
        </label>
        <button type="submit">Save</button>
      </form>
      { hasError ? <div className="error">Card Title is required</div> : null} 
    </Modal>
  );
};

export default memo(EditCard);