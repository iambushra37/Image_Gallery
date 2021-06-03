const pad2 = n => (n < 10 ? '0' : '') + n;

export const getFormattedDate = () => {
  const date = new Date();
  return date.getFullYear() + '-' +
    pad2(date.getMonth() + 1) + '-' +
    pad2(date.getDate()) + '-' +
    pad2(date.getHours()) + '-' +
    pad2(date.getMinutes()) + '-' +
    pad2(date.getSeconds());
};

export const formatSecondsToElapsedTime = elapsedTime => {
  const date = new Date(elapsedTime * 1000);
  const minSec = pad2(date.getUTCMinutes()) + ':' +
    pad2(date.getUTCSeconds());
  if (date.getUTCHours() === 0)
    return minSec;
  else
    return pad2(date.getUTCHours()) + ':' + minSec;
};
