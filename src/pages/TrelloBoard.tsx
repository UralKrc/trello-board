import { useState } from "react";
import { Store, TColumn, initialData } from "../helpers/store";
import Column from "../components/Column";
import AddColumn from "../components/AddColumn";

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
              <div key={cardIndex}>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>{date}</p>
              </div>
            ))}
          </Column>
        ))}
      </section>
    </>
  );
}

export default TrelloBoard;