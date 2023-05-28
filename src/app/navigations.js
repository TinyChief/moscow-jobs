export const internNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Список стажировок", path: "/intern/jobs", icon: "list", end: true },
  { name: "Мои заявки", path: "/intern/jobs/applications", icon: "list" },
];

export const candidateNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Подать заявку", path: "/application", icon: "text_snippet" },
  { name: "Мой наставник", path: "/intern/mentor", icon: "group" },
];
export const mentorNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Мой стажёр", path: "/mentor/my-intern", icon: "group", end: true },
  {
    name: "Расписание",
    path: "/mentor/my-intern/schedule",
    icon: "calendar_month",
  },
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
  { name: "Список наставников", path: "/curator/mentors", icon: "group" },
  {
    name: "Статистика по кандидатам",
    path: "/curator/statistics",
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
    end: true,
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
