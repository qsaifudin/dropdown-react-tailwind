# SearchDropdown

A flexible React dropdown component with:

- single & multiple selection
- search filtering
- portal support
- custom option rendering
- floating UI positioning

Built with React + Floating UI + Tailwind.

---

## Installation

```bash
npm install
```

---

## Basic Usage

```tsx
const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

export default function App() {
  const [value, setValue] = useState();

  return (
    <SearchDropdown
      label="Select option"
      options={options}
      value={value}
      onChange={setValue}
    />
  );
}
```

---

## Multiple Selection

```tsx
const [value, setValue] = useState([]);

<SearchDropdown
  options={options}
  value={value}
  onChange={setValue}
  multiple
/>;
```

---

## Searchable Dropdown

```tsx
<SearchDropdown
  options={options}
  value={value}
  onChange={setValue}
  searchable
/>
```

---

## Portal Mode

Use portal if your dropdown is inside a container with `overflow: hidden`.

```tsx
<SearchDropdown
  options={options}
  value={value}
  onChange={setValue}
  usePortal
/>
```

---

## Custom Option Rendering

```tsx
<SearchDropdown
  options={options}
  value={value}
  onChange={setValue}
  renderOption={(opt, selected) => (
    <div className="flex justify-between w-full">
      <span>{opt.label}</span>
      {selected && "✓"}
    </div>
  )}
/>
```

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `Option[]` | Dropdown options |
| `value` | `Option \| Option[]` | Selected value(s) |
| `onChange` | `(value) => void` | Change handler |
| `multiple` | `boolean` | Enable multi-select |
| `searchable` | `boolean` | Enable search input |
| `usePortal` | `boolean` | Render menu in portal |
| `label` | `string` | Input label |
| `renderOption` | `(opt, selected) => ReactNode` | Custom option UI |

---

## Option Type

```ts
type Option = {
  value: string;
  label: string;
};
```

---

## Styling

This component uses Tailwind CSS utility classes.

Make sure Tailwind is installed in your project:

👉 https://tailwindcss.com/docs/installation

---

## Dependencies

- React
- @floating-ui/react
- feather-icons-react
- clsx

--- 
