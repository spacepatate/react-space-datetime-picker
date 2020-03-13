"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var SpaceTimePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(SpaceTimePicker, _React$Component);

  function SpaceTimePicker(props) {
    var _this;

    _classCallCheck(this, SpaceTimePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceTimePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isAM", function () {
      var hours = _this.state.datetime.getHours();

      return hours <= 12;
    });

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      var datetime = _this.state.datetime;
      var currentHours = datetime.getHours();
      var currentMinutes = datetime.getMinutes();
      var currentSeconds = datetime.getSeconds();
      var hours = currentHours < 10 ? "0".concat(currentHours) : currentHours;

      if (_this.props.hour12) {
        if (hours > 12) {
          var tmp = hours - 12;
          hours = tmp < 10 ? "0".concat(tmp) : tmp;
        } else if (hours === 0) {
          hours = 12;
        }
      }

      var minutes = currentMinutes < 10 ? "0".concat(currentMinutes) : currentMinutes;
      var seconds = currentSeconds < 10 ? "0".concat(currentSeconds) : currentSeconds;

      _this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    });

    _defineProperty(_assertThisInitialized(_this), "increaseHours", function (value) {
      if (_this.props.disabled) {
        return;
      }

      var datetime = new Date(_this.state.datetime);
      var hours = datetime.getHours() + value;
      datetime.setHours(hours);

      _this.setState({
        datetime: datetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "increaseMinutes", function (value) {
      if (_this.props.disabled) {
        return;
      }

      var datetime = new Date(_this.state.datetime);
      var minutes = datetime.getMinutes() + value;
      datetime.setMinutes(minutes);

      _this.setState({
        datetime: datetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "increaseSeconds", function (value) {
      if (_this.props.disabled) {
        return;
      }

      var datetime = new Date(_this.state.datetime);
      var seconds = datetime.getSeconds() + value;
      datetime.setSeconds(seconds);

      _this.setState({
        datetime: datetime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "sanitizeInput", function (e) {
      var charCode = e.which ? e.which : e.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "checkHourValue", function () {
      var hours = _this.state.hours;

      if (hours > 24) {
        hours = 0;
      }

      var tmp = new Date(_this.state.datetime);

      _this.setState({
        datetime: new Date(tmp.setHours(hours))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkMinuteValue", function () {
      var minutes = _this.state.minutes;

      if (minutes > 60) {
        minutes = 0;
      }

      var tmp = new Date(_this.state.datetime);

      _this.setState({
        datetime: new Date(tmp.setMinutes(minutes))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkSecondValue", function () {
      var seconds = _this.state.seconds;

      if (seconds > 60) {
        seconds = 0;
      }

      var tmp = new Date(_this.state.datetime);

      _this.setState({
        datetime: new Date(tmp.setSeconds(seconds))
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onOkClick", function () {
      if (_this.props.disabled) {
        return;
      }

      _this.props.onOk(_this.state.datetime);
    });

    var _datetime = new Date(props.value);

    _this.state = {
      datetime: _datetime,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    return _this;
  }

  _createClass(SpaceTimePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "space-time-picker"
      }, _react.default.createElement("div", {
        className: "hours"
      }, _react.default.createElement("input", {
        className: "space-input",
        value: this.state.hours,
        maxLength: 2,
        type: "text",
        onBlur: this.checkHourValue,
        onKeyPress: this.sanitizeInput,
        onChange: function onChange(e) {
          return _this2.setState({
            hours: e.target.value
          });
        }
      }), _react.default.createElement("div", {
        className: "arrows"
      }, _react.default.createElement("span", {
        className: "arrow up",
        onClick: function onClick() {
          return _this2.increaseHours(1);
        }
      }), _react.default.createElement("span", {
        className: "arrow down",
        onClick: function onClick() {
          return _this2.increaseHours(-1);
        }
      }))), _react.default.createElement("span", {
        className: "separator"
      }, ":"), _react.default.createElement("div", {
        className: "minutes"
      }, _react.default.createElement("input", {
        onKeyPress: this.sanitizeInput,
        disabled: this.props.disabled,
        onBlur: this.checkMinuteValue,
        className: "space-input",
        value: this.state.minutes,
        maxLength: 2,
        onChange: function onChange(e) {
          return _this2.setState({
            minutes: e.target.value
          });
        },
        type: "text"
      }), _react.default.createElement("div", {
        className: "arrows"
      }, _react.default.createElement("span", {
        className: "arrow up",
        onClick: function onClick() {
          return _this2.increaseMinutes(1);
        }
      }), _react.default.createElement("span", {
        className: "arrow down",
        onClick: function onClick() {
          return _this2.increaseMinutes(-1);
        }
      }))), _react.default.createElement("span", {
        className: "separator"
      }, ":"), _react.default.createElement("div", {
        className: "seconds"
      }, _react.default.createElement("input", {
        onKeyPress: this.sanitizeInput,
        disabled: this.props.disabled,
        onBlur: this.checkSecondValue,
        className: "space-input",
        value: this.state.seconds,
        onChange: function onChange(e) {
          return _this2.setState({
            seconds: e.target.value
          });
        },
        maxLength: 2,
        type: "text"
      }), _react.default.createElement("div", {
        className: "arrows"
      }, _react.default.createElement("span", {
        className: "arrow up",
        onClick: function onClick() {
          return _this2.increaseSeconds(1);
        }
      }), _react.default.createElement("span", {
        className: "arrow down",
        onClick: function onClick() {
          return _this2.increaseSeconds(-1);
        }
      }))), this.props.hour12 && _react.default.createElement("div", {
        className: "hour12"
      }, _react.default.createElement("span", {
        className: "am-btn ".concat(this.isAM() ? 'selected' : ''),
        onClick: function onClick() {
          return !_this2.isAM() ? _this2.increaseHours(12) : null;
        }
      }, "AM"), _react.default.createElement("span", {
        className: "pm-btn ".concat(!this.isAM() ? 'selected' : ''),
        onClick: function onClick() {
          return _this2.isAM() ? _this2.increaseHours(-12) : null;
        }
      }, "PM")), !this.props.disabled && _react.default.createElement("div", {
        className: "confirm",
        onClick: this.onOkClick
      }, _react.default.createElement("span", {
        className: "ok-btn"
      }, "OK")));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.value && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
        this.setState({
          datetime: new Date(this.props.value)
        });
        this.init();
      }

      if (this.state.datetime && (!prevState.datetime || this.state.datetime.getTime() !== prevState.datetime.getTime())) {
        this.init();
      }
    }
  }]);

  return SpaceTimePicker;
}(_react.default.Component);

SpaceTimePicker.propTypes = {
  value: _propTypes.default.instanceOf(Date).isRequired,
  hour12: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onOk: _propTypes.default.func
};
SpaceTimePicker.defaultProps = {
  value: null,
  hour12: false,
  disabled: false,
  onOk: function onOk() {}
};
var _default = SpaceTimePicker;
exports.default = _default;