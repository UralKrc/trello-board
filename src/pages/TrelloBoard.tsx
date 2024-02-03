import { useState } from "react";
import { Store, TCard, TColumn, initialData } from "../helpers/store";
import Column from "../components/Column";
import AddColumn from "../components/AddColumn";
import Card, { TCardMetadata } from "../components/Card";
import AddCard from "../components/AddCard";
import EditCard from "../components/EditCard";

function TrelloBoard () {
  const store = new Store();

  const [isAddColumnModalOpen, setAddColumnModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ cardIndex: -1, columnIndex: -1, card: { title: '', description: '', date: '' } });
  const [columns, setColumns] = useState<TColumn[]>(
    () => {
      if (Array.isArray(store.data) && store.data.length) {
        return store.data;
      } else {
        store.data = initialData;
        return initialData;
      }
    }
  );

  const addNewColumn = (label: string) => {
    const updatedColumnList = [
      ...columns,
      {
        label,
        cards: []
      }
    ]
    setColumns(updatedColumnList);
    store.data = updatedColumnList;
  }

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
    console.log(columnIndex, cardIndex);
    setSelectedCard({ columnIndex, cardIndex, card: columns[columnIndex].cards[cardIndex] });
    setEditModalOpen(true);
  };

  return (
    <>
      <section>
        <div>
          <button onClick={() => setAddColumnModalOpen(true)}>
            Add Column
          </button>
        </div>
        {
          isAddColumnModalOpen && (
            <AddColumn
              addNewColumn={addNewColumn}
              closeModal={() => setAddColumnModalOpen(false)}
            />
          )
        }
      </section>
      <section>
        {columns.map(({ label, cards }, columnIndex) => (
          <Column 
            label={label}
            remove={handleColumnRemove}
            key={columnIndex}
            index={columnIndex}
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
                key={cardIndex} 
              />
            ))}
            <AddCard
              columnIndex={columnIndex}
              addCardItem={handleAddCard} 
            />
          </Column>
        ))}
        {
          isEditModalOpen && (
            <EditCard
              columnIndex={selectedCard.columnIndex}
              cardIndex={selectedCard.cardIndex}
              card={selectedCard.card}
              closeModal={() => setEditModalOpen(false)}
              editCard={handleEditCard}
            />
          )
        }
      </section>
    </>
  );
}

export default TrelloBoard;