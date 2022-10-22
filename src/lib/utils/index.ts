import { useHistory } from "react-router-dom";
import moment from "moment";
import queryString, { ParsedQuery } from "query-string";

import { alerts, RESERVED_ROUTES_USERNAME_EXCEPTIONS } from "../variables";

export * from "./selector";

export const parseJSON = (jsonString: string | object, fallback = {}) => {
  if (typeof jsonString === "object") {
    return jsonString;
  }
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(jsonString);
    console.error(error.message);
    return fallback;
  }
};

export const mediaSizes = {
  xs: 360,
  s: 520,
  md: 640,
  lg: 960,
  xl: 1440,
};

export const gridLayoutCompareFunction = (a: any, b: any) => {
  const { x: ax, y: ay } = a.updatedLayout;
  const { x: bx, y: by } = b.updatedLayout;
  if (ay - by) return ay - by;
  return ax - bx;
};

export const to2Digits = (number: number, sign = false) => {
  let result;
  let pos;
  if (number < 0) {
    result = (-number).toString();
    pos = false;
  } else {
    result = number.toString();
    pos = true;
  }
  while (result.length < 2) result = `0${result}`;
  if (result.length > 2) result = "99";
  if (!pos) result = `-${result}`;
  if (sign && pos) result = `+${result}`;
  return result;
};

export const dataURLToBlob = (dataURL: string) => {
  const blobBin = atob(dataURL.split(",")[1]);
  const array = [];
  for (let i = 0; i < blobBin.length; i += 1) {
    array.push(blobBin.charCodeAt(i));
  }
  // const file = new Blob ([new Uint8Array (array)], { type: 'image/png' });
  return new Blob([new Uint8Array(array)]);
};

export const loadImageFile = (file: File): Promise<HTMLImageElement> => {
  const _URL = window.URL || window.webkitURL;
  const img = new Image();
  const objectUrl = _URL.createObjectURL(file);
  return new Promise((res, rej) => {
    img.onload = () => {
      _URL.revokeObjectURL(objectUrl);
      res(img);
    };
    img.src = objectUrl;
  });
};

export const imageFileGetWidthHeight = async (file: File) => {
  const image: HTMLImageElement = await loadImageFile(file);
  const { width, height } = image;
  return { width, height, ratio: width / height };
};

export const cropImage = async (file: File, ratio: number): Promise<string> => {
  const image = await loadImageFile(file);
  const { width, height } = image;
  const ownRatio = width / height;
  let dWidth;
  let dHeight;
  const canvas = document.createElement("canvas");
  if (ownRatio > ratio) {
    dHeight = height;
    dWidth = height * ratio;
  } else {
    dWidth = width;
    dHeight = width / ratio;
  }
  canvas.width = dWidth;
  canvas.height = dHeight;
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // crop it top center
  context.drawImage(image, 0, 0, dWidth, dHeight, 0, 0, dWidth, dHeight);
  // const base64ImageData = canvas.get(0).toDataURL();
  // const imgSrc = canvas.toDataURL ('image/png');
  return canvas.toDataURL("image/jpeg");
};

export const validateName = (name: string) => {
  // 1~25자 제한
  if (name.length === 0 || name.length > 25) return false;
  // 첫 글자로는 _, 알파벳, 한글, 숫자만 입력 가능
  // ._- 한글 알파벳 숫자 입력 가능
  const patt = new RegExp(/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9_][ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9._-]*$/);
  if (!patt.test(name)) return false;
  const doubleCharPatt = /(--)|(\.\.)|(__)/;
  if (doubleCharPatt.test(name)) return false;
  const match = RESERVED_ROUTES_USERNAME_EXCEPTIONS.find(
    (exception) => exception === name.toLowerCase(),
  );
  return !match;
};

export const getLabeledTimeDiff = (
  time: string,
  showSecs = 60,
  showMins = 60,
  showHours = 24,
  showDays = 2,
  showWeeks = 0,
  showMonths = 0,
) => {
  const curMoment = moment();
  const momentTime = moment(time);
  const momentLabel = momentTime.format("YYYY.MM.DD");
  const secDiff = curMoment.diff(momentTime, "seconds");
  const minDiff = curMoment.diff(momentTime, "minutes");
  const hoursDiff = curMoment.diff(momentTime, "hours");
  const daysDiff = curMoment.diff(momentTime, "days");
  const weeksDiff = curMoment.diff(momentTime, "weeks");
  const monthsDiff = curMoment.diff(momentTime, "months");

  const isShow = (showVar: number, diff: number) => diff < showVar;

  return secDiff < 60
    ? isShow(showSecs, secDiff)
      ? "방금 전"
      : momentLabel
    : minDiff < 60
    ? isShow(showMins, minDiff)
      ? `${minDiff}분 전`
      : momentLabel
    : hoursDiff < 24
    ? isShow(showHours, hoursDiff)
      ? `${hoursDiff}시간 전`
      : momentLabel
    : daysDiff < 7
    ? isShow(showDays, daysDiff)
      ? `${daysDiff}일 전`
      : momentLabel
    : weeksDiff < 5
    ? isShow(showWeeks, weeksDiff)
      ? `${weeksDiff}주 전`
      : momentLabel
    : isShow(showMonths, monthsDiff)
    ? `${monthsDiff}개월 전`
    : momentLabel;
};

export const isElemWidthOverflown = (element: HTMLElement) =>
  element.scrollWidth > element.clientWidth;
// export const isElementOverflown = (element) => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;

export const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const parseQuery = (search: string): { safeQuery: string; safeCategory: string[] } => {
  const { query, category } = queryString.parse(search);
  const safeQuery = !query ? "" : escapeRegExp(Array.isArray(query) ? query[0] : query).trim();
  const safeCategory = !category ? [] : !Array.isArray(category) ? [category] : category;
  return { safeQuery, safeCategory };
};

export const jsonPrettyStringify = (json: any) => {
  let result = json;
  if (typeof result !== "string") {
    result = JSON.stringify(result, undefined, 2);
  }
  result = result.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return result.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match: string) => {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
};

export const pushWithAuth = (
  to: string,
  history: ReturnType<typeof useHistory>,
  isAuthed: boolean,
): void => {
  if (!isAuthed) {
    if (window.confirm(alerts.login)) {
      history.replace({ pathname: "/auth/login", state: { referrer: history.location.pathname } });
    }
  } else {
    history.push(to);
  }
};

export const withAuth = (history: ReturnType<typeof useHistory>, isAuthed: boolean) => {
  if (!isAuthed) {
    if (window.confirm(alerts.login)) {
      history.replace({ pathname: "/auth/login", state: { referrer: history.location.pathname } });
      return true;
    }
    return false;
  }
  return true;
};
