import { TagColors } from "@/types/ui/tagColor";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  color: TagColors;
}

const Tag = ({ children, className = "", color }: TagProps) => {
  let bgColor = "";
  switch (color) {
    case "success-light":
      bgColor = "bg-green-100 text-green-700";
      break;
    case "warning-light":
      bgColor = "bg-yellow-100 text-yellow-700";
      break;
    case "error-light":
      bgColor = "bg-red-100 text-red-700";
      break;
    case "secondary-light":
      bgColor = "bg-gray-300 text-gray-700";
      break;
    case "blue-light":
      bgColor = "bg-blue-100 text-blue-700";
      break;

    case "success-dark":
      bgColor = "bg-green-800 text-green-100";
      break;
    case "warning-dark":
      bgColor = "bg-yellow-500 text-gray-700";
      break;
    case "error-dark":
      bgColor = "bg-red-800 text-red-100";
      break;
    case "amber-dark":
      bgColor = "bg-amber-700 text-amber-100";
      break;
    case "secondary-dark":
      bgColor = "bg-gray-800 text-gray-100";
      break;
    case "blue-dark":
      bgColor = "bg-blue-800 text-blue-100";
      break;
    default:
      // bgColor = "bg-green-100 text-green-700";
      break;
  }

  // else if (color === "warning") {
  //   bgColor = "bg-[var(--color-dark-yellow)] text-[var(--color-dark-grey)]";
  // } else if (color === "error") {
  //   bgColor = "bg-[var(--color-light-red)] text-white";
  // } else if (color === "secondary") {
  //   bgColor = "bg-[var(--color-dark-grey-2)] text-white";
  // } else if (color === "blue") {
  //   bgColor = "bg-[var(--color-light-blue)] text-[var(--color-dark-grey)]";
  // }
  //
  return (
    <span className={`${className} ${bgColor} px-4 py-1 rounded-full text-xs`}>
      {children}
    </span>
  );
};

export default Tag;
