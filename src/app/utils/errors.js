const errorsMap = {
  "No active account found with the given credentials":
    "Нет такого пользователя. Проверьте правильность ввёденных данных и повторите попытку.",
};

export class ApiError extends Error {
  constructor(status, data) {
    super();
    this.status = status;
    this.data = data;
  }

  get title() {
    return "Ошибка при запросе к серверу";
  }

  get message() {
    switch (this.status) {
      case 400:
        return Object.entries(this.data)
          .reduce((acc, [key, value]) => {
            acc.push(...value.map(v => `${v} (${key})`));
            return acc;
          }, [])
          .map((val, i) => `${i + 1}) ${val}`)
          .join("\n");
      case 401:
        return errorsMap[this.data.detail] || this.data.detail;
      default:
        return JSON.stringify(this.data);
    }
  }
}
