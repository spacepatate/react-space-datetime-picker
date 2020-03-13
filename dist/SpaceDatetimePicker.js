"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _helper = require("./helper");

var _SpaceDatePicker = _interopRequireDefault(require("./SpaceDatePicker"));

var _SpaceMonthPicker = _interopRequireDefault(require("./SpaceMonthPicker"));

var _SpaceYearPicker = _interopRequireDefault(require("./SpaceYearPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var calendarMode = {
  DatePick: 1,
  MonthPick: 2,
  YearPick: 3
};

var SpaceDatetimePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(SpaceDatetimePicker, _React$Component);

  function SpaceDatetimePicker(props) {
    var _this;

    _classCallCheck(this, SpaceDatetimePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceDatetimePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (datetime) {
      _this.setState({
        datetime: datetime,
        displayPopover: false
      });

      document.removeEventListener('click', _this.onClickHandler);

      if (!_this.props.disabled) {
        _this.props.onChange(datetime);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openPopover", function (e) {
      _this.setState({
        displayPopover: true
      });

      var el = _this.state.ref.current;

      if (!el) {
        return;
      }

      var viewportOffset = el.getBoundingClientRect();
      var popoverPositionLeft = viewportOffset.left;
      var popoverPositionTop = viewportOffset.top + viewportOffset.height;

      _this.setState({
        popoverStyle: {
          position: 'absolute',
          left: "".concat(popoverPositionLeft, "px"),
          top: "".concat(popoverPositionTop, "px"),
          'z-index': 100
        }
      });

      e.stopPropagation();
      e.preventDefault();
      document.addEventListener('click', _this.onClickHandler);
    });

    _defineProperty(_assertThisInitialized(_this), "onClickHandler", function (e) {
      if (!_this.state.popoverRef.current) {
        return;
      }

      var viewportOffset = _this.state.popoverRef.current.getBoundingClientRect();

      var zoneX = viewportOffset.x + viewportOffset.width;
      var zoneY = viewportOffset.y + viewportOffset.height;

      if (e.clientX < viewportOffset.x || e.clientX > zoneX || e.clientY < viewportOffset.y || e.clientY > zoneY) {
        _this.setState({
          displayPopover: false
        });

        document.removeEventListener('click', _this.onClickHandler);

        if ((0, _helper.isValidDate)(_this.state.datetime) && !_this.props.disabled) {
          _this.props.onChange(_this.state.datetime);
        }

        _this.setState({
          mode: calendarMode.DatePick
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDateChange", function (_ref) {
      var datetime = _ref.datetime;

      _this.setState({
        datetime: datetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMonthChange", function (datetime) {
      _this.setState({
        datetime: datetime,
        mode: calendarMode.DatePick
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onYearChange", function (datetime) {
      _this.setState({
        datetime: datetime,
        mode: calendarMode.DatePick
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMonthPickTrigger", function () {
      _this.setState({
        mode: calendarMode.MonthPick
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onYearPickTrigger", function () {
      _this.setState({
        mode: calendarMode.YearPick
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var datetime = new Date();

      if (!_this.state.label) {
        _this.props.onChange(null);

        return;
      }

      for (var i = 0; i < _helper.reverseFuncs.length; i += 1) {
        var parseFunc = _helper.reverseFuncs[i];

        if (_this.props.format.includes(parseFunc.key)) {
          var tmp = parseFunc.handler(_this.state.label, _this.props.format, datetime);
          datetime = new Date(tmp);
        }
      }

      if ((0, _helper.isValidDate)(datetime) && !_this.props.disabled) {
        _this.setState({
          datetime: datetime
        });

        _this.props.onChange(datetime);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClearBtnClick", function () {
      _this.setState({
        displayPopover: false,
        label: null,
        datetime: null
      });

      _this.props.onChange(null);
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      _this.setState({
        label: e.target.value
      });
    });

    var _datetime = null;

    if (props.value && (0, _helper.isValidDate)(props.value)) {
      _datetime = new Date(props.value);
    }

    _this.state = {
      datetime: _datetime,
      // current calendar dispalyed datetime
      mode: calendarMode.DatePick,
      // 1 calendar day pick | 2 months pick | 3 year pick
      label: null,
      // dispalyed datetime label in input
      displayPopover: false,
      // bool for popover visibility
      showClearBtn: false,
      popoverStyle: null,
      ref: _react.default.createRef(),
      popoverRef: _react.default.createRef()
    };
    return _this;
  }

  _createClass(SpaceDatetimePicker, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      // watch for datetime cahnge
      if (this.state.datetime && (!prevState.datetime || this.state.datetime.getTime() !== prevState.datetime.getTime())) {
        // if datetime changed, format the label to requested format
        var tmp = this.props.format;

        for (var i = 0; i < _helper.parseFuncs.length; i += 1) {
          var parseFunc = _helper.parseFuncs[i];

          if (this.props.format.includes(parseFunc.key)) {
            tmp = parseFunc.handler(this.state.datetime, tmp);
          }
        }

        this.setState({
          label: tmp,
          showClearBtn: !!tmp
        });
      }

      if (prevState.datetime && !this.state.datetime) {
        this.setState({
          label: null,
          showClearBtn: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var showBtn = this.state.showClearBtn && !this.state.disabled;
      var datetime = this.state.datetime;
      var _this$props = this.props,
          showHome = _this$props.showHome,
          showTime = _this$props.showTime,
          weekday = _this$props.weekday,
          locale = _this$props.locale,
          disabled = _this$props.disabled,
          startingDay = _this$props.startingDay,
          month = _this$props.month,
          hour12 = _this$props.hour12;
      var inputDisplay = this.props.customDisplay ? _react.default.createElement("span", {
        ref: this.state.ref,
        onClick: this.openPopover
      }, this.props.customDisplay) : _react.default.createElement("div", {
        className: "default-input",
        ref: this.state.ref
      }, _react.default.createElement("input", {
        className: "space-input",
        value: this.state.label ? this.state.label : '',
        onChange: this.onInputChange,
        onClick: this.openPopover,
        disabled: this.props.disabled,
        placeholder: this.props.placeholder,
        onBlur: this.onBlur,
        type: "text"
      }), showBtn && !this.props.disabled && _react.default.createElement("span", {
        className: "clear-btn",
        onClick: this.onClearBtnClick
      }, "\xD7"));
      return _react.default.createElement("div", {
        className: "space-datetime-picker"
      }, inputDisplay, this.state.displayPopover && _react.default.createElement("div", {
        className: "space-datetime-popover",
        ref: this.state.popoverRef
      }, this.state.mode === calendarMode.DatePick && _react.default.createElement(_SpaceDatePicker.default, {
        value: datetime,
        showTime: showTime,
        showHome: showHome,
        weekday: weekday,
        locale: locale,
        disabled: disabled,
        hour12: hour12,
        startingDay: startingDay,
        onYearChange: this.onDateChange,
        onMonthChange: this.onDateChange,
        onMonthPickTrigger: this.onMonthPickTrigger,
        onYearPickTrigger: this.onYearPickTrigger,
        onChange: this.onDateChange,
        onSelect: this.onSelect
      }), this.state.mode === calendarMode.MonthPick && _react.default.createElement(_SpaceMonthPicker.default, {
        value: datetime,
        locale: locale,
        disabled: disabled,
        month: month,
        onChange: this.onMonthChange
      }), this.state.mode === calendarMode.YearPick && _react.default.createElement(_SpaceYearPicker.default, {
        value: datetime,
        disabled: disabled,
        onChange: this.onYearChange
      })));
    }
  }]);

  return SpaceDatetimePicker;
}(_react.default.Component);

SpaceDatetimePicker.propTypes = {
  value: _propTypes.default.instanceOf(Date),
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
  customDisplay: _propTypes.default.any
};
SpaceDatetimePicker.defaultProps = {
  value: null,
  placeholder: null,
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
  onChange: function onChange() {
    return null;
  },
  customDisplay: null
};
var _default = SpaceDatetimePicker;
exports.default = _default;