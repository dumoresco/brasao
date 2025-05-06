"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--text-foreground)",
              border: "1px solid var(--border)",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "12px 16px",
            },
            success: {
              style: {
                background: "#DCFCE7",
                color: "#065F46",
              },
            },
            error: {
              style: {
                background: "#FEE2E2",
                color: "#991B1B",
              },
            },
          }}
        />

        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
