/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // 添加你想要的字体
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
        xiaowei: ['ZCOOL XiaoWei', 'serif'],
        mashanzheng: ['Ma Shan Zheng', 'cursive'],
        qingke: ['ZCOOL QingKe HuangYou', 'cursive'],
      },
    },
  },
  plugins: [],
}

