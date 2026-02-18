import { useCategoryOptions } from "@/hooks/useCategoryOptions";

interface CategoryFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const { options, loading } = useCategoryOptions();

  if (loading) return <div className="p-4 text-sm text-gray-500">Cargando categorías...</div>;

  return (
    <div>
      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">Categoría</p>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt.id} className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => {
                if (selected.includes(opt.id)) {
                  onChange(selected.filter((id) => id !== opt.id));
                } else {
                  onChange([...selected, opt.id]);
                }
              }}
              className="accent-[#4F6F52] w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-800 dark:text-gray-100">{opt.value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
