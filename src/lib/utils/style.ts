import { css } from "styled-components";

export const mediaSizes = {
  desktop: 992,
  tablet: 640,
  mobile: 320,
} as const;

const wrapMedia =
  (size: number) =>
  (...args: ReturnType<typeof css> | Parameters<typeof css>) =>
    css`
      @media (min-width: ${size / 16}em) {
        ${Array.isArray(args) && args.length > 1 ? css(...args) : args};
      }
    `;

export const media = {
  desktop: wrapMedia(mediaSizes.desktop),
  tablet: wrapMedia(mediaSizes.tablet),
  mobile: wrapMedia(mediaSizes.mobile),
} as const;

export const get =
  <P extends Record<keyof P, V>, V>(prop: keyof P, defaultValue: V) =>
  (props: P & { theme: P }) =>
    props[prop] || props.theme[prop] || defaultValue;
export const getSize =
  <P>(prop: keyof P) =>
  (props: P) =>
    typeof props[prop] === "number" ? `${props[prop]}px` : props[prop];

export const cx = (...classNames: (string | Record<string, boolean>)[]) => {
  let result = "";
  classNames.forEach((className) => {
    if (typeof className === "string") result += `${className} `;
    if (typeof className === "object") {
      for (const key in className) {
        // eslint-disable-next-line no-prototype-builtins
        if (className.hasOwnProperty(key)) if (className[key]) result += `${key} `;
      }
    }
  });
  return result.trim();
};
