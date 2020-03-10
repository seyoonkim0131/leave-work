import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remain: ""
    }
  }

  componentDidMount() {
    var goal = new Date();
    var year = goal.getFullYear();
    var month = goal.getMonth()+1;
    var date = goal.getDate();
    var day = goal.getDay();
    var countDownTime = new Date(year+"-"+(month < 10 ? '0'+month : month)+"-"+(date < 10 ? '0'+date : date)+"T18:00:00").getTime();
    var statement = "";
    if(day == 6 || day == 0) { // if weekend
      statement = "휴일입니다.";
    } else {
      var x = setInterval(() => {
        var now = new Date().getTime();
        var tz = new Date().getTimezoneOffset() / 60;
        var distance = countDownTime - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + tz;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(hours < 0) {
          clearInterval(x);
          statement = "퇴근!";
        } else {
          statement = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }
        this.setState(previousState => ({remain: statement}));
      }, 1000);
    }
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f1ee' }}>
        <View style={{width: 282, height: 223, alignItems: 'center', justifyContent: 'center', borderColor: '#bbbbbb', borderWidth: 1, borderRadius: 30}}>
          <Text style={{color: '#2f2f2f'}}>{this.state.remain}</Text>
        </View>
        <View style={{marginTop: 48}}></View>
        <View style={{width: 282, height: 223, alignItems: 'center', justifyContent: 'center', borderColor: '#bbbbbb', borderWidth: 1, borderRadius: 30}}>
          <Text style={{color: '#2f2f2f'}}>삼만원!</Text>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default HomeScreen;