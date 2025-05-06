import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const BooleanInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const isChecked = value.toLowerCase() === "true";

  return (
    <div className="flex items-center gap-2">
      <Label>Falso</Label>
      <Switch
        checked={isChecked}
        onCheckedChange={(checked: any) => onChange(checked.toString())}
      />
      <Label>Verdadeiro</Label>
    </div>
  );
};
