import React, { useState } from "react";

interface FilterOptionsProps {
  onFilterChange: (filter: string) => void;
}

function FilterOptions({ onFilterChange }: FilterOptionsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  function handleFilterChange(filter: string) {
    setSelectedFilter(filter);
    onFilterChange(filter);
  }

  const options = [
    { id: "deadlineToday", label: "Deadline Today" },
    { id: "expires5Days", label: "Expires in 5 days" },
    { id: "expires10Days", label: "Expires in 10 days" },
    { id: "expires30Days", label: "Expires in 30 days" },
  ];

  return (
    <div className="relative">
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
        <div className="py-1">
          <div className="px-4 py-2 text-sm text-gray-500">Date</div>
          <hr className="my-1" />
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <input
                type="radio"
                name="filter"
                className="form-radio"
                checked={selectedFilter === option.id}
                onChange={() => handleFilterChange(option.id)}
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;
