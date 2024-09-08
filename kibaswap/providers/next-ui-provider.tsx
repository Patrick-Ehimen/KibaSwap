"use client";

import { NextUIProvider } from "@nextui-org/react";

export function NextProvidersUi({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
