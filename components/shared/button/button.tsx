"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "@radix-ui/react-select";
import clsx from "clsx";
import React from "react";

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ReactNode;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({
    title,
    variant = "default",
    size = "default",
    className,
    icon,
    ...prop
  }) => {
    const classNames = clsx(className);
    return (
      <Button
        size={size}
        variant={variant}
        {...prop}
        className={clsx(classNames, "flex items-center gap-x-1")}
      >
        {title}
        {icon}
      </Button>
    );
  }
);
ButtonIcon.displayName = "ButtonIcon";
export { ButtonIcon };
