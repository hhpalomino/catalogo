import { useEffect, useState } from "react";

export interface AttributeOption {
  id: string;
  value: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options: AttributeOption[];
}

export function useCategoryOptions() {
  const [options, setOptions] = useState<AttributeOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/attributes")
      .then((res) => res.json())
      .then((attributes: Attribute[]) => {
        const category = attributes.find((a) => a.name.toLowerCase().includes("categor"));
        setOptions(category?.options || []);
      })
      .catch((err) => setError("Error al cargar categorías"))
      .finally(() => setLoading(false));
  }, []);

  return { options, loading, error };
}
