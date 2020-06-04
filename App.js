/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calcText: '',
    };
    this.operators = ['DEL', '+', '-', '*', '/'];
  }
  calculateResult() {
    const text = this.state.calcText;
    this.setState({
      // eslint-disable-next-line no-eval
      resultText: eval(text),
    });
  }
  validate() {
    const text = this.state.calcText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '/':
      case '*':
        return false;
    }
    return true;
  }
  buttonPressed(text) {
    if (text === '=') {
      return this.validate() && this.calculateResult();
    } else {
      this.setState({
        calcText: this.state.calcText + text,
      });
    }
  }
  operate(input) {
    switch (input) {
      case 'DEL':
        let text = this.state.calcText.split('');
        text.pop();
        this.setState({
          calcText: text.join(''),
        });
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.calcText.split('').pop();
        if (this.operators.indexOf(lastChar) > 0) {
          return;
        }
        if (this.state.text === '') {
          return;
        } else {
          this.setState({
            calcText: this.state.calcText + input,
          });
        }
    }
  }
  render() {
    let rows = [];
    let nums = [[9, 8, 7], [6, 5, 4], [3, 2, 1], ['.', 0, '=']];
    for (let i = 0; i < 4; ++i) {
      let row = [];
      for (let j = 0; j < 3; ++j) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            style={styles.btn}
            onPress={() => this.buttonPressed(nums[i][j])}>
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>,
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>,
      );
    }

    let ops = [];
    for (let i = 0; i < 5; ++i) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          key={this.operators[i]}
          onPress={() => this.operate(this.operators[i])}>
          <Text style={styles.btntext}>{this.operators[i]}</Text>
        </TouchableOpacity>,
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.calculation}>
          <Text style={styles.calcText}>{this.state.calcText}</Text>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operators}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btntext: {
    fontSize: 30,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  calculation: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  result: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#61c4a8',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    flex: 7,
    backgroundColor: 'blue',
  },
  numbers: {
    flex: 20,
    backgroundColor: '#434343',
  },
  operators: {
    flex: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#636363',
  },
  calcText: {
    fontSize: 55,
    color: 'black',
  },
  resultText: {
    fontSize: 35,
    color: 'white',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
