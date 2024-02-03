import { useState, FormEvent, memo } from "react";
import Modal from "../Modal";

type TAddColumnProps = {
  addNewColumn: (label: string) => void;
  closeModal: () => void;
}

function NewColumnModal ({ addNewColumn, closeModal }: TAddColumnProps) {
  const [label, setLabel] = useState('');

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    if (label.trim()) {
      addNewColumn(label);
      setLabel('');
      closeModal();
    }
  };

  return (
    <Modal onClose={closeModal}>
      <h2>Add Column</h2>
      <form className="form" onSubmit={handleAdd}>
        <input
          placeholder="Column Title"
          value={label}
          onChange={event => setLabel(event.target.value)} />
        <button type="submit">
          Add Column
        </button>
      </form>
    </Modal>
  );
}

export default memo(NewColumnModal);