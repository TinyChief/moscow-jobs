const express = require('express');
const path = require('path');

const app = express();

// Настраиваем обработчик статических файлов
app.use(express.static(path.join(__dirname, '../dist')));

// Обрабатываем все запросы и отправляем файл index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});