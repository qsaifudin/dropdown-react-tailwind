import { useState } from "react";
import "./App.css";
import { SearchDropdown } from "./components/SearchDropdown";

const options = [
  { value: "1", label: "My Menu 1 recommended" },
  { value: "2", label: "My Menu 2" },
  { value: "3", label: "My Menu 3 recommended" },
  { value: "4", label: "My Menu 4" },
  { value: "5", label: "My Menu 5 recommended" },
];

function App() {
  const [value, setValue] = useState([]);
  const [multiValue, setMultiValue] = useState([]);
  return (
    <>
      <div className="grid gap-1">
        <div className="p-4 mb-3 rounded-lg shadow-md">
          <h1 className="mb-3 text-2xl">Saifudin</h1>
        </div>
        <div className="p-4 rounded-lg shadow-xl">
          <b>Dropdown Using Tailwind UI</b>

          <h3 className="font-semibold text-left">Searchable</h3>
          <SearchDropdown options={options} value={value} onChange={setValue} searchable />

          <h3 className="mt-3 font-semibold text-left">Multiple Selection</h3>
          <SearchDropdown options={options} value={multiValue} onChange={setMultiValue} multiple />

          <h3 className="mt-3 font-semibold text-left">Single Selection</h3>
          <SearchDropdown options={options} value={value} onChange={setValue} />

          <h3 className="mt-3 font-semibold text-left">Customizable Option Rendering</h3>
          <SearchDropdown
            options={options}
            value={value}
            onChange={setValue}
            renderOption={(opt, selected) => (
              <div className="flex justify-between w-full">
                <span>{opt.label}</span>
                {selected && "Checked Custom"}
              </div>
            )}
          />

          <h3 className="mt-3 font-semibold text-left">With Portal</h3>
          <div className="relative h-40 p-4 overflow-hidden border">
            <SearchDropdown options={options} value={value} onChange={setValue} usePortal />
          </div>

          <h3 className="mt-3 font-semibold text-left">Without Portal</h3>
          <div className="relative h-40 p-4 overflow-hidden border">
            <SearchDropdown options={options} value={value} onChange={setValue} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
