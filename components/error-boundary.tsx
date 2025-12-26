"use client"

import React, { Component, type ReactNode } from "react"
import { handleError } from "@/lib/error-handler"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const errorMessage = handleError(this.state.error)

      return (
        <div
          className="flex flex-col items-center justify-center min-h-screen p-4"
          style={{
            background: "#1a1a1a",
            color: "#b8860b",
          }}
        >
          <div
            className="p-6 max-w-md w-full"
            style={{
              background: "#f5f0e1",
              border: "3px solid",
              borderColor: "#b8860b #000000 #000000 #b8860b",
            }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{
                color: "#000000",
              }}
            >
              ⚠️ Ошибка приложения
            </h2>
            <p
              className="text-sm mb-4"
              style={{
                color: "#000000",
              }}
            >
              {errorMessage.message}
            </p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90"
              style={{
                background: "#b8860b",
                color: "#000000",
                border: "3px solid",
                borderColor: "#d4a017 #000000 #000000 #d4a017",
              }}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


