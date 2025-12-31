"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Как связаться с вами?",
    answer: "Вы можете связаться с нами через окно 'Контакты' или написать в Telegram: https://t.me/barboss_assistant"
  },
  {
    question: "Какие услуги вы предоставляете?",
    answer: "Мы предоставляем различные продукты и услуги. Откройте папку 'Продукты BAR BOSS ONLINE' для просмотра всех доступных услуг."
  },
  {
    question: "Где находится ваша команда?",
    answer: "Наша команда находится в Санкт-Петербурге. Подробную информацию о каждом члене команды вы можете найти в окне 'Команда'."
  },
  {
    question: "Как заказать услугу?",
    answer: "Для заказа услуги откройте интересующий вас продукт и нажмите кнопку 'Заказать' или 'Связаться'. Все заказы обрабатываются через Telegram."
  },
  {
    question: "Какие у вас есть социальные сети?",
    answer: "Мы присутствуем в Telegram, Instagram и YouTube. Откройте окно 'Социальные сети' для получения всех ссылок."
  },
  {
    question: "Как работает ваш сайт?",
    answer: "Это интерактивный сайт в стиле операционной системы. Кликайте на иконки для открытия окон, используйте меню 'Пуск' для навигации. Я всегда готов помочь!"
  }
]

export function ClippyChatWindow() {
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null)
  const [userQuestion, setUserQuestion] = useState("")

  const findAnswer = (question: string): string | null => {
    const normalizedQuestion = question.toLowerCase().trim()
    
    // Точное совпадение
    const exactMatch = FAQ_ITEMS.find(
      item => item.question.toLowerCase() === normalizedQuestion
    )
    if (exactMatch) return exactMatch.answer

    // Поиск по ключевым словам
    const keywords: Record<string, string> = {
      "связаться": FAQ_ITEMS[0].answer,
      "контакт": FAQ_ITEMS[0].answer,
      "телеграм": FAQ_ITEMS[0].answer,
      "услуг": FAQ_ITEMS[1].answer,
      "продукт": FAQ_ITEMS[1].answer,
      "команда": FAQ_ITEMS[2].answer,
      "заказать": FAQ_ITEMS[3].answer,
      "купить": FAQ_ITEMS[3].answer,
      "социальн": FAQ_ITEMS[4].answer,
      "соцсет": FAQ_ITEMS[4].answer,
      "работает": FAQ_ITEMS[5].answer,
      "сайт": FAQ_ITEMS[5].answer,
    }

    for (const [keyword, answer] of Object.entries(keywords)) {
      if (normalizedQuestion.includes(keyword)) {
        return answer
      }
    }

    // Если ничего не найдено
    return "Извините, я не понял ваш вопрос. Попробуйте выбрать один из популярных вопросов ниже или переформулируйте свой вопрос."
  }

  const handleQuestionClick = (question: string) => {
    setCurrentAnswer(findAnswer(question))
    setUserQuestion(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userQuestion.trim()) {
      setCurrentAnswer(findAnswer(userQuestion))
    }
  }

  return (
    <div className="text-black text-sm space-y-3 h-full flex flex-col">
      {/* Header */}
      <div
        className="p-3"
        style={{
          background: "#FFD700",
          border: "2px solid #000000",
        }}
      >
        <div className="text-xs font-bold">🤖 Помощник Clippy</div>
        <div className="text-[10px]" style={{ color: "#000000", opacity: 0.8 }}>
          Задайте вопрос или выберите из популярных
        </div>
      </div>

      {/* Popular Questions */}
      <div
        className="p-3"
        style={{
          background: "#f5f0e1",
          border: "2px solid #000000",
        }}
      >
        <div className="text-xs font-bold mb-2">📋 Популярные вопросы:</div>
        <div className="space-y-1">
          {FAQ_ITEMS.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(item.question)}
              className="w-full text-left px-2 py-1.5 text-xs transition-all hover:scale-[1.02]"
              style={{
                background: "#ffffff",
                border: "2px solid #000000",
              }}
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="px-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="Введите ваш вопрос..."
            className="w-full px-3 py-2 text-xs"
            style={{
              background: "#ffffff",
              border: "3px solid",
              borderColor: "#000000 #FFD700 #FFD700 #000000",
            }}
          />
        </div>
        <div className="px-2">
          <button
            type="submit"
            className="w-full py-2 text-xs font-bold transition-all hover:scale-[1.02]"
            style={{
              background: "#000000",
              color: "#FFD700",
              border: "3px solid",
              borderColor: "#3a3a3a #FFD700 #FFD700 #3a3a3a",
            }}
          >
            Спросить
          </button>
        </div>
      </form>

      {/* Answer Area */}
      {currentAnswer && (
        <div
          className="flex-1 p-3 overflow-y-auto"
          style={{
            background: "#f5f0e1",
            border: "2px solid #000000",
          }}
        >
          <div className="text-xs font-bold mb-2">💬 Ответ:</div>
          <div className="text-xs leading-relaxed whitespace-pre-wrap">
            {currentAnswer}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentAnswer && (
        <div
          className="flex-1 p-3 flex items-center justify-center"
          style={{
            background: "#f5f0e1",
            border: "2px solid #000000",
          }}
        >
          <div className="text-xs text-center text-[#666666]">
            Выберите вопрос из списка или введите свой
          </div>
        </div>
      )}
    </div>
  )
}

