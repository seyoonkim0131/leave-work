import * as React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

function User () {
    return(
        <View style={styles.container}>
            <FlatList
                data={[
                    {key: 'setStartTime', value: '출근시간 설정'},
                    {key: 'setEndTime', value: '퇴근시간 설정'},
                    {key: 'setSalary', value: '연봉 입력'},
                    {key: 'setUserInfo', value: '회원정보 수정'},
                    {key: 'logout', value: '로그아웃'},
                ]}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.menuContainer} onPress={() => {console.log(item.key)}}>
                        <Text style={styles.item}>{item.value}</Text>
                        {(item.key == 'logout' ? <Text> </Text> : <Image source={require('../images/arrow-down.png')} style={styles.down}/>)}
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, height: '100%'
    },
    item: {
        padding: 10, fontSize: 20, height: 44,
    },
    menuContainer: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between'
    },
    down: {
        height: 15, width: 20, margin: 15
    }
  })
  
export default User