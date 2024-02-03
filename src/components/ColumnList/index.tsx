import { useState, memo } from "react";
import store, { TCard, TColumn } from "../../helpers/store";
import Column from "./Column";
import Card, { TCardMetadata, TCardProps } from "../../components/Card";
import NewCard from "../NewCard";
import EditCardModal from "../EditCardModal";

export type TSelectedCard = {
  cardIndex: number;
  columnIndex: number;
  card: TCard;
};

const selectedCardData: TSelectedCard = {
  cardIndex: -1, 
  columnIndex: -1, 
  card: { title: '', description: '', date: '' },
};

export type TColumnListProps = {
  columns: TColumn[];
  setColumns: (columns: TColumn[]) => void;
};

function ColumnList ({ columns, setColumns } : TColumnListProps) {
  let draggedCard: Omit<TCardProps, 'removeClick' | 'drag'>;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(selectedCardData);

  const handleColumnRemove = (key: number) => {
    columns.splice(key, 1);
    setColumns([...columns]);
    store.data = columns;
  };

  const handleAddCard = ({ title, description, date, columnIndex }: TCard & { columnIndex: number }) => {
    const cardList = columns[columnIndex];
    cardList.cards.push({ title, description, date })

    cardList.cards.sort((a, b) => {
      return +new Date(b.date) - +new Date(a.date);
    });
    setColumns([...columns]);
    store.data = columns;
  }

  const handleCardRemove = ({ columnIndex, cardIndex }: TCardMetadata) => {
    const cardList = columns[columnIndex];
    cardList.cards.splice(cardIndex, 1);
    setColumns([...columns]);
    store.data = columns;
  }

  const handleEditCard = ({ columnIndex, cardIndex, title, description, date }: TCard & TCardMetadata) => {
    const cardList = columns[columnIndex];
    const card = cardList.cards[cardIndex];
  
    card.title = title;
    card.description = description;
    card.date = date;
  
    setColumns([...columns]);
    store.data = columns;
  }

  const handleEditButton = ({ columnIndex, cardIndex }: TCardMetadata) => {
    setSelectedCard({ columnIndex, cardIndex, card: columns[columnIndex].cards[cardIndex] });
    setEditModalOpen(true);
  };

  const setDragged = (card: Omit<TCardProps, 'removeClick' | 'drag'>) => {
    draggedCard = card
  }

  const dropCard = (columnIndex: number) => {
    const movedToColumn = columns[columnIndex];
    const movedFromColumn = columns[draggedCard.columnIndex];
    movedFromColumn.cards.splice(draggedCard.cardIndex, 1);
    movedToColumn.cards.unshift({
      title: draggedCard.title,
      description: draggedCard.description,
      date: draggedCard.date
    });
    movedToColumn.cards.sort((a, b) => {
      return +new Date(b.date) - +new Date(a.date);
    });
    setColumns([...columns]);
    store.data = columns;
  }

  return (
    <section>
      {columns.map(({ label, cards }, columnIndex) => (
        <Column 
          label={label}
          remove={handleColumnRemove}
          key={columnIndex}
          index={columnIndex}
          dropCard={dropCard}
          >
          {cards.map(({ title, description, date }, cardIndex) => (
            <Card
              title={title}
              date={date}
              description={description}
              cardIndex={cardIndex}
              columnIndex={columnIndex}
              removeCard={handleCardRemove}
              editCard={handleEditButton}
              drag={setDragged}
              key={cardIndex} 
            />
          ))}
          <NewCard
            columnIndex={columnIndex}
            addCardItem={handleAddCard} 
          />
        </Column>
      ))}
      {
        isEditModalOpen && (
          <EditCardModal
            columnIndex={selectedCard.columnIndex}
            cardIndex={selectedCard.cardIndex}
            card={selectedCard.card}
            closeModal={() => setEditModalOpen(false)}
            editCard={handleEditCard}
          />
        )
      }
    </section>
  )
}

export default memo(ColumnList);