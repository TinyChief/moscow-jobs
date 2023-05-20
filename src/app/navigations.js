export const navigations = [
  { label: 'Страницы', type: 'label' },
  { name: 'Начальная', path: '/', icon: 'dashboard' },
  { name: 'Список стажировок', path: '/jobs', icon: 'dashboard' },
  { name: 'Отдельная стажировка', path: '/jobs/1', icon: 'dashboard' },
  {
    name: 'Куратор',
    icon: 'checkbox',
    children: [
      { name: 'Заявки от кандидатов', path: '/applications', icon: 'dashboard' },
      { name: 'Заявки от стажеров', path: '/applications/interns', icon: 'dashboard' },
      { name: 'Список наставников', path: '/mentors', icon: 'dashboard' },
      { name: 'Статистика по кандидатам', path: '/statistics', icon: 'dashboard' },
      { name: 'Статистика по стажёрам', path: '/statistics/interns', icon: 'dashboard' },
    ],
  },
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
