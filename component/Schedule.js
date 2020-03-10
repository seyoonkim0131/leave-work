import * as React from 'react';
import { View, Text } from 'react-native';

import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['kr'] = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedDate: '',
          init: true,
          currentMonth: '',
        }
    }

    componentDidMount() {
        var goal = new Date();
        var year = goal.getFullYear();
        var month = goal.getMonth()+1;
        var date = goal.getDate();
        var settings = year+"-"+(month < 10 ? '0'+month : month)+"-"+(date < 10 ? '0'+date : date);
        this.setState({selectedDate: settings, currentMonth: month})
    }

    render() {
        return(
            <View>
                <CalendarList
                    onDayPress={(day) => {this.setState({selectedDate: day.dateString, init: false})}}
                    theme={{selectedDayBackgroundColor: '#9adae1', arrowColor: '#9adae1'}}
                    monthFormat={'yyyy년 MM월'}
                    markedDates={{[this.state.selectedDate]: {selected: true, color: '#9adae1'}}}
                    style={{height: 341, backgroundColor: '#f4f1ee'}}
                />
                <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f1ee', width: 282, height: 223, borderColor: '#bbbbbb', borderWidth: 1, borderRadius: 30, margin: 45}}>
                    <Text>{this.state.init ? this.state.currentMonth + '월 요약' : this.state.selectedDate + ' 요약'}</Text>
                </View>
            </View>
        )
    }
}

export default Schedule