import { Store } from "./helpers/store";
import TrelloBoard from "./pages/TrelloBoard";

function App() {
  const store = new Store();
  console.log(store.data, 'store');
  return (
    <div>
      <TrelloBoard />
    </div>
  );
}

export default App;
