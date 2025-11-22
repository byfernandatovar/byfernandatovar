import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => {
    const baseStyles =
      "cursor-pointer px-8 py-3 rounded-sm font-medium transition-all duration-300 ease-in-out uppercase tracking-wider text-sm";

    const variantStyles = {
      primary: "bg-[#BE9B5F] text-[#F0EBE1] hover:bg-[#A59B82] hover:shadow-lg",
      secondary:
        "bg-transparent border-2 border-[#7D7873] text-[#7D7873] hover:bg-[#7D7873] hover:text-[#F0EBE1] hover:shadow-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;