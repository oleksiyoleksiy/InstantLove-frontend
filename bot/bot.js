import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

const button = {
  type: 'web_app',
  text: '❤️ Open Love',
  web_app: { url: process.env.APP_LINK },
}

bot.start(ctx => {
  ctx.setChatMenuButton(button)
})

bot.launch()
