import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      {...props}
      className={`
        px-5
        py-3
        rounded-xl
        font-medium
        transition-all
        duration-200
        shadow-sm
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}