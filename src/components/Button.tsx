import React, { forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, onClick, className, ...rest }, ref) => {
	return (
		<button
			{...rest}
			onClick={onClick}
			ref={ref}
			className={clsx(className, "border-none rounded-full h-10 py-2 px-6 bg-black text-md text-white hover:bg-gray-500")}
		>
			{children}
		</button>
	);
});

Button.displayName = "Button";
