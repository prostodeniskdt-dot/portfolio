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
          borderColor: "#f8cf2c #000000 #000000 #f8cf2c",
          color: "#000000",
          fontFamily: "VT323, monospace",
        },
        className: "retro-toast",
      }}
    />
  )
}

