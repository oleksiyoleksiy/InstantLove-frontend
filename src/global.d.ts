export {}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        openTelegramLink: (url: string) => void
      }
    }
  }
}
