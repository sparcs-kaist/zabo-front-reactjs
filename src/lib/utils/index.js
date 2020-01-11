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
