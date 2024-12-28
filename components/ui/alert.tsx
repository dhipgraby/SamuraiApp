import { CheckCircle, TriangleAlert } from "lucide-react";
import IconController from "../icon-controller";

interface AlertProps {
  message?: string | null;
  type: "success" | "error" | "warning" | "info" | "danger" | "black" | "dark";
  className?: string | undefined;
}

const Alert = ({ message, type, className }: AlertProps) => {
  if (!message || message === null) return null;

  let backgroundColor;
  let textColor;
  let icon;

  switch (type) {
    case "info":
      backgroundColor = "bg-blue-100";
      textColor = "text-blue-600";
      icon = <IconController icon="info" className="h-5 w-5" />;
      break;
    case "success":
      backgroundColor = "bg-emerald-500/15";
      textColor = "text-emerald-500";
      icon = <CheckCircle className="h-4 w-4 text-green-600" />;
      break;
    case "error":
      backgroundColor = "bg-destructive/15";
      textColor = "text-destructive";
      icon = <IconController icon="info" className="h-5 w-5" />;
      break;
    case "warning":
      backgroundColor = "bg-yellow-300";
      textColor = "text-yellow-700";
      icon = <TriangleAlert className="h-5 w-5 text-yellow-700" />;
      break;
    case "danger":
      backgroundColor = "bg-yellow-300";
      textColor = "text-yellow-700";
      icon = <TriangleAlert className="h-5 w-5 text-yellow-700" />;
      break;
    case "black":
      backgroundColor = "bg-yellow-300";
      textColor = "text-yellow-700";
      icon = <TriangleAlert className="h-5 w-5 text-yellow-700" />;
      break;
    case "dark":
      backgroundColor = "bg-slate-800";
      textColor = "text-slate-300";
      icon = <TriangleAlert className="h-5 w-5 text-yellow-700" />;
      break;
    default:
      backgroundColor = "bg-gray-200";
      textColor = "text-gray-800";
      icon = null;
  }

  return (
    <div
      className={`p-3 rounded-md flex items-center gap-x-2 text-sm ${backgroundColor} ${textColor} ${
        className ? className : ""
      }`}
    >
      {icon}
      <p className="font-semibold">{message}</p>
    </div>
  );
};

export default Alert;
