export const internNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Список стажировок", path: "/intern/jobs", icon: "list", end: true },
  { name: "Мои заявки", path: "/intern/jobs/applications", icon: "list" },
];

export const candidateNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Список стажировок", path: "/jobs", icon: "dashboard" },
];

export const curatorNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  {
    name: "Заявки кандидатов",
    path: "/candidates/applications",
    icon: "fact_check",
  },
  {
    name: "Заявки на стажёров",
    path: "/departments/applications",
    icon: "list",
  },
  { name: "Список наставников", path: "/mentors", icon: "group" },
  {
    name: "Статистика по кандидатам",
    path: "/statistics",
    icon: "bar_chart",
  },
];

export const staffNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  {
    name: "Моя организация",
    path: "/department",
    icon: "fact_check",
    end: true,
  },
  {
    name: "Наши заявки",
    path: "/department/applications",
    icon: "list",
  },
  {
    name: "Создать заявку",
    path: "/department/application/create",
    icon: "edit_document",
  },
  {
    name: "Отклики от стажеров",
    path: "/department/applications/responses",
    icon: "attach_file_add",
  },
];
