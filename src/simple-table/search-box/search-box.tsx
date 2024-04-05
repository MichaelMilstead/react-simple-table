import React from "react";

interface SearchBoxProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export default function SearchBox({ filter, setFilter }: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: 5,
          paddingLeft: 10,
          borderRadius: 12,
          color: "white",
          backgroundColor: "#0A1B25",
          border: "1px solid #242836",
        }}
      />
    </div>
  );
}
