import React from "react";

interface SearchBoxProps {
  filter: string;
  setFilter: (filter: string) => void;
  backgroundColor: string;
  borderRadius: number;
  border: string;
}

export default function SearchBox({
  filter,
  setFilter,
  backgroundColor,
  borderRadius,
  border,
}: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: 5,
          paddingLeft: 10,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          border: border,
        }}
      />
    </div>
  );
}
