import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(50, "Имя слишком длинное"),
  email: z.string().email("Введите корректный email адрес"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация данных
    const validatedData = contactFormSchema.parse(body)
    
    // Здесь можно добавить интеграцию с email сервисом
    // Например, Resend, SendGrid, или nodemailer
    
    // Пример с использованием Resend (нужно установить: npm install resend)
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'hello@barboss.online',
    //   subject: 'Новое сообщение с сайта BARBOSS',
    //   html: `<p>Имя: ${validatedData.name}</p><p>Email: ${validatedData.email}</p>`,
    // })
    
    // Пока просто логируем и возвращаем успех
    console.log("Contact form submission:", validatedData)
    
    // В реальном приложении здесь будет отправка email
    // Для демо просто возвращаем успех
    
    return NextResponse.json(
      {
        success: true,
        message: "Сообщение успешно отправлено!",
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Ошибка валидации",
          errors: error.errors,
        },
        { status: 400 }
      )
    }
    
    console.error("Contact form error:", error)
    
    return NextResponse.json(
      {
        success: false,
        message: "Ошибка отправки сообщения. Попробуйте позже.",
      },
      { status: 500 }
    )
  }
}

