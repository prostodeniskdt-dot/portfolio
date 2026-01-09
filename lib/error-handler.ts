export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message)
    this.name = "AppError"
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export function handleError(error: unknown): { message: string; code?: string } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message || "Произошла неизвестная ошибка",
    }
  }

  return {
    message: "Произошла неизвестная ошибка",
  }
}

export function logError(error: unknown, context?: string) {
  const errorInfo = handleError(error)
  console.error(`[Error${context ? ` in ${context}` : ""}]`, {
    message: errorInfo.message,
    code: errorInfo.code,
    error,
  })
}


