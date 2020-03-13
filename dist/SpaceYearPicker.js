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

var yearsGrid = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];

var SpaceYearPicker = /*#__PURE__*/function (_React$Component) {
  _inherits(SpaceYearPicker, _React$Component);

  function SpaceYearPicker(props) {
    var _this;

    _classCallCheck(this, SpaceYearPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpaceYearPicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "init", function () {
      var datetime = _this.state.datetime;
      var yearStr = datetime.getFullYear().toString();
      var lastDigit = yearStr.substr(3, 1);
      var diff = Number.parseInt(lastDigit, 10) - -1;
      var startingYear = new Date(datetime.getFullYear() - diff, datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());

      _this.setState({
        startingYear: startingYear
      });

      _this.initYears(startingYear);
    });

    _defineProperty(_assertThisInitialized(_this), "initYears", function (startingYear) {
      var years = [];
      var datetime = _this.state.datetime;

      for (var i = 0; i < yearsGrid.length; i += 1) {
        var tempYears = [];
        var currentYears = yearsGrid[i];

        for (var j = 0; j < currentYears.length; j += 1) {
          var tmpYear = new Date(startingYear.getFullYear() + currentYears[j], datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());
          tempYears.push(tmpYear);
        }

        years.push(tempYears);
      }

      _this.setState({
        years: years
      });
    });

    _defineProperty(_assertThisInitialized(_this), "formatedYearLabel", function (year) {
      return year.getFullYear();
    });

    _defineProperty(_assertThisInitialized(_this), "formatedCurrent10YearsLabel", function () {
      var start = _this.state.years[0][1];
      var end = _this.state.years[3][1];
      return "".concat(start.getFullYear(), " - ").concat(end.getFullYear());
    });

    _defineProperty(_assertThisInitialized(_this), "selectPrev10Year", function () {
      var _this$state = _this.state,
          startingYear = _this$state.startingYear,
          datetime = _this$state.datetime;
      var tmp = new Date(startingYear.getFullYear() - 10, datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());

      _this.setState({
        startingYear: tmp
      });

      _this.initYears(tmp);
    });

    _defineProperty(_assertThisInitialized(_this), "selectNext10Year", function () {
      var _this$state2 = _this.state,
          startingYear = _this$state2.startingYear,
          datetime = _this$state2.datetime;
      var tmp = new Date(startingYear.getFullYear() + 10, datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(), datetime.getSeconds());

      _this.setState({
        startingYear: tmp
      });

      _this.initYears(tmp);
    });

    _defineProperty(_assertThisInitialized(_this), "selectYear", function (year) {
      if (_this.props.disabled) {
        return;
      }

      _this.props.onChange(year);
    });

    var _datetime = props.value ? new Date(props.value) : new Date();

    _this.state = {
      years: [],
      startingYear: null,
      datetime: _datetime
    };
    setTimeout(function () {
      _this.init();
    });
    return _this;
  }

  _createClass(SpaceYearPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var yearsGrid = [];

      for (var i = 0; i < this.state.years.length; i += 1) {
        var yearsList = [];

        var _loop = function _loop(j) {
          var year = _this2.state.years[i][j];
          yearsList.push(_react.default.createElement("div", {
            className: "year ".concat(year.getFullYear() === _this2.state.datetime.getFullYear() ? 'current-year' : ''),
            key: "year-".concat(year)
          }, _react.default.createElement("span", {
            onClick: function onClick() {
              return _this2.selectYear(year);
            }
          }, _this2.formatedYearLabel(year))));
        };

        for (var j = 0; j < this.state.years[i].length; j += 1) {
          _loop(j);
        }

        yearsGrid.push(_react.default.createElement("div", {
          className: "years-list",
          key: "year-list-".concat(i)
        }, yearsList));
      }

      return _react.default.createElement("div", {
        className: "space-year-picker"
      }, _react.default.createElement("div", {
        className: "header"
      }, _react.default.createElement("span", {
        className: "prev-10year-btn",
        onClick: this.selectPrev10Year
      }), _react.default.createElement("div", {
        className: "current-10years-label"
      }, this.state.years && this.state.years.length > 0 && this.formatedCurrent10YearsLabel()), _react.default.createElement("span", {
        className: "next-10year-btn",
        onClick: this.selectNext10Year
      })), _react.default.createElement("div", {
        className: "years-grid"
      }, yearsGrid));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (this.props.value && (!prevProps.value || this.props.value.getTime() !== prevProps.value.getTime())) {
        this.setState({
          datetime: new Date(this.props.value)
        });
        setTimeout(function () {
          _this3.init();
        });
      }
    }
  }]);

  return SpaceYearPicker;
}(_react.default.Component);

SpaceYearPicker.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
SpaceYearPicker.defaultProps = {
  value: null,
  disabled: false,
  onChange: function onChange() {}
};
var _default = SpaceYearPicker;
exports.default = _default;