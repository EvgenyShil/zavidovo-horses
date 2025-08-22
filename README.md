# КСК «Золотое сечение» — лендинг (Vite + React + Tailwind)

Готовый к деплою проект. Никаких секретов и переменных окружения не требуется.

## Локальный запуск

```bash
npm i
npm run dev
# откройте ссылку из терминала (обычно http://localhost:5173)
```

## Сборка
```bash
npm run build
npm run preview
```

## Деплой на GitHub + Vercel

1. **Создайте репозиторий** на GitHub, например `zavidovo-stable-landing` (public или private).
2. В терминале:
   ```bash
   git init
   git add .
   git commit -m "init: zavidovo landing"
   git branch -M main
   git remote add origin https://github.com/<your-username>/zavidovo-stable-landing.git
   git push -u origin main
   ```
3. Откройте [vercel.com](https://vercel.com) → *Add New Project* → *Import Git Repository* → выберите ваш репозиторий.
4. Настройки (Vercel определит автоматически):
   - Framework Preset: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **dist**
5. Нажмите **Deploy** — после сборки получите продакшн‑ссылку.

### Как поменять название/описание вкладки
- Заголовок и description: `index.html` в `<title>` и `<meta name="description">`.

### Где править контент
- Тексты, цены, телефоны: `src/constants.js`
- Разметка секций: `src/App.jsx`

### Тесты
Запуск простых проверок (Vitest):
```bash
npm run test
```
