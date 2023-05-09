export const navigations = [
  { label: 'Страницы', type: 'label' },
  { name: 'Начальная', path: '/welcome', icon: 'dashboard' },
  { name: 'Список стажировок', path: '/', icon: 'dashboard' },
  { name: 'Отдельная стажировка', path: '/jobs/1', icon: 'dashboard' },
  {
    name: 'Авторизация',
    icon: 'security',
    children: [
      { name: 'Логин', iconText: 'SI', path: '/session/signin' },
      { name: 'Регистрация', iconText: 'SU', path: '/session/signup' },
      { name: 'Забыл пароль', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Ошибка', iconText: '404', path: '/session/404' }
    ]
  },
];
