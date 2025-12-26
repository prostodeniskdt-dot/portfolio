"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#f5f0e1",
          border: "3px solid",
          borderColor: "#b8860b #000000 #000000 #b8860b",
          color: "#000000",
          fontFamily: "VT323, monospace",
        },
        className: "retro-toast",
      }}
    />
  )
}

