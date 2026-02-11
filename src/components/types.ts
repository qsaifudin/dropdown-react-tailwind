export type Option = {
  value: string;
  label: string;
};

export type SearchDropdownProps = {
  label?: string;
  options: Option[];
  value?: Option | Option[];
  onChange: (value: any) => void;

  multiple?: boolean;
  searchable?: boolean;
  usePortal?: boolean;

  renderOption?: (option: Option, selected: boolean) => React.ReactNode;
};
