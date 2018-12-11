import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

export default class App extends Component {
  intervalId = 0;
  timeoutId = 0;
  state = { timer: 0, timerStarted: false, timerFunction: "0" };

  startTimeout = () => {
    // Start a timer that runs once after X milliseconds
    timeoutId = BackgroundTimer.setTimeout(() => {
      this.updateTimer();
      // this will be executed once after 5 seconds
      // even when app is the the background
        console.log('tac');
    }, 5000);
  }

  stopTimeout = () => {
    BackgroundTimer.clearTimeout(timeoutId);
    this.setState({ timer: 0 });
  }
  
  startInterval = () => {
    intervalId = BackgroundTimer.setInterval(() => {
      this.updateTimer();
      // this will be executed each second
      // even when app is the the background
      console.log('tic');
    }, 1000);
  }
  
  stopInterval = () => {
    BackgroundTimer.clearInterval(intervalId);
    this.setState({ timer: 0 });
  }
  
  updateTimer = () => {
    const timer = this.state.timer;
    this.setState({ timer: timer + 1 });
  }

  onStart = () => {
    const { timerStarted, timerFunction } = this.state;
    if(!timerStarted){
      this.setState({ timerStarted: true });
      if(timerFunction === "1"){
        this.startTimeout();
      } else if(timerFunction === "2"){
        this.startInterval();
      }
    }
  }

  onCancel = () => {
    const { timerStarted, timerFunction } = this.state;
    if(timerStarted){
      this.setState({ timerStarted: false });
      if(timerFunction === "1"){
        this.stopTimeout();
      } else if(timerFunction === "2"){
        this.stopInterval();
      }
    }
  }

  render() {
    let description = "select a timer."
    if(this.state.timerFunction === "1"){
      description = "In Timeout timer value will be updated after 5 seconds.";
    } else if (this.state.timerFunction === "2"){
      description = "In Interval timer value will be updated each seconds.";
    }
    return (
      <View style={styles.container}>
        <View style={styles.timerView}>
          <Text style={styles.timerText}>
            {this.state.timer}
          </Text>
        </View>
        <View style={styles.timerFunctionView}>
          <Picker
            style={styles.timerFunctionPicker}
            enabled={this.state.timerStarted ? false : true}
            selectedValue={this.state.timerFunction}
            onValueChange={(itemValue, itemIndex) => this.setState({timerFunction: itemValue})}>
            <Picker.Item label="Select Timer Function" value = "0" />
            <Picker.Item label="Timeout" value = "1" />
            <Picker.Item label="Interval" value = "2" />
          </Picker>
        </View>
        <View style={styles.startTimerButtonView}>
          <Button
            disabled = {(this.state.timerFunction === "1" || this.state.timerFunction === "2") ? false : true }
            onPress = {this.state.timerStarted ? this.onCancel : this.onStart}
            title={this.state.timerStarted ? "Cancel" : "Start" }
            color='#841584'
          />
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>
              {description}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  timerView: {
    margin: 20,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  timerText: {
    fontSize: 50,
    color: '#ccc'
  },
  timerFunctionView: {
    backgroundColor: 'lightgreen'
  }, 
  timerFunctionPicker: {
    height: 50, 
    width: 250
  },
  startTimerButtonView: {
    height: 50, 
    width: 250,
  },
  descriptionView: {    
    width: 250
  },
  descriptionText: {
    color: 'black'
  }
});
