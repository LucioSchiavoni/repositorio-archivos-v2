import React, { useState } from "react";

type Item = {
  id: number;
  name: string;
};

type SearchProps = {
  items: Item[];
};

const SearchBar: React.FC<SearchProps> = ({ items }) => {
  const [query, setQuery] = useState<string>("");

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>

      <input
        type="text"
        placeholder="Buscar..."
        className="px-3 py-1 rounded-md shadow-xl"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
