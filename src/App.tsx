import "./App.css";
import { SearchDropdown } from "./components/SearchDropdown";

function App() {
  return (
    <>
      <div className="grid gap-1">
        <h1 className="mb-3">Saifudin</h1>
        <b>Dropdown</b>
        <SearchDropdown />
      </div>
    </>
  );
}

export default App;
