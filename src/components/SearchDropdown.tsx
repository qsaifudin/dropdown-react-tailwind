export const SearchDropdown = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search..."
      />
      <div className="absolute z-10 hidden bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full">
        <ul className="max-h-60 overflow-auto">
          <li className="p-2 hover:bg-gray-100">Result 1</li>
          <li className="p-2 hover:bg-gray-100">Result 2</li>
          <li className="p-2 hover:bg-gray-100">Result 3</li>
        </ul>
      </div>
    </div>
  );
}
