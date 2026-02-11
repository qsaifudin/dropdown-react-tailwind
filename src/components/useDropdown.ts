import { useState, useMemo } from "react";

export function useDropdown(options: any[], searchable?: boolean) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchable || !query) return options;
    return options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  }, [query, options, searchable]);

  return {
    open,
    setOpen,
    query,
    setQuery,
    filtered,
  };
}
