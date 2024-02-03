import { useState } from "react";
import { Store, TCard, TColumn, initialData } from "../helpers/store";
import Column from "../components/Column";
import AddColumn from "../components/AddColumn";
import Card, { TCardMetadata } from "../components/Card";
import AddCard from "../components/AddCard";

function TrelloBoard () {
  const store = new Store();

  const [isAddColumnModalOpen, setAddColumnModalOpen] = useState(false);
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
                key={cardIndex} 
              />
            ))}
            <AddCard
              columnIndex={columnIndex}
              addCardItem={handleAddCard} 
            />
          </Column>
        ))}
      </section>
    </>
  );
}

export default TrelloBoard;