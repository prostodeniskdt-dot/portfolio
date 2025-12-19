"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { contacts } from "@/lib/data"

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(50, "Имя слишком длинное"),
  email: z.string().email("Введите корректный email адрес"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactWindow() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setMessage({ type: null, text: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Ошибка отправки")
      }

      setMessage({ type: "success", text: result.message || "Сообщение отправлено!" })
      toast.success("Сообщение отправлено!", {
        description: "Мы свяжемся с вами в ближайшее время",
      })
      reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ошибка отправки. Попробуйте позже."
      setMessage({ type: "error", text: errorMessage })
      toast.error("Ошибка отправки", {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    reset()
    setMessage({ type: null, text: "" })
  }

  return (
    <div className="text-black text-sm space-y-3">
      {/* Header */}
      <div
        className="p-2"
        style={{
          background: "#f8cf2c",
          border: "2px solid #000000",
        }}
      >
        <span className="text-xs font-bold">📬 Свяжитесь с BARBOSS ONLINE</span>
      </div>

      {/* Message display */}
      {message.text && (
        <div
          className="p-2 text-xs font-bold"
          style={{
            background: message.type === "success" ? "#f8cf2c" : "#ff4444",
            color: message.type === "success" ? "#000000" : "#ffffff",
            border: "2px solid #000000",
          }}
        >
          {message.type === "success" ? "✓ " : "✗ "}
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label htmlFor="contact-name" className="text-xs w-16 font-bold">
              Имя:
            </label>
            <div className="flex-1">
              <input
                id="contact-name"
                type="text"
                placeholder="Ваше имя"
                {...register("name")}
                disabled={isLoading}
                className="w-full px-2 py-1 text-xs"
                style={{
                  background: "#ffffff",
                  border: "3px solid",
                  borderColor: errors.name ? "#ff4444" : "#000000 #f8cf2c #f8cf2c #000000",
                }}
              />
              {errors.name && (
                <p className="text-[10px] text-red-600 mt-0.5" style={{ color: "#ff4444" }}>
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label htmlFor="contact-email" className="text-xs w-16 font-bold">
              Email:
            </label>
            <div className="flex-1">
              <input
                id="contact-email"
                type="email"
                placeholder="email@example.com"
                {...register("email")}
                disabled={isLoading}
                className="w-full px-2 py-1 text-xs"
                style={{
                  background: "#ffffff",
                  border: "3px solid",
                  borderColor: errors.email ? "#ff4444" : "#000000 #f8cf2c #f8cf2c #000000",
                }}
              />
              {errors.email && (
                <p className="text-[10px] text-red-600 mt-0.5" style={{ color: "#ff4444" }}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-0.5 bg-[#f8cf2c]" />

        {/* Contact links */}
        <div className="space-y-1">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#f8cf2c] transition-colors"
              style={{
                background: "#f5f0e1",
                border: "1px solid #000000",
              }}
            >
              <span>{contact.icon}</span>
              <span className="text-xs font-bold w-20">{contact.label}:</span>
              <span className="text-xs underline">{contact.value}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "#f8cf2c",
              color: "#000000",
              border: "3px solid",
              borderColor: "#ffe066 #000000 #000000 #ffe066",
            }}
          >
            {isLoading ? "⏳ Отправка..." : "📤 Отправить"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-bold transition-colors hover:opacity-90 disabled:opacity-50"
            style={{
              background: "#000000",
              color: "#f8cf2c",
              border: "3px solid",
              borderColor: "#3a3a3a #f8cf2c #f8cf2c #3a3a3a",
            }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}
