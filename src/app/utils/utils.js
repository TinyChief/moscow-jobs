import { either, equals } from "ramda";
import { ROLES } from "./pack";

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) return window.matchMedia(`(max-width: 767px)`).matches;

  return false;
}

export function isMdScreen() {
  if (window) return window.matchMedia(`(max-width: 1199px)`).matches;

  return false;
}

function currentYPosition(elm) {
  if (!window && !elm) {
    return;
  }
  if (elm) return elm.scrollTop;
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  var startY = currentYPosition(scrollableElement);
  var stopY = elmYPosition(elm);

  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getUserInitials(name, surname) {
  return `${name ? name[0] : ""}${surname ? surname[0] : ""}`.toUpperCase();
}

export function getGenderName(gender) {
  return { male: "Мужской", female: "Женский" }[gender];
}

export function getJobStatusName(jobStatus) {
  return { 1: "Трудоустроен", 2: "В поиске работы" }[jobStatus];
}

export function getApplicationStatusName(status) {
  return {
    WAITING: "На проверке",
    ACCEPTED: "Одобрена",
    DECLINED: "Отклонена",
  }[status];
}

export const ApplicationStatuses = {
  WAITING: "WAITING",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  CONFIRMED: "CONFIRMED",
};

export const ApplicationTypes = {
  RECOMMENDED: "recommended",
  NOT_RECOMMENDED: "not-recommended",
  ALL: "all",
};

export const DirectionsNicks = {
  ГЭ: "ГЭ",
  МГ: "МГ",
  СГ: "СГ",
  КГС: "КГС",
  ПП: "ПП",
  IT: "IT",
  HR: "HR",
};

export const DirectionsNames = {
  [DirectionsNicks.ГЭ]: "Городская экономика",
  [DirectionsNicks.МГ]: "медийный город",
  [DirectionsNicks.СГ]: "социальный город",
  [DirectionsNicks.КГС]: "комфортная городская среда",
  [DirectionsNicks.ПП]: "правовое пространство",
  [DirectionsNicks.IT]: "IT город",
  [DirectionsNicks.HR]: "HR город",
};

// Описание каждого состояния:
// ACCEPTED - отклик принят кадром организации
// DECLINED - отклик отклонен организацией
// CONFIRMED - отклик подтвержден самим стажером
// WAITING - отклик еще ожидает ответа
export function getJobApplicationStatusName(status) {
  return {
    [ApplicationStatuses.ACCEPTED]: "Предложение о работе",
    [ApplicationStatuses.DECLINED]: "Отказ организии",
    [ApplicationStatuses.CONFIRMED]: "Подтверждено мною",
    [ApplicationStatuses.WAITING]: "Ожидание отклика",
  }[status];
}

export const isInternOrCandidate = either(
  equals(ROLES.CANDIDATE),
  equals(ROLES.INTERN)
);
