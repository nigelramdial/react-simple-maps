"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _d3Geo = require("d3-geo");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Geography = function (_Component) {
  _inherits(Geography, _Component);

  function Geography() {
    _classCallCheck(this, Geography);

    var _this = _possibleConstructorReturn(this, (Geography.__proto__ || Object.getPrototypeOf(Geography)).call(this));

    _this.state = {
      hover: false,
      pressed: false
    };

    _this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseClick = _this.handleMouseClick.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  _createClass(Geography, [{
    key: "handleMouseClick",
    value: function handleMouseClick(evt) {
      evt.persist();
      var _props = this.props,
          onClick = _props.onClick,
          geography = _props.geography;

      return onClick && onClick(geography, evt);
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter(evt) {
      evt.persist();
      var _props2 = this.props,
          onMouseEnter = _props2.onMouseEnter,
          geography = _props2.geography;

      this.setState({
        hover: true
      }, function () {
        return onMouseEnter && onMouseEnter(geography, evt);
      });
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(evt) {
      evt.persist();
      if (this.state.pressed) return;
      var _props3 = this.props,
          onMouseMove = _props3.onMouseMove,
          geography = _props3.geography;

      if (!this.state.hover) {
        this.setState({
          hover: true
        }, function () {
          return onMouseMove && onMouseMove(geography, evt);
        });
      } else if (onMouseMove) onMouseMove(geography, evt);else return;
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave(evt) {
      evt.persist();
      var _props4 = this.props,
          onMouseLeave = _props4.onMouseLeave,
          geography = _props4.geography;

      this.setState({
        hover: false
      }, function () {
        return onMouseLeave && onMouseLeave(geography, evt);
      });
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(evt) {
      evt.persist();
      var _props5 = this.props,
          onMouseDown = _props5.onMouseDown,
          geography = _props5.geography;

      this.setState({
        pressed: true
      }, function () {
        return onMouseDown && onMouseDown(geography, evt);
      });
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(evt) {
      evt.persist();
      var _props6 = this.props,
          onMouseUp = _props6.onMouseUp,
          geography = _props6.geography;

      this.setState({
        pressed: false
      }, function () {
        return onMouseUp && onMouseUp(geography, evt);
      });
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(evt) {
      evt.persist();
      var _props7 = this.props,
          onFocus = _props7.onFocus,
          geography = _props7.geography;

      this.setState({
        hover: true
      }, function () {
        return onFocus && onFocus(geography, evt);
      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(evt) {
      evt.persist();
      var _props8 = this.props,
          onBlur = _props8.onBlur,
          geography = _props8.geography;

      this.setState({
        hover: false
      }, function () {
        return onBlur && onBlur(geography, evt);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props9 = this.props,
          geography = _props9.geography,
          projection = _props9.projection,
          round = _props9.round,
          precision = _props9.precision,
          tabable = _props9.tabable,
          style = _props9.style;
      var _state = this.state,
          hover = _state.hover,
          pressed = _state.pressed;


      var pathString = (0, _d3Geo.geoPath)().projection(projection())(geography);

      return _react2.default.createElement("path", {
        d: round ? (0, _utils.roundPath)(pathString, precision) : pathString,
        className: "rsm-geography" + (pressed && " rsm-geography--pressed") + (hover && " rsm-geography--hover"),
        style: style[pressed || hover ? pressed ? "pressed" : "hover" : "default"],
        onClick: this.handleMouseClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onFocus: tabable && this.handleFocus,
        onBlur: tabable && this.handleBlur,
        tabIndex: tabable ? 0 : -1
      });
    }
  }]);

  return Geography;
}(_react.Component);

Geography.defaultProps = {
  precision: 0.1,
  round: true,
  tabable: true,
  style: {
    default: {},
    hover: {},
    pressed: {}
  }
};

exports.default = Geography;