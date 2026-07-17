"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // 💡 FIX: Tells next-themes to render its internal tag safely 
  // as an application/json string block, suppressing the React 19 warning.
  const scriptProps = typeof window === "undefined" 
    ? undefined 
    : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
}