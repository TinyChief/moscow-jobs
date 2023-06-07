export const internNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Список стажировок", path: "/intern/jobs", icon: "list", end: true },
  { name: "Отклики", path: "/intern/jobs/applications", icon: "all_inbox" },
  { name: "Наставник", path: "/intern/mentor", icon: "group" },
  { name: "Расписание", path: "/intern/schedule", icon: "calendar_month" },
];

export const candidateNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  { name: "Подать заявку", path: "/candidate/application", icon: "text_snippet" },
  { name: "Расписание", path: "/candidate/schedule", icon: "calendar_month" },
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
    path: "/curator/departments/applications",
    icon: "list",
  },
  { name: "Наставники", path: "/curator/mentors", icon: "group" },
  {
    name: "Статистика",
    path: "/curator/statistics",
    icon: "bar_chart",
  },
];

export const staffNavigations = [
  { name: "Профиль и настройки", path: "/profile", icon: "account_circle" },
  {
    name: "Моя организация",
    path: "/staff/department",
    icon: "fact_check",
    end: true,
  },
  {
    name: "Заявки на стажёров",
    path: "/staff/department/applications",
    icon: "list",
    end: true,
  },
  {
    name: "Создать заявку",
    path: "/staff/department/application/create",
    icon: "edit_document",
  },
  {
    name: "Отклики стажеров",
    path: "/staff/department/applications/responses",
    icon: "attach_file_add",
  },
];
