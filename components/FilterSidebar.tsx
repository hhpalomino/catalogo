import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";

interface FilterSidebarProps {
  selectedCategories: string[];
  onChangeCategories: (selected: string[]) => void;
}

export default function FilterSidebar({ selectedCategories, onChangeCategories }: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 pr-6">
      <div className="bg-white dark:bg-[#2E2E2E] rounded-lg shadow p-4 mb-6">
        <CategoryFilter selected={selectedCategories} onChange={onChangeCategories} />
      </div>
      {/* Aquí se pueden agregar más filtros en el futuro */}
    </aside>
  );
}
