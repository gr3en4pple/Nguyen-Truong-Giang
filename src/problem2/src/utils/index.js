export const IMAGE_URL =
  'https://raw.githubusercontent.com/Switcheo/token-icons/221f4f0d6b885dfa71ac57c88965c31a1884afd6/tokens'

export const sleep = async (duration = 300) =>
  await new Promise((resolve) => setTimeout(resolve, duration))
