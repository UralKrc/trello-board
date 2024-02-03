import { Store } from "./helpers/store";

function App() {
  const store = new Store();
  console.log(store.data, 'store');
  return (
    <div>
      <header>
        Trello Board
      </header>
    </div>
  );
}

export default App;
