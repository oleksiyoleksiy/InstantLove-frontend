import { InitDataUnsafe } from "./types"

export {}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        openTelegramLink: (url: string) => void
        initDataUnsafe: InitDataUnsafe
      }
    }
  }
}
