import * as React from 'react';
import { View, Text } from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: null,
      hour: 0,
      min: 0,
      sec: 0,
      remain: ""
    }
  }

  componentDidMount() {
    let goal = new Date();
    let year = goal.getFullYear();
    let month = goal.getMonth()+1;
    let date = goal.getDate();
    let day = goal.getDay();
    var countDownTime = new Date(year+"-"+(month < 10 ? '0'+month : month)+"-"+(date < 10 ? '0'+date : date)+"T18:00:00").getTime();
    var statement = "";
    if(day == 6 || day == 0) { // if weekend
      statement = "휴일입니다.";
    } else {
      setInterval(() => {
        var now = new Date().getTime();
        var distance = countDownTime - now;
        if(distance == 0) {
          clearInterval();
          statement = "퇴근!";
        } else {
          var hours = Math.floor(distance / (1000*60*60*24));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance%(1000*60))/1000);
          statement = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        }
        this.setState(previousState => ({remain: statement}))
      }, 1000);
    }
  }
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{backgroundColor: '#fff8dc', width: 282, height: 223}}>
          <Text>{this.state.remain}</Text>
        </View>
        <View style={{marginTop: 48}}></View>
        <View style={{backgroundColor: '#fff8dc', width: 282, height: 223}}>
          <Text>삼만원!</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;