import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { colors } from "./data";

import styles from "./App.module.scss";

class App extends Component {
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
    colorChosen: {}
  };

  onInputChange = e => {
    const userInput = e.currentTarget.value;
    let filteredSuggestions = [];

    if (userInput.length > 1) {
      filteredSuggestions = colors().filter(
        suggestion =>
          suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13) {
      // enter key
      e.preventDefault();
      const colorChosen = filteredSuggestions.find(
        suggestion =>
          suggestion.name === filteredSuggestions[activeSuggestion].name
      );
      this.setState({
        showSuggestions: false,
        colorChosen,
        userInput: colorChosen.name
      });
    } else if (e.keyCode === 38) {
      // up arrow
      if (activeSuggestion === 0) return;
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      // down arrow
      if (activeSuggestion - 1 === filteredSuggestions.length) return;
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  onSuggestionClick = e => {
    const colorChosen = this.state.filteredSuggestions.find(
      suggestion => suggestion.name === e.target.innerText
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      colorChosen
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const hexColor = this.state.colorChosen.hex;
    const bgColor = `#${hexColor}80`;
    this.setState({ userInput: '', bgColor });
  };

  renderSuggestionList = () => {
    const {
      showSuggestions,
      filteredSuggestions,
      activeSuggestion
    } = this.state;
    if (showSuggestions && filteredSuggestions.length > 0) {
      return (
        <ul className={styles.suggestionList}>
          {filteredSuggestions.map((suggestion, i) => (
            <li
              key={uuidv4()}
              onClick={this.onSuggestionClick}
              className={
                activeSuggestion === i ? `${styles.suggestionActive}` : null
              }
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      );
    }
  };

  render() {
    return (
      <div className={styles.app} style={{ background: this.state.bgColor }}>
        <h3>Choose background color</h3>
        <form className={styles.colorPickerForm} onSubmit={this.onSubmit}>
          <input
            list="colors"
            className={styles.colorInput}
            placeholder="Start typing the color..."
            value={this.state.userInput}
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
          />
          {this.renderSuggestionList()}
          <button
            type="submit"
            className={styles.submitColor}
            onClick={this.onSubmit}
          >
            Accept
          </button>
        </form>
      </div>
    );
  }
}

export default App;
