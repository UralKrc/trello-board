import { useState } from "react";
import { Store, TColumn, initialData } from "../helpers/store";

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

  return (
    <div>
      {columns.map(({ label, cards }, columnIndex) => (
        <div 
          key={columnIndex}
        >
          <h1>{label}</h1>
          {cards.map(({ title, description, date }, cardIndex) => (
            <div key={cardIndex}>
              <h2>{title}</h2>
              <p>{description}</p>
              <p>{date}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrelloBoard;