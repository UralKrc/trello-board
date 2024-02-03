import { useState } from "react";
import store, { TColumn, initialData } from "../helpers/store";
import NewColumnModal from "../components/NewColumnModal";
import ColumnList from "../components/ColumnList";

function TrelloBoard () {
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

  const handleAddNewColumn = (label: string) => {
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
            <NewColumnModal
              addNewColumn={handleAddNewColumn}
              closeModal={() => setAddColumnModalOpen(false)}
            />
          )
        }
      </section>
      <ColumnList columns={columns} setColumns={setColumns} />
    </>
  );
}

export default TrelloBoard;