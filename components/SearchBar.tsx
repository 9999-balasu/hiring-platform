/*import { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="p-4">
      <input 
        className="border p-2 w-full rounded-md" 
        type="text" 
        placeholder="Search jobs..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button className="bg-blue-600 text-white px-4 py-2 mt-2 w-full" onClick={() => onSearch(query)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;*/

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search jobs..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
};

export default SearchBar;

