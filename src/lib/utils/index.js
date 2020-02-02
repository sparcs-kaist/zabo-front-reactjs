import moment from 'moment';

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

export const dataURLToBlob = (dataURL) => {
  const blobBin = atob (dataURL.split (',')[1]);
  const array = [];
  for (let i = 0; i < blobBin.length; i += 1) {
    array.push (blobBin.charCodeAt (i));
  }
  // const file = new Blob ([new Uint8Array (array)], { type: 'image/png' });
  return new Blob ([new Uint8Array (array)]);
};

export const loadImageFile = (file) => {
  const _URL = window.URL || window.webkitURL;
  const img = new Image ();
  const objectUrl = _URL.createObjectURL (file);
  return new Promise ((res, rej) => {
    img.onload = () => {
      _URL.revokeObjectURL (objectUrl);
      res (img);
    };
    img.src = objectUrl;
  });
};

export const imageFileGetWidthHeight = async (file) => {
  const image = await loadImageFile (file);
  const { width, height } = image;
  return { width, height, ratio: width / height };
};

export const cropImage = async (file, ratio) => {
  const image = await loadImageFile (file);
  const { width, height } = image;
  const ownRatio = width / height;
  let dWidth;
  let dHeight;
  const canvas = document.createElement ('canvas');
  if (ownRatio > ratio) {
    dHeight = height;
    dWidth = height * ratio;
  } else {
    dWidth = width;
    dHeight = width / ratio;
  }
  canvas.width = dWidth;
  canvas.height = dHeight;
  const context = canvas.getContext ('2d');
  context.fillStyle = 'white';
  context.fillRect (0, 0, canvas.width, canvas.height);

  // crop it top center
  context.drawImage (image, 0, 0, dWidth, dHeight, 0, 0, dWidth, dHeight);
  // const base64ImageData = canvas.get(0).toDataURL();
  // const imgSrc = canvas.toDataURL ('image/png');
  return canvas.toDataURL ('image/jpeg');
};

export const getLabeledTimeDiff = (time, showSecs = true, showMins = true, showHours = true, showDays = 2, showWeeks = false, showMonths = false) => {
  const curMoment = moment ();
  const momentTime = moment (time);
  const momentLabel = momentTime.format ('YYYY.MM.DD');
  const secDiff = curMoment.diff (momentTime, 'seconds');
  const minDiff = curMoment.diff (momentTime, 'minutes');
  const hoursDiff = curMoment.diff (momentTime, 'hours');
  const daysDiff = curMoment.diff (momentTime, 'days');
  const weeksDiff = curMoment.diff (momentTime, 'weeks');
  const monthsDiff = curMoment.diff (momentTime, 'months');

  const isShow = (showVar, diff) => (typeof showVar === 'number' && diff <= showVar) || (typeof showVar !== 'number' && showVar);

  return (
    secDiff < 60 ? (isShow (showSecs, secDiff) ? '방금 전' : momentLabel)
      : minDiff < 60 ? (isShow (showMins, minDiff) ? `${minDiff}분 전` : momentLabel)
        : hoursDiff < 24 ? (isShow (showHours, hoursDiff) ? `${hoursDiff}시간 전` : momentLabel)
          : daysDiff < 7 ? (isShow (showDays, daysDiff) ? `${daysDiff}일 전` : momentLabel)
            : weeksDiff < 5 ? (isShow (showWeeks, weeksDiff) ? `${weeksDiff}주 전` : momentLabel)
              : (isShow (showMonths, monthsDiff) ? `${monthsDiff}개월 전` : momentLabel)
  );
};

export const isElementOverflown = (element) => element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
