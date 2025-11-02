import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasChildrenProp = (
  node: React.ReactNode,
): node is React.ReactElement<{ children?: React.ReactNode }> => {
  return React.isValidElement(node);
};

export const extractTextFromCodeBlock = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(extractTextFromCodeBlock).join("");
  if (hasChildrenProp(children))
    return extractTextFromCodeBlock(children.props.children);
  return "";
};
