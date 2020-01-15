export * from './selector';

export const mediaSizes = {
  xs: 360,
  s: 520,
  md: 640,
  lg: 960,
  xl: 1440,
};

export const gridLayoutCompareFunction = (a, b) => {
  const { x: ax, y: ay } = a.updatedLayout;
  const { x: bx, y: by } = b.updatedLayout;
  if (ay - by) return ay - by;
  return ax - bx;
};

export const to2Digits = (number, sign = false) => {
  let result;
  let pos;
  if (number < 0) {
    result = (-number).toString ();
    pos = false;
  } else {
    result = number.toString ();
    pos = true;
  }
  while (result.length < 2) result = `0${result}`;
  if (result.length > 2) result = '99';
  if (!pos) result = `-${result}`;
  if (sign && pos) result = `+${result}`;
  return result;
};
