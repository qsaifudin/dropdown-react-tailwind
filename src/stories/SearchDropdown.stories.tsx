import { SearchDropdown } from "../components/SearchDropdown";
import { useArgs } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Form/SearchDropdown",
  component: SearchDropdown,

  tags: ['autodocs'],
} satisfies Meta<typeof SearchDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = Array.from({ length: 10 }).map((_, i) => ({
  value: `opt-${i}`,
  label: `My Menu ${i}`,
}));

export const PropsTrue:Story = {
  args: {
    label: "Select Menu",
    searchable: true,
    usePortal: true,
    value: undefined,
    multiple: true,
    onChange: () => {},
    options,
  },
  render: (args:any) => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (v: any) => {
      updateArgs({ value: v });
    };

    return <SearchDropdown {...args} value={value} onChange={onChange} />;
  },
};
