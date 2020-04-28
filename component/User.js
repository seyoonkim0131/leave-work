import * as React from 'react';
import { View, FlatList, Picker, AsyncStorage, Text, TextInput } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';

import { Container, MenuContainer } from './styles/Containers';
import { ModalContainer, StyledModal, ModalHeaderText, ModalBodyText } from './styles/Modals';
import { ButtonContainer, ButtonText } from './styles/Buttons';
import { DownArrowImage, Preloader } from './styles/Images';
import { ItemText } from './styles/Text';
import { StyledPicker } from './styles/Other';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { hours, mins } from '../util/vars';
import { GET_MY_PROFILE } from '../Queries/Query';
import { UPDATE_MY_PROFILE } from '../Queries/Mutation';

function LogoutButton() {
    const client = useApolloClient();
    return (
        <ButtonContainer
            onPress={() => {
                client.writeData({ data: { isLoggedIn: false } });
                AsyncStorage.removeItem('jwt');
            }}
            buttonMargin={'50px'} >
            <ButtonText>확인</ButtonText>
        </ButtonContainer>
    )
};

function User() {
    const [ modalVisible, setModalVisible ] = React.useState(false);
    const [ menuState, setMenuState ] = React.useState('');
    const [ selStartH, setSelStartH ] = React.useState('09');
    const [ selStartM, setSelStartM ] = React.useState('00');
    const [ selEndH, setSelEndH ] = React.useState('18');
    const [ selEndM, setSelEndM ] = React.useState('00');
    const [ salary, setSalary ] = React.useState('2000');

    const [ Submit ] = useMutation(UPDATE_MY_PROFILE, {
        variables: { selStartH, selStartM, selEndH, selEndM },
        onCompleted: (data) => {
            if(data.UpdateMyProfile.ok) {
                console.log('Success');
            } else {
                console.log('Error')
            }
        }
    })

    const { loading, error, data } = useQuery(GET_MY_PROFILE);
    if (loading) return <Preloader source={require('./../images/spinner.gif')}/>;
    if (error) return <Text>{error.message}</Text>;
    if (!data) {
        return <Text>Not Found</Text>;
    } else {
        console.log(data.GetMyProfile.user)
    }

    return(
        <Container>
            <FlatList
                data={[
                    {key: 'setStartTime', value: '출근시간 설정'},
                    {key: 'setEndTime', value: '퇴근시간 설정'},
                    {key: 'setSalary', value: '연봉 입력'},
                    {key: 'setUserInfo', value: '회원정보 수정'},
                    {key: 'logout', value: '로그아웃'},
                ]}
                renderItem={({item}) => 
                    <MenuContainer onPress={() => {(setModalVisible(true), setMenuState(item.key))}}>
                        <ItemText>{item.value}</ItemText>
                        {(item.key == 'logout' ? <></> : <DownArrowImage source={require('../images/arrow-down.png')}/>)}
                    </MenuContainer>
                }
            />
            { menuState == 'setStartTime' ?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'380px'}>
                        <View>
                            <ModalHeaderText>출근시간 설정</ModalHeaderText>
                            <View style={{flex: 2, justifyContent: 'flex-start', flexDirection: 'column'}}>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'10px'}
                                        selectedValue={selStartH}
                                        onValueChange={ (itemValue) => setSelStartH(itemValue) } >
                                        {hours.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'80px'}
                                        selectedValue={selStartM}
                                        onValueChange={ (itemValue) => setSelStartM(itemValue) } >
                                        {mins.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                            </View>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''), Submit())}}
                                btnBottom={'30px'}>
                                <ButtonText>적용</ButtonText>
                            </ButtonContainer>
                        </View>
                    </ModalContainer>
                </StyledModal>
            : menuState == 'setEndTime' ?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'380px'}>
                        <View>
                            <ModalHeaderText>퇴근시간 설정</ModalHeaderText>
                            <View style={{flex: 2, justifyContent: 'flex-start', flexDirection: 'column'}}>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'10px'}
                                        selectedValue={ selEndH }
                                        onValueChange={ (itemValue) => setSelEndH(itemValue) } >
                                        {hours.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'80px'}
                                        selectedValue={ selEndM }
                                        onValueChange={ (itemValue) => setSelEndM(itemValue) } >
                                        {mins.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                            </View>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''), Submit())}}
                                btnBottom={'30px'}>
                                <ButtonText>적용</ButtonText>
                            </ButtonContainer>
                        </View>
                    </ModalContainer>
                </StyledModal>
            : menuState == 'setSalary' ?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'320px'}>
                        {/* <View> */}
                            <ModalHeaderText>연봉 설정</ModalHeaderText>
                            <View style={{marginVertical: 15, borderColor: '#000000', borderBottomWidth: 1, borderRadius: 5, marginTop: 40, width: 150, paddingHorizontal: 5, flex: 1, flexDirection: 'row' }}>
                                <TextInput style={{height: 40, width: 90, fontSize: 20, paddingHorizontal: 10}} keyboardType={'number-pad'} onChangeText={text => setSalary(text)} value={salary} returnKeyType={"done"} textAlign={'right'}></TextInput>
                                <Text style={{paddingTop: 15}}>만원</Text>
                            </View>
                            <View style={{marginTop: 30}}>
                                <Text style={{color: 'red', fontSize: 12}}>기본값은 최저시급입니다.</Text>
                            </View>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''))}}
                                btnBottom={'30px'}>
                                <ButtonText>적용</ButtonText>
                            </ButtonContainer>
                        {/* </View> */}
                    </ModalContainer>
                </StyledModal>
            : menuState == 'setUserInfo' ?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'450px'}>
                        <View>
                            <ModalHeaderText>정보수정</ModalHeaderText>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''))}}
                                btnBottom={'30px'}>
                                <ButtonText>적용</ButtonText>
                            </ButtonContainer>
                        </View>
                    </ModalContainer>
                </StyledModal>
            : menuState == 'logout' ?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'220px'}>
                        <ModalBodyText>로그아웃 하시겠습니까?</ModalBodyText>
                        <LogoutButton/>
                    </ModalContainer>
                </StyledModal>
            : <></>}
        </Container>
    )
}

export default User;