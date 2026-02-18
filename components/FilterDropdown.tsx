import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";

interface FilterDropdownProps {
  selectedCategories: string[];
  onChangeCategories: (selected: string[]) => void;
}

export default function FilterDropdown({ selectedCategories, onChangeCategories }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-4">
      <button
        className="w-full px-4 py-2 bg-[#4F6F52] text-white rounded-lg font-semibold shadow mb-2"
        onClick={() => setOpen((v) => !v)}
      >
        Filtrar por categoría
      </button>
      {open && (
        <div className="bg-white dark:bg-[#2E2E2E] rounded-lg shadow p-4">
          <CategoryFilter selected={selectedCategories} onChange={onChangeCategories} />
        </div>
      )}
    </div>
  );
}
