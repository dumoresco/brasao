import { Input } from "@/components/ui/input";

export const DateInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <Input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
