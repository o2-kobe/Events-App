import { useSearchBox } from "react-instantsearch";
import React, { useState, useRef, useEffect } from "react";

function SearchBox() {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      refine(inputValue);
    }, 500);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, refine]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  return (
    <div className="flex items-center gap-2 relative w-full max-w-md">
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search events..."
        className="border border-gray-300 rounded-full px-5 py-2 bg-white shadow-sm outline-none focus:shadow-md focus:border-blue-400 transition-all duration-200 w-full text-gray-800 placeholder-gray-400"
        autoComplete="off"
        spellCheck={false}
        maxLength={512}
      />
    </div>
  );
}

export default SearchBox;
