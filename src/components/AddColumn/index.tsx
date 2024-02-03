import { useState, FormEvent } from "react";
import Modal from "../Modal";

type TAddColumnProps = {
  addNewColumn: (label: string) => void;
  closeModal: () => void;
}

const AddColumn: React.FC<TAddColumnProps> = ({ addNewColumn, closeModal }) => {
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

export default AddColumn;