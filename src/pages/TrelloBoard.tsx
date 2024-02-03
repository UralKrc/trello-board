import { useState } from "react";
import { Store, TColumn, initialData } from "../helpers/store";
import Column from "../components/Column";

function TrelloBoard () {
  const store = new Store();
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

  const handleColumnRemove = (key: number) => {
    columns.splice(key, 1);
    setColumns([...columns]);
    store.data = columns;
  };

  return (
    <div>
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
    </div>
  );
}

export default TrelloBoard;