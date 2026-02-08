interface AlertProps {
  message: string | null | undefined;
  variant?: "success" | "error";
}

const Alert = ({ message, variant = "error" }: AlertProps) => {
  if (!message) return null;

  const styles = {
    success: "bg-green-50 border-green-500 text-green-700",
    error: "bg-red-50 border-red-500 text-red-700",
  };

  return (
    <div
      className={`border-l-4 p-3 text-sm transition-all animate-in fade-in duration-300 ${styles[variant]}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
