import { css } from 'styled-components';

export const mediaSizes = {
  desktop: 992,
  tablet: 640,
  mobile: 320,
};

export const media = Object.keys (mediaSizes).reduce ((acc, label) => {
  acc[label] = (...args) => css`
  @media (min-width: ${mediaSizes[label] / 16}em) {
    ${args.length > 1 ? css (...args) : args};
  }
`;
  return acc;
}, {});

export const get = (prop, defaultValue) => props => props[prop] || props.theme[prop] || defaultValue;
export const getSize = prop => props => (typeof props[prop] === 'number' ? `${props[prop]}px` : props[prop]);

export const cx = (...classNames) => {
  let result = '';
  classNames.forEach (className => {
    if (typeof className === 'string') result += `${className} `;
    if (typeof className === 'object') {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in className) {
        // eslint-disable-next-line no-prototype-builtins
        if (className.hasOwnProperty (key)) if (className[key]) result += `${key} `;
      }
    }
  });
  return result.trim ();
};
