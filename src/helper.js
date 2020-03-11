// reverse requested format to datetime
export const reverseFuncs = [
    {
      key: 'YYYY',
      handler: (label, format, datetime) => {
        const index = format.indexOf('YYYY');
        const year = label.substring(index, index + 4);
        return datetime.setYear(Number.parseInt(year, 10));
      },
    },
    {
      key: 'MM',
      handler: (label, format, datetime) => {
        const index = format.indexOf('MM');
        const month = label.substring(index, index + 2);
        return datetime.setMonth(Number.parseInt(month, 10) - 1);
      },
    },
    {
      key: 'DD',
      handler: (label, format, datetime) => {
        const index = format.indexOf('DD');
        const date = label.substring(index, index + 2);
        return datetime.setDate(Number.parseInt(date, 10));
      },
    },
    {
      key: 'HH',
      handler: (label, format, datetime) => {
        const index = format.indexOf('HH');
        const hours = label.substring(index, index + 2);
        return datetime.setHours(Number.parseInt(hours, 10));
      },
    },
    {
      key: 'mm',
      handler: (label, format, datetime) => {
        const index = format.indexOf('mm');
        const minutes = label.substring(index, index + 2);
        return datetime.setMinutes(Number.parseInt(minutes, 10));
      },
    },
    {
      key: 'ss',
      handler: (label, format, datetime) => {
        const index = format.indexOf('ss');
        const seconds = label.substring(index, index + 2);
        return datetime.setSeconds(Number.parseInt(seconds, 10));
      },
    },
  ];
  
  // parse datetime to requested format
  export const parseFuncs = [
    {
      key: 'YYYY',
      handler: (datetime, str) => {
        const year = datetime.getFullYear();
        return str.replace('YYYY', year.toString());
      },
    },
    {
      key: 'MM',
      handler: (datetime, str) => {
        // Need to increase month value by 1
        const month = datetime.getMonth() + 1;
        const tmp = month < 10 ? `0${month}` : month;
        return str.replace('MM', tmp.toString());
      },
    },
    {
      key: 'DD',
      handler: (datetime, str) => {
        const day = datetime.getDate();
        const tmp = day < 10 ? `0${day}` : day;
        return str.replace('DD', tmp.toString());
      },
    },
    {
      key: 'HH',
      handler: (datetime, str) => {
        const hour = datetime.getHours();
        const tmp = hour < 10 ? `0${hour}` : hour;
        return str.replace('HH', tmp.toString());
      },
    },
    {
      key: 'mm',
      handler: (datetime, str) => {
        const minutes = datetime.getMinutes();
        const tmp = minutes < 10 ? `0${minutes}` : minutes;
        return str.replace('mm', tmp.toString());
      },
    },
    {
      key: 'ss',
      handler: (datetime, str) => {
        const seconds = datetime.getSeconds();
        const tmp = seconds < 10 ? `0${seconds}` : seconds;
        return str.replace('ss', tmp.toString());
      },
    },
  ];
  
  export function isValidDate(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      if (Number.isNaN(date.getTime())) {
        return false;
      }
      return true;
    }
    return false;
  }
  