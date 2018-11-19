import _classCallCheck from "/Users/kama/Desktop/app-dyer-library/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/Users/kama/Desktop/app-dyer-library/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/Users/kama/Desktop/app-dyer-library/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/Users/kama/Desktop/app-dyer-library/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/Users/kama/Desktop/app-dyer-library/node_modules/@babel/runtime/helpers/esm/inherits";
import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { colors } from "./data";
import styles from "./App.module.scss";

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      colorChosen: {}
    };

    _this.onInputChange = function (e) {
      var userInput = e.currentTarget.value;
      var filteredSuggestions = [];

      if (userInput.length > 1) {
        filteredSuggestions = colors().filter(function (suggestion) {
          return suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });
      }

      _this.setState({
        activeSuggestion: 0,
        filteredSuggestions: filteredSuggestions,
        showSuggestions: true,
        userInput: e.currentTarget.value
      });
    };

    _this.onKeyDown = function (e) {
      var _this$state = _this.state,
          activeSuggestion = _this$state.activeSuggestion,
          filteredSuggestions = _this$state.filteredSuggestions;

      if (e.keyCode === 13) {
        // enter key
        e.preventDefault();
        var colorChosen = filteredSuggestions.find(function (suggestion) {
          return suggestion.name === filteredSuggestions[activeSuggestion].name;
        });

        _this.setState({
          showSuggestions: false,
          colorChosen: colorChosen,
          userInput: colorChosen.name
        });
      } else if (e.keyCode === 38) {
        // up arrow
        if (activeSuggestion === 0) return;

        _this.setState({
          activeSuggestion: activeSuggestion - 1
        });
      } else if (e.keyCode === 40) {
        // down arrow
        if (activeSuggestion - 1 === filteredSuggestions.length) return;

        _this.setState({
          activeSuggestion: activeSuggestion + 1
        });
      }
    };

    _this.onSuggestionClick = function (e) {
      var colorChosen = _this.state.filteredSuggestions.find(function (suggestion) {
        return suggestion.name === e.target.innerText;
      });

      _this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText,
        colorChosen: colorChosen
      });
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      var hexColor = _this.state.colorChosen.hex;
      var bgColor = "#".concat(hexColor, "80");

      _this.setState({
        userInput: '',
        bgColor: bgColor
      });
    };

    _this.renderSuggestionList = function () {
      var _this$state2 = _this.state,
          showSuggestions = _this$state2.showSuggestions,
          filteredSuggestions = _this$state2.filteredSuggestions,
          activeSuggestion = _this$state2.activeSuggestion;

      if (showSuggestions && filteredSuggestions.length > 0) {
        return React.createElement("ul", {
          className: styles.suggestionList
        }, filteredSuggestions.map(function (suggestion, i) {
          return React.createElement("li", {
            key: uuidv4(),
            onClick: _this.onSuggestionClick,
            className: activeSuggestion === i ? "".concat(styles.suggestionActive) : null
          }, suggestion.name);
        }));
      }
    };

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: styles.app,
        style: {
          background: this.state.bgColor
        }
      }, React.createElement("h3", null, "Choose background color"), React.createElement("form", {
        className: styles.colorPickerForm,
        onSubmit: this.onSubmit
      }, React.createElement("input", {
        list: "colors",
        className: styles.colorInput,
        placeholder: "Start typing the color...",
        value: this.state.userInput,
        onChange: this.onInputChange,
        onKeyDown: this.onKeyDown
      }), this.renderSuggestionList(), React.createElement("button", {
        type: "submit",
        className: styles.submitColor,
        onClick: this.onSubmit
      }, "Accept")));
    }
  }]);

  return App;
}(Component);

export default App;