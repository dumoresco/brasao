import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { cn } from "../lib/utils";

interface CustomAlertProps {
  title: string;
  description: string;
  type: "success" | "warning" | "info" | "danger";
  icon?: React.ReactNode;
}

export const CustomAlert = ({
  icon,
  title,
  description,
  type,
}: CustomAlertProps) => {
  const alertStyles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-400/20 text-yellow-200 border-yellow-400",
    info: "bg-blue-100 text-blue-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <Alert className={cn(alertStyles[type])}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
