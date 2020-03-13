"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidDate = isValidDate;
exports.parseFuncs = exports.reverseFuncs = void 0;
// reverse requested format to datetime
var reverseFuncs = [{
  key: 'YYYY',
  handler: function handler(label, format, datetime) {
    var index = format.indexOf('YYYY');
    var year = label.substring(index, index + 4);
    return datetime.setYear(Number.parseInt(year, 10));
  }
}, {
  key: 'MM',
  handler: function handler(label, format, datetime) {
    var index = format.indexOf('MM');
    var month = label.substring(index, index + 2);
    return datetime.setMonth(Number.parseInt(month, 10) - 1);
  }
}, {
  key: 'DD',
  handler: function handler(label, format, datetime) {
    var index = format.indexOf('DD');
    var date = label.substring(index, index + 2);
    return datetime.setDate(Number.parseInt(date, 10));
  }
}, {
  key: 'HH',
  handler: function handler(label, format, datetime) {
    var index = format.indexOf('HH');
    var hours = label.substring(index, index + 2);
    return datetime.setHours(Number.parseInt(hours, 10));
  }
}, {
  key: 'mm',
  handler: function handler(label, format, datetime) {
    var index = format.indexOf('mm');
    var minutes = label.substring(index, index + 2);
    return datetime.setMinutes(Number.parseInt(minutes, 10));
  }
}, {
  key: 'ss',
  handler: function handler(label, format, datetime) {
    var index = format.indexOf('ss');
    var seconds = label.substring(index, index + 2);
    return datetime.setSeconds(Number.parseInt(seconds, 10));
  }
}]; // parse datetime to requested format

exports.reverseFuncs = reverseFuncs;
var parseFuncs = [{
  key: 'YYYY',
  handler: function handler(datetime, str) {
    var year = datetime.getFullYear();
    return str.replace('YYYY', year.toString());
  }
}, {
  key: 'MM',
  handler: function handler(datetime, str) {
    // Need to increase month value by 1
    var month = datetime.getMonth() + 1;
    var tmp = month < 10 ? "0".concat(month) : month;
    return str.replace('MM', tmp.toString());
  }
}, {
  key: 'DD',
  handler: function handler(datetime, str) {
    var day = datetime.getDate();
    var tmp = day < 10 ? "0".concat(day) : day;
    return str.replace('DD', tmp.toString());
  }
}, {
  key: 'HH',
  handler: function handler(datetime, str) {
    var hour = datetime.getHours();
    var tmp = hour < 10 ? "0".concat(hour) : hour;
    return str.replace('HH', tmp.toString());
  }
}, {
  key: 'mm',
  handler: function handler(datetime, str) {
    var minutes = datetime.getMinutes();
    var tmp = minutes < 10 ? "0".concat(minutes) : minutes;
    return str.replace('mm', tmp.toString());
  }
}, {
  key: 'ss',
  handler: function handler(datetime, str) {
    var seconds = datetime.getSeconds();
    var tmp = seconds < 10 ? "0".concat(seconds) : seconds;
    return str.replace('ss', tmp.toString());
  }
}];
exports.parseFuncs = parseFuncs;

function isValidDate(date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (Number.isNaN(date.getTime())) {
      return false;
    }

    return true;
  }

  return false;
}