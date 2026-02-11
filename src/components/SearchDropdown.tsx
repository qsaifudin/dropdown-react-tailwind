import "../index.css";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useFloating, offset, flip, shift, autoUpdate, size, useDismiss, useClick, useInteractions } from "@floating-ui/react";
import { ChevronDown, Search, XCircle } from "feather-icons-react";

import type { Option, SearchDropdownProps } from "./types";
import { useDropdown } from "./useDropdown";

export const SearchDropdown = ({
  value,
  onChange,
  multiple = false,
  searchable = false,
  usePortal = false,
  label = "Label",
  renderOption,
  options,
}: SearchDropdownProps) => {
  console.log("🚀 ~ SearchDropdown ~ usePortal:", usePortal);
  const { open, setOpen, query, setQuery, filtered } = useDropdown(options, searchable);

  const isSelected = (opt: Option) => {
    if (multiple && Array.isArray(value)) {
      return value.some((v) => v.value === opt.value);
    }
    return (value as Option)?.value === opt.value;
  };

  const toggle = (opt: Option) => {
    if (!multiple) return onChange(opt);
    let next = Array.isArray(value) ? [...value] : [];

    if (isSelected(opt)) {
      next = next.filter((v) => v.value !== opt.value);
    } else {
      next.push(opt);
    }
    onChange(next);
  };

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "absolute",
    middleware: [
      offset(6),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const removeChip = (opt: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!Array.isArray(value)) return;
    onChange(value.filter((v) => v.value !== opt.value));
  };

  const menu = (
    <div
      ref={refs.setFloating}
      {...getFloatingProps()}
      style={{ ...floatingStyles, zIndex: 9999 }}
      className="overflow-auto bg-white border rounded-md shadow-md max-h-72 w-"
    >
      {searchable && (
        <div className="sticky top-0 flex items-center gap-2 px-3 bg-white border-b">
          <Search size={16} color="grey" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="w-full py-2 outline-none" />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-gray-500 hover:text-black">
              <XCircle size={16} />
            </button>
          )}
        </div>
      )}

      {filtered.map((opt) => {
        const selected = isSelected(opt);

        return (
          <div
            key={opt.value}
            onClick={() => toggle(opt)}
            className={clsx("px-3 py-2 cursor-pointer flex gap-2 items-center hover:bg-gray-100", selected && "bg-teal-100")}
          >
            {renderOption ? (
              renderOption(opt, selected)
            ) : (
              <>
                {opt.icon}
                <span>{highlight(opt.label, query)}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );

  function highlight(text: string, query: string) {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-green-200 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="flex items-center gap-2">
      {label && <label className="block grid-rows-1 flex-[2] text-left">{label}</label>}

      {/* Input */}
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className="flex-[12] border rounded-md px-2 py-2 bg-white flex flex-wrap gap-1 cursor-pointer min-h-[40px] items-center w-full hover:shadow-sm hover:border-gray-300"
      >
        {multiple && Array.isArray(value) ? (
          value.length ? (
            <div className="flex gap-1">
              {value.map((v) => (
                <span key={v.value} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                  {v.label}
                  <button onClick={(e) => removeChip(v, e)} className="p-1 text-gray-500 hover:text-black">
                    <XCircle size={16} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">Select...</span>
          )
        ) : (
          <span className="text-gray-700">{(value as Option)?.label || <span className="text-gray-400">Select...</span>}</span>
        )}
        <span className="ml-auto text-gray-400">
          <ChevronDown />
        </span>
      </div>

      {/* Menu */}
      {open && (usePortal ? createPortal(menu, document.body) : menu)}
    </div>
  );
};
