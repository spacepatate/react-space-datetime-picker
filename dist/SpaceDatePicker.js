"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SpaceTimePicker = _interopRequireDefault(require("./SpaceTimePicker"));

var _WeekDayEnum = require("./WeekDayEnum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var daysOfWeekOrder = [_WeekDayEnum.Monday, _WeekDayEnum.Tuesday, _WeekDayEnum.Wednesday, _WeekDayEnum.Thursday, _WeekDayEnum.Friday, _WeekDayEnum.Saturday, _WeekDayEnum.Sunday];
var dateRangeMode = 'date-range';

var SpaceDatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(SpaceDatePicker, _React$Component);

  function SpaceDatePicker(props) {
    var _this;

    _classCallCheck(this, SpaceDatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceDatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      _this.week = [];
      _this.tmpCalendar = [];

      _this.insertPrevMonthDays();

      _this.insertCurrentMonthDays();

      _this.insertNextMonthDays();

      _this.setState({
        calendar: _this.tmpCalendar
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkPrevBtnsVisibility", function () {
      if (_this.props.mode !== dateRangeMode) {
        return;
      }

      if (!_this.props.rightRangeDatePicker) {
        _this.setState({
          hidePrevBtns: false
        });

        return;
      }

      if (_this.getMonthsDiff(_this.props.startingDate, _this.state.datetime) > 0 || _this.state.datetimeBis && _this.getMonthsDiff(_this.state.datetimeBis, _this.state.datetime) > 1) {
        _this.setState({
          hidePrevBtns: false
        });

        return;
      }

      _this.setState({
        hidePrevBtns: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkNextBtnsVisibility", function () {
      if (_this.props.mode !== dateRangeMode) {
        return;
      }

      if (!_this.props.leftRangeDatePicker) {
        _this.setState({
          hideNextBtns: false
        });

        return;
      }

      var _this$state = _this.state,
          datetime = _this$state.datetime,
          datetimeBis = _this$state.datetimeBis;
      var startingDate = _this.props.startingDate;

      if (_this.getMonthsDiff(datetime, startingDate) > 0) {
        if (datetimeBis && _this.getMonthsDiff(datetime, datetimeBis) <= 1) {
          _this.setState({
            hideNextBtns: true
          });

          return;
        }

        _this.setState({
          hideNextBtns: false
        });

        return;
      }

      if (_this.getMonthsDiff(datetime, datetimeBis) > 1) {
        _this.setState({
          hideNextBtns: true
        });

        return;
      }

      _this.setState({
        hideNextBtns: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseoverDate", function (datetime) {
      if (_this.props.mode !== dateRangeMode) {
        return;
      }

      var rangeDatetimes = _this.props.rangeDatetimes;

      if (rangeDatetimes.startDatetime && rangeDatetimes.endDatetime) {
        return;
      } // $emit event


      _this.props.onDateOver(datetime);

      _this.setState({
        currentOverDate: datetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFirstDayOfMonth", function () {
      return new Date(_this.state.datetime.getFullYear(), _this.state.datetime.getMonth(), 1);
    });

    _defineProperty(_assertThisInitialized(_this), "getFirstDayOfWeek", function () {
      var index = daysOfWeekOrder.findIndex(function (day) {
        return day === _this.props.startingDay;
      });
      return daysOfWeekOrder[index];
    });

    _defineProperty(_assertThisInitialized(_this), "getLastDayOfMonth", function () {
      return new Date(_this.state.datetime.getFullYear(), _this.state.datetime.getMonth() + 1, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentMonthLabel", function () {
      return _this.state.datetime.toLocaleString(_this.props.locale, {
        month: _this.props.month
      });
    });

    _defineProperty(_assertThisInitialized(_this), "initWeekDays", function () {
      var tmpDaysOfWeekOrder = [].concat(daysOfWeekOrder);
      var index = tmpDaysOfWeekOrder.findIndex(function (day) {
        return day === _this.props.startingDay;
      });
      var tmp = tmpDaysOfWeekOrder.splice(index);

      var weekDaysOrder = _toConsumableArray(tmp);

      if (index > 0) {
        var tmp2 = tmpDaysOfWeekOrder.splice(0, index);
        weekDaysOrder = [].concat(_toConsumableArray(tmp), _toConsumableArray(tmp2));
      }

      var currentDay = new Date();
      var _this$props = _this.props,
          locale = _this$props.locale,
          weekday = _this$props.weekday;
      var weekDays = [];

      for (var i = 0; i < weekDaysOrder.length; i += 1) {
        var day = currentDay.getDay();
        var distance = weekDaysOrder[i] - day;
        var tmp3 = new Date(currentDay.setDate(currentDay.getDate() + distance));
        var label = tmp3.toLocaleDateString(locale, {
          weekday: weekday
        }); // get translated day and insert into weekdays

        weekDays.push(label);
      }

      _this.setState({
        weekDays: weekDays
      });
    });

    _defineProperty(_assertThisInitialized(_this), "insertPrevMonthDays", function () {
      var firstDateOfMonth = _this.getFirstDayOfMonth().getDay() === 0 ? 7 : _this.getFirstDayOfMonth().getDay();
      var datetime = _this.state.datetime;

      if (_this.getFirstDayOfWeek() === firstDateOfMonth) {
        return;
      }

      var diff = firstDateOfMonth - _this.getFirstDayOfWeek();

      while (diff > 0) {
        // get first day of the month
        var date = new Date(datetime.getFullYear(), datetime.getMonth(), 1, datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()); // get the starting day of calendar from diff

        date.setDate(date.getDate() - diff);

        _this.week.push(date);

        diff -= 1;
      }

      if (_this.week.length >= 7) {
        _this.tmpCalendar.push(_this.week);

        _this.week = [];
      }
    });

    _defineProperty(_assertThisInitialized(_this), "insertCurrentMonthDays", function () {
      var datetime = _this.state.datetime;

      for (var i = _this.getFirstDayOfMonth().getDate(); i <= _this.getLastDayOfMonth().getDate(); i += 1) {
        var date = new Date(datetime.getFullYear(), datetime.getMonth(), i, datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());

        if (_this.week.length >= 7) {
          _this.tmpCalendar.push(_this.week);

          _this.week = [];
        }

        _this.week.push(date);
      }

      if (_this.week.length >= 7) {
        _this.tmpCalendar.push(_this.week);

        _this.week = [];
      }
    });

    _defineProperty(_assertThisInitialized(_this), "insertNextMonthDays", function () {
      var lastDayOfMonthDay = _this.getLastDayOfMonth().getDay() === 0 ? 7 : _this.getLastDayOfMonth().getDay();

      if (lastDayOfMonthDay >= 7) {
        return;
      }

      var diff2 = 7 - lastDayOfMonthDay;
      var datetime = _this.state.datetime;

      for (var i = 0; i < diff2; i += 1) {
        var date = new Date(datetime.getFullYear(), datetime.getMonth() + 1, 0, datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
        date.setDate(date.getDate() + i + 1);

        if (_this.week.length >= 7) {
          _this.tmpCalendar.push(_this.week);

          _this.week = [];
        }

        _this.week.push(date);
      }

      if (_this.week.length >= 7) {
        _this.tmpCalendar.push(_this.week);

        _this.week = [];
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formatedDayLabel", function (day) {
      if (_this.props.day === 'numeric') {
        return day.getDate();
      }

      return day.getDate() < 10 ? "0".concat(day.getDate()) : day.getDate();
    });

    _defineProperty(_assertThisInitialized(_this), "selectDate", function (date) {
      if (_this.props.disabled) {
        return;
      } // Prevent to select days of prev/next month in date-range mode


      if (_this.props.mode === dateRangeMode && (_this.isPrevMonth(date) || _this.isNextMonth(date))) {
        return;
      }

      if (_this.props.showTime) {
        _this.props.onChange({
          datetime: date
        });
      } else {
        _this.props.onSelect(date);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectMonth", function (month) {
      var tmp = new Date(_this.state.datetime);
      var datetime = new Date(tmp.setMonth(month)); // this.setState({ datetime, });

      _this.props.onMonthChange({
        leftRangeDatePicker: _this.props.leftRangeDatePicker,
        rightRangeDatePicker: _this.props.rightRangeDatePicker,
        datetime: datetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectPrevMonth", function () {
      var datetime = _this.state.datetime;
      var currentMonth = datetime.getMonth();

      if (currentMonth - 1 < 0) {
        // if the last month of last year is selected
        var newDatetime = new Date(datetime.getFullYear(), 11, datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());

        _this.setState({
          datetime: newDatetime
        });
      }

      return _this.selectMonth(currentMonth - 1);
    });

    _defineProperty(_assertThisInitialized(_this), "selectNextMonth", function () {
      var datetime = _this.state.datetime;
      var currentMonth = datetime.getMonth();

      if (currentMonth + 1 > 11) {
        // selected the next month of next year
        var newDatetime = new Date(datetime.getFullYear(), 0, datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());

        _this.setState({
          datetime: newDatetime
        });
      }

      return _this.selectMonth(currentMonth + 1);
    });

    _defineProperty(_assertThisInitialized(_this), "selectPrevYear", function () {
      var datetime = _this.state.datetime;
      var tmp = new Date(datetime.getTime());
      var newDatetime = new Date(tmp.setYear(tmp.getFullYear() - 1));

      _this.setState({
        datetime: newDatetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectNextYear", function () {
      var datetime = _this.state.datetime;
      var tmp = new Date(datetime.getTime());
      var newDatetime = new Date(tmp.setYear(tmp.getFullYear() + 1));

      _this.props.onYearChange({
        datetime: newDatetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeToMonthPicker", function () {
      if (_this.props.disabled) {
        return;
      } // this.$emit('modeChange', ModeEnum.MonthPick);


      _this.props.onMonthPickTrigger();
    });

    _defineProperty(_assertThisInitialized(_this), "changeToYearPicker", function () {
      if (_this.props.disabled) {
        return;
      } // this.$emit('modeChange', ModeEnum.YearPick);


      _this.props.onYearPickTrigger();
    });

    _defineProperty(_assertThisInitialized(_this), "gotoCurrentDdate", function () {
      _this.props.onChange({
        datetime: new Date()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeSelect", function (datetime) {
      if (_this.props.disabled) {
        return;
      } // this.$emit('select', datetime);


      _this.props.onSelect(datetime);
    });

    _defineProperty(_assertThisInitialized(_this), "isDayInRange", function (date) {
      var rangeDatetimes = _this.props.rangeDatetimes; // if no start datetime and end datetime being selected, no need to check further

      if (_this.props.mode !== dateRangeMode || !rangeDatetimes.startDatetime && !rangeDatetimes.endDatetime) {
        return false;
      } // when only start datetime or end datetime is being selected


      if (rangeDatetimes.startDatetime && !rangeDatetimes.endDatetime || !rangeDatetimes.startDatetime && rangeDatetimes.endDatetime) {
        var pivotDate = rangeDatetimes.startDatetime ? rangeDatetimes.startDatetime : rangeDatetimes.endDatetime; // if current date is between the pivot date and current overed date

        if (date.getTime() < pivotDate.getTime() && date.getTime() > _this.currentOverDate.getTime()) {
          return true;
        }

        if (date.getTime() > pivotDate.getTime() && date.getTime() < _this.currentOverDate.getTime()) {
          return true;
        }
      }

      if (date.getTime() > _this.rangeDatetimes.startDatetime && date.getTime() < _this.rangeDatetimes.endDatetime) {
        return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isPrevMonth", function (date) {
      var datetime = _this.state.datetime;
      return date.getMonth() < datetime.getMonth() && date.getFullYear() === datetime.getFullYear() || date.getFullYear() < datetime.getFullYear();
    });

    _defineProperty(_assertThisInitialized(_this), "isNextMonth", function (date) {
      var datetime = _this.state.datetime;
      return date.getMonth() > datetime.getMonth() && date.getFullYear() >= datetime.getFullYear();
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectedDate", function (date) {
      if (_this.props.mode === dateRangeMode) {
        var rangeDatetimes = _this.props.rangeDatetimes;

        if (!rangeDatetimes.startDatetime && !rangeDatetimes.endDatetime) {
          return false;
        }

        if (rangeDatetimes.startDatetime && _this.isSameDay(date, rangeDatetimes.startDatetime)) {
          return true;
        }

        if (rangeDatetimes.endDatetime && _this.isSameDay(date, rangeDatetimes.endDatetime)) {
          return true;
        }

        return false;
      }

      var datetime = _this.state.datetime;
      return date.getFullYear() === datetime.getFullYear() && date.getMonth() === datetime.getMonth() && date.getDate() === datetime.getDate();
    });

    var _datetime = new Date();

    if (props.value) {
      _datetime = new Date(props.value);
    } else if (props.startingDate) {
      _datetime = new Date(props.startingDate);
    }

    _this.week = [];
    _this.tmpCalendar = [];
    _this.state = {
      calendar: [],
      // array to hold sub-array of weeks,
      datetime: _datetime,
      // holder of currently displayed day in calendar
      datetimeBis: null,
      // instance of other datetime in date-range mode
      weekDays: [],
      // array to hold week day locale strings, /ex: Mon, Thu, Wes...
      currentOverDate: null,
      // currently mouse overed day date object in calendar, used in date-range mode
      hidePrevBtns: false,
      // used in date-range mode
      hideNextBtns: false // used in date-range mode 

    };
    return _this;
  }

  _createClass(SpaceDatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initWeekDays();
      this.init();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          hideNextBtns = _this$state2.hideNextBtns,
          hidePrevBtns = _this$state2.hidePrevBtns,
          datetime = _this$state2.datetime;
      var showHome = this.props.showHome;
      var weekDays = [];
      var calendar = []; // 

      for (var i = 0; i < this.state.weekDays.length; i += 1) {
        var day = this.state.weekDays[i];
        weekDays.push(_react.default.createElement("div", {
          className: "week-day",
          key: "week-day-".concat(i)
        }, " ", day, " "));
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.state.calendar[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var week = _step.value;
          var tmp = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            var _loop = function _loop() {
              var day = _step2.value;
              tmp.push(_react.default.createElement("div", {
                className: "day\n                        ".concat(_this2.isPrevMonth(day) ? 'prev-month' : '', "\n                        ").concat(_this2.isNextMonth(day) ? 'next-month' : '', "\n                        ").concat(_this2.isCurrentDate(day) ? 'current-day' : '', "\n                        ").concat(_this2.isSelectedDate(day) ? 'selected' : '', "\n                        ").concat(_this2.isDayInRange(day) ? 'day-in-range' : '', " "),
                onClick: function onClick() {
                  return _this2.selectDate(day);
                },
                key: day.getTime(),
                onMouseOver: function onMouseOver() {
                  return _this2.onMouseoverDate(day);
                }
              }, _react.default.createElement("span", null, _this2.formatedDayLabel(day))));
            };

            for (var _iterator2 = week[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          calendar.push(_react.default.createElement("div", {
            className: "weeks",
            key: "week-".concat(calendar.length)
          }, tmp));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _react.default.createElement("div", {
        className: "space-date-day-picker"
      }, _react.default.createElement("div", {
        className: "header"
      }, !hidePrevBtns && _react.default.createElement("span", {
        className: "prev-year-btn",
        onClick: this.selectPrevYear
      }), !hideNextBtns && _react.default.createElement("span", {
        className: "prev-month-btn",
        onClick: this.selectPrevMonth
      }), _react.default.createElement("div", {
        className: "current-month-year-label"
      }, _react.default.createElement("div", {
        onClick: this.changeToMonthPicker,
        className: "month-label"
      }, this.getCurrentMonthLabel()), _react.default.createElement("div", {
        onClick: this.changeToYearPicker,
        className: "year-label"
      }, datetime.getFullYear())), !hideNextBtns && _react.default.createElement("span", {
        className: "next-month-btn",
        onClick: this.selectNextMonth
      }), !hidePrevBtns && _react.default.createElement("span", {
        className: "next-year-btn",
        onClick: this.selectNextYear
      }), showHome && _react.default.createElement("span", {
        className: "icon home",
        onClick: this.gotoCurrentDdate
      })), _react.default.createElement("div", {
        className: "week-days"
      }, weekDays), _react.default.createElement("div", {
        className: "days-grid"
      }, calendar), this.props.showTime && this.state.datetime && _react.default.createElement("div", {
        className: "time-picker"
      }, _react.default.createElement(_SpaceTimePicker.default, {
        disabled: this.props.disabled,
        value: this.state.datetime,
        hour12: this.props.hour12,
        onOk: this.onTimeSelect
      })));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      if (this.props.value && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
        // Check if props value has been changed
        if (this.props.mode !== dateRangeMode) {
          this.setState({
            datetime: this.props.value
          });
          return;
        }

        if (this.props.rightRangeDatePicker && this.props.rangeDatetimes && this.props.rangeDatetimes.startDatetime && this.props.rangeDatetimes.endDatetime && this.props.rangeDatetimes.endDatetime.getTime() === this.props.value.getTime() && this.props.value.getMonth() !== this.props.datetime.getMonth()) {
          return;
        }

        if (this.props.leftRangeDatePicker && this.props.rangeDatetimes && this.props.rangeDatetimes.startDatetime && this.props.rangeDatetimes.startDatetime.getTime() === this.props.value.getTime() && this.props.value.getMonth() !== this.props.datetime.getMonth()) {
          return;
        }

        this.setState({
          datetime: this.props.value
        });
      }

      if (this.state.datetime && (this.state.datetime.getFullYear() !== prevState.datetime.getFullYear() || this.state.datetime.getMonth() !== prevState.datetime.getMonth())) {
        this.setState({
          calendar: []
        });
        setTimeout(function () {
          _this3.init();
        });
      }
    }
  }, {
    key: "getMonthsDiff",
    // Compare 2 dates to get months count diff, used in date-range mode
    value: function getMonthsDiff(dateFrom, dateTo) {
      return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
    } // Hide prev btns if it's in date-range mode

  }, {
    key: "getDateNow",
    value: function getDateNow() {
      return new Date();
    }
  }, {
    key: "isCurrentDate",
    value: function isCurrentDate(date) {
      var currentDatetime = new Date();
      return date.getFullYear() === currentDatetime.getFullYear() && date.getMonth() === currentDatetime.getMonth() && date.getDate() === currentDatetime.getDate();
    }
  }, {
    key: "isSameDay",
    value: function isSameDay(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }
  }]);

  return SpaceDatePicker;
}(_react.default.Component);

SpaceDatePicker.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  rangeDatetimes: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  format: _propTypes.default.string,
  locale: _propTypes.default.string,
  showTime: _propTypes.default.bool,
  hour12: _propTypes.default.bool,
  weekday: _propTypes.default.string,
  year: _propTypes.default.string,
  month: _propTypes.default.string,
  day: _propTypes.default.string,
  hour: _propTypes.default.string,
  minute: _propTypes.default.string,
  second: _propTypes.default.string,
  showHome: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  startingDay: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  // range datetimes only
  mode: _propTypes.default.string,
  leftRangeDatePicker: _propTypes.default.bool,
  rightRangeDatePicker: _propTypes.default.bool,
  startingDate: _propTypes.default.instanceOf(Date),
  onDateOver: _propTypes.default.func,
  onYearChange: _propTypes.default.func,
  onMonthChange: _propTypes.default.func,
  onMonthPickTrigger: _propTypes.default.func,
  onYearPickTrigger: _propTypes.default.func
};
SpaceDatePicker.defaultProps = {
  value: null,
  placeholder: null,
  rangeDatetimes: null,
  format: 'YYYY-MM-DD',
  locale: undefined,
  showTime: false,
  hour12: false,
  weekday: 'narrow',
  // long | short | narrow
  year: 'numeric',
  // numeric (ex: 2012) | 2-digit (ex: 12)
  month: 'short',
  // long | short | narrow
  day: '2-digit',
  // numeric (ex: 1) | 2-digit (ex: 01)
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  showHome: true,
  disabled: false,
  startingDay: 1,
  // 1 monday | 2 thuesday | 3 wensday... | 0 sunday
  mode: 'default',
  // default | range-date
  startingDate: null,
  leftRangeDatePicker: false,
  rightRangeDatePicker: false,
  onDateOver: function onDateOver() {},
  onChange: function onChange() {},
  onSelect: function onSelect() {},
  onMonthChange: function onMonthChange() {},
  onYearChange: function onYearChange() {},
  onMonthPickTrigger: function onMonthPickTrigger() {},
  onYearPickTrigger: function onYearPickTrigger() {}
};
var _default = SpaceDatePicker;
exports.default = _default;