# 🚀 Генератор Автоматизированных Тестов | Website Test Generator

[English](#english) | [Русский](#russian)

<a name="english"></a>
# 🚀 Website Test Generator Made By Dias Urazov

## 📝 Description
This project is a web application for automatic test generation for any website using Playwright. The application provides a user-friendly web interface for analyzing websites and creating test scenarios.

## ✨ Key Features
- 🔍 Automatic website structure analysis
- 📋 Test scenario generation
- 🎯 Checking main page elements
- 📊 Test report generation
- 🌐 Multiple browser support

## 🛠️ Requirements
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Windows (for using bat file)

## 🚀 Quick Start

### Option 1: Automatic Installation
1. Clone the repository
2. Run `start.bat`
   - Automatically installs all dependencies
   - Installs Playwright browsers
   - Starts the web server

### Option 2: Manual Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps chromium
   ```

3. Start the server:
   ```bash
   npm start
   ```

## 💻 Using Web Interface

1. Open your browser and go to `http://localhost:3000`
2. Enter the website URL for analysis
3. Click "Analyze" button
4. Wait for the analysis to complete
5. View generated tests and reports

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start web server |
| `npm test` | Run all tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:debug` | Run tests in debug mode |

## 📁 Project Structure

```
├── public/           # Static files and frontend
├── scripts/          # Test generation scripts
├── tests/           # Test files
├── projects/        # Generated projects
└── server.ts        # Main server file
```

## 🔍 What Tests Check

- ✅ Page headers
- 🔗 Working links
- 🖼️ Images presence
- 📝 Forms and input fields
- 🔘 Buttons and interactive elements

## ⚠️ Troubleshooting

### Common Issues:

1. **Port 3000 is in use**
   - Close other applications using port 3000
   - Or change the port in settings

2. **Browser installation errors**
   - Ensure you have administrator rights
   - Check internet connection

3. **Test execution problems**
   - Verify all dependencies are installed
   - Check URL correctness

## 📚 Additional Information

### Supported Browsers
- Chrome/Chromium
- Firefox
- Safari

### Report Formats
- HTML
- JSON
- Console output

## 🤝 Support

If you have questions or issues:
1. Create an issue in the repository
2. Describe the problem in detail
3. Attach error logs if any

## 📄 License

MIT License - see LICENSE file for details

---

⭐ If the project helped you, don't forget to star it!

---

<a name="russian"></a>
# 🚀 Генератор Автоматизированных Тестов Созданно Диасом Уразовым

## 📝 Описание
Этот проект представляет собой веб-приложение для автоматической генерации тестов для любого веб-сайта с использованием Playwright. Приложение предоставляет удобный веб-интерфейс для анализа сайтов и создания тестовых сценариев.

## ✨ Основные возможности
- 🔍 Автоматический анализ структуры веб-сайта
- 📋 Генерация тестовых сценариев
- 🎯 Проверка основных элементов страницы
- 📊 Генерация отчетов о тестировании
- 🌐 Поддержка различных браузеров

## 🛠️ Требования
- Node.js (версия 14 или выше)
- npm (входит в состав Node.js)
- Windows (для использования bat-файла)

## 🚀 Быстрый старт

### Вариант 1: Автоматическая установка
1. Клонируйте репозиторий
2. Запустите файл `start.bat`
   - Автоматически установит все зависимости
   - Установит браузеры Playwright
   - Запустит веб-сервер

### Вариант 2: Ручная установка
1. Установите зависимости:
   ```bash
   npm install
   ```

2. Установите браузеры Playwright:
   ```bash
   npx playwright install --with-deps chromium
   ```

3. Запустите сервер:
   ```bash
   npm start
   ```

## 💻 Использование веб-интерфейса

1. Откройте браузер и перейдите по адресу `http://localhost:3000`
2. Введите URL сайта для анализа
3. Нажмите кнопку "Анализировать"
4. Дождитесь завершения анализа
5. Просмотрите сгенерированные тесты и отчеты

## 📋 Доступные команды

| Команда | Описание |
|---------|----------|
| `npm start` | Запуск веб-сервера |
| `npm test` | Запуск всех тестов |
| `npm run test:ui` | Запуск тестов с интерфейсом |
| `npm run test:debug` | Запуск тестов в режиме отладки |

## 📁 Структура проекта

```
├── public/           # Статические файлы и фронтенд
├── scripts/          # Скрипты для генерации тестов
├── tests/           # Тестовые файлы
├── projects/        # Сгенерированные проекты
└── server.ts        # Основной файл сервера
```

## 🔍 Что проверяют тесты

- ✅ Заголовки страницы
- 🔗 Работоспособность ссылок
- 🖼️ Наличие изображений
- 📝 Формы и поля ввода
- 🔘 Кнопки и интерактивные элементы

## ⚠️ Устранение неполадок

### Распространенные проблемы:

1. **Порт 3000 занят**
   - Закройте другие приложения, использующие порт 3000
   - Или измените порт в настройках

2. **Ошибки при установке браузеров**
   - Убедитесь в наличии прав администратора
   - Проверьте подключение к интернету

3. **Проблемы с запуском тестов**
   - Проверьте установку всех зависимостей
   - Убедитесь в правильности URL

## 📚 Дополнительная информация

### Поддерживаемые браузеры
- Chrome/Chromium
- Firefox
- Safari

### Форматы отчетов
- HTML
- JSON
- Консольный вывод

## 🤝 Поддержка

Если у вас возникли вопросы или проблемы:
1. Создайте issue в репозитории
2. Опишите проблему подробно
3. Приложите логи ошибок, если они есть

## 📄 Лицензия

MIT License - подробности в файле LICENSE

---

⭐ Если проект вам помог, не забудьте поставить звезду!