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

var months = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];

var SpaceMonthPicker = /*#__PURE__*/function (_React$Component) {
  _inherits(SpaceMonthPicker, _React$Component);

  function SpaceMonthPicker(props) {
    var _this;

    _classCallCheck(this, SpaceMonthPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceMonthPicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "formatedMonthLabel", function (month) {
      var datetime = new Date(_this.state.datetime.getFullYear(), month, 1);
      return datetime.toLocaleDateString(_this.props.locale, {
        month: _this.props.month
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectMonth", function (selectedMonth) {
      if (_this.disabled) {
        return;
      }

      var tmp = _this.state.datetime.setMonth(selectedMonth); // this.setState({ datetime: new Date(tmp) })


      _this.props.onChange(new Date(tmp));
    });

    _defineProperty(_assertThisInitialized(_this), "selectPrevYear", function () {
      var year = _this.state.datetime.getFullYear() - 1;
      var tmp = new Date(_this.state.datetime).setYear(year);

      _this.setState({
        datetime: new Date(tmp)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectNextYear", function () {
      var year = _this.state.datetime.getFullYear() + 1;
      var tmp = new Date(_this.state.datetime).setYear(year);

      _this.setState({
        datetime: new Date(tmp)
      });
    });

    var _datetime = props.value ? new Date(props.value) : new Date();

    _this.state = {
      months: months,
      datetime: _datetime
    };
    return _this;
  }

  _createClass(SpaceMonthPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var monthsGrid = [];

      for (var i = 0; i < this.state.months.length; i += 1) {
        var monthsList = [];

        var _loop = function _loop(j) {
          var month = _this2.state.months[i][j];
          monthsList.push(_react.default.createElement("div", {
            className: "month ".concat(month === _this2.state.datetime.getMonth() ? 'current-month' : ''),
            key: "month-".concat(month)
          }, _react.default.createElement("span", {
            onClick: function onClick() {
              return _this2.selectMonth(month);
            }
          }, _this2.formatedMonthLabel(month))));
        };

        for (var j = 0; j < this.state.months[i].length; j += 1) {
          _loop(j);
        }

        monthsGrid.push(_react.default.createElement("div", {
          className: "months-list",
          key: "month-list-".concat(i)
        }, monthsList));
      }

      return _react.default.createElement("div", {
        className: "space-date-month-picker"
      }, _react.default.createElement("div", {
        className: "header"
      }, _react.default.createElement("span", {
        className: "prev-year-btn",
        onClick: this.selectPrevYear
      }), _react.default.createElement("div", {
        className: "current-year-label"
      }, this.state.datetime.getFullYear()), _react.default.createElement("span", {
        className: "next-year-btn",
        onClick: this.selectNextYear
      })), _react.default.createElement("div", {
        className: "months-grid"
      }, monthsGrid));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.value && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
        this.setState({
          datetime: new Date(this.props.value)
        });
      }
    } // get locale month label

  }]);

  return SpaceMonthPicker;
}(_react.default.Component);

SpaceMonthPicker.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  locale: _propTypes.default.string,
  month: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
SpaceMonthPicker.defaultProps = {
  value: null,
  locale: undefined,
  month: 'short',
  // numeric | 2-digit | long | short | narrow
  disabled: false,
  onChange: function onChange() {}
};
var _default = SpaceMonthPicker;
exports.default = _default;