import * as React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Picker } from 'react-native';

import Modal from "react-native-modal";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          menuState: "",
          modalVisible: false,
          hours: [
              {label: '00', value: '00'},
              {label: '01', value: '01'},
              {label: '02', value: '02'},
              {label: '03', value: '03'},
              {label: '04', value: '04'},
              {label: '05', value: '05'},
              {label: '06', value: '06'},
              {label: '07', value: '07'},
              {label: '08', value: '08'},
              {label: '09', value: '09'},
              {label: '10', value: '10'},
              {label: '11', value: '11'},
              {label: '12', value: '12'},
              {label: '13', value: '13'},
              {label: '14', value: '14'},
              {label: '15', value: '15'},
              {label: '16', value: '16'},
              {label: '17', value: '17'},
              {label: '18', value: '18'},
              {label: '19', value: '19'},
              {label: '20', value: '20'},
              {label: '21', value: '21'},
              {label: '22', value: '22'},
              {label: '23', value: '23'},
            ],
        mins: [
            {label: '00', value: '00'},
            {label: '10', value: '10'},
            {label: '20', value: '20'},
            {label: '30', value: '30'},
            {label: '40', value: '40'},
            {label: '50', value: '50'},
            ],
        selStartH: '', selStartM: '',
        selEndH: '', selEndM: '',
        selSal: '',
        }
    }
    setModalVisible(visible, menuState) {
        this.setState({modalVisible: visible, menuState: menuState});
    }
    render () {
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
                        <TouchableOpacity style={styles.menuContainer} onPress={() => {this.setModalVisible(true, item.key)}}>
                            <Text style={styles.item}>{item.value}</Text>
                            {(item.key == 'logout' ? <Text> </Text> : <Image source={require('../images/arrow-down.png')} style={styles.down}/>)}
                        </TouchableOpacity>
                    }
                />
                {this.state.menuState == 'setStartTime' ?
                    <Modal
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        coverScreen={false}
                        style={{margin: 0, flex: 1, justifyContent: "center", alignItems: "center"}}
                        isVisible={this.state.modalVisible}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text style={styles.modalHeaderText}>출근시간 설정</Text>
                                <View style={{flex: 2, justifyContent: 'flex-start', flexDirection: 'column'}}>
                                    <View style={{flex: 2, position: 'absolute'}}>
                                        <Picker
                                            style={{width: 60, height: 50, marginLeft: 10}}
                                            selectedValue={this.state.selStartH}
                                            onValueChange={(itemValue) =>
                                                this.setState({selStartH: itemValue})
                                            }
                                        >
                                            {this.state.hours.map((data, i) => {
                                                return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                            })}
                                        </Picker>
                                    </View>
                                    <View style={{flex: 2, position: 'absolute'}}>
                                        <Picker
                                            style={{width: 60, height: 50, marginLeft: 80}}
                                            selectedValue={this.state.selStartM}
                                            onValueChange={(itemValue) =>
                                                this.setState({selStartM: itemValue})
                                            }
                                        >
                                            {this.state.mins.map((data, i) => {
                                                return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {this.setModalVisible(!this.state.modalVisible, '')}}
                                    style={{backgroundColor: '#fdda6c', width: 150, height: 40, marginBottom: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Text style={{color: '#ffffff', fontSize: 17}}>적용</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                : this.state.menuState == 'setEndTime'?
                <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                coverScreen={false}
                style={{margin: 0, flex: 1, justifyContent: "center", alignItems: "center"}}
                isVisible={this.state.modalVisible}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.modalHeaderText}>퇴근시간 설정</Text>
                        <View style={{flex: 2, justifyContent: 'flex-start', flexDirection: 'column'}}>
                            <View style={{flex: 2, position: 'absolute'}}>
                                <Picker
                                    style={{width: 60, height: 50, marginLeft: 10}}
                                    selectedValue={this.state.selEndH}
                                    onValueChange={(itemValue) =>
                                        this.setState({selEndH: itemValue})
                                    }
                                >
                                    {this.state.hours.map((data, i) => {
                                        return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                    })}
                                </Picker>
                            </View>
                            <View style={{flex: 2, position: 'absolute'}}>
                                <Picker
                                    style={{width: 60, height: 50, marginLeft: 80}}
                                    selectedValue={this.state.selEndM}
                                    onValueChange={(itemValue) =>
                                        this.setState({selEndM: itemValue})
                                    }
                                >
                                    {this.state.mins.map((data, i) => {
                                        return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                    })}
                                </Picker>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {this.setModalVisible(!this.state.modalVisible, '')}}
                            style={{backgroundColor: '#fdda6c', width: 150, height: 40, marginBottom: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                        >
                            <Text style={{color: '#ffffff', fontSize: 17}}>적용</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
                : this.state.menuState == 'setSalary' ?
                    <Modal
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        coverScreen={false}
                        style={{margin: 0, flex: 1, justifyContent: "center", alignItems: "center"}}
                        isVisible={this.state.modalVisible}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text style={styles.modalHeaderText}>연봉 설정</Text>
                                <TouchableOpacity
                                    onPress={() => {this.setModalVisible(!this.state.modalVisible, '')}}
                                    style={{backgroundColor: '#fdda6c', width: 150, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Text style={{color: '#ffffff', fontSize: 17}}>적용</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                : this.state.menuState == 'setUserInfo' ?
                    <Modal
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        coverScreen={false}
                        style={{margin: 0, flex: 1, justifyContent: "center", alignItems: "center"}}
                        isVisible={this.state.modalVisible}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text style={styles.modalHeaderText}>정보수정</Text>
                                <TouchableOpacity
                                    onPress={() => {this.setModalVisible(!this.state.modalVisible, '')}}
                                    style={{backgroundColor: '#fdda6c', width: 150, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Text style={{color: '#ffffff', fontSize: 17}}>적용</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                : <View></View>}
                
            </View>
        )
    }
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
    },
    modalContainer: {
        width: 320, height: 450,
        alignItems: 'center',
        backgroundColor: '#f4f1ee',
        borderRadius: 5
    },
    modalHeaderText: {
        fontSize: 30, fontWeight: '600', marginTop: 20
    }
  })
  
export default User