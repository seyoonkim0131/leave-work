import * as React from 'react';
import { View, FlatList, Picker, AsyncStorage, Text } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';

import { Container, MenuContainer } from './styles/Containers';
import { ModalContainer, StyledModal, ModalHeaderText, ModalBodyText } from './styles/Modals';
import { ButtonContainer, ButtonText } from './styles/Buttons';
import { DownArrowImage } from './styles/Images';
import { ItemText } from './styles/Text';
import { StyledPicker } from './styles/Other';

import { useQuery } from '@apollo/react-hooks';

import { hours, mins } from '../util/vars';
import { GET_MY_PROFILE } from '../Queries/Query';

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
    const [ selStartH, setSelStartH ] = React.useState('00');
    const [ selStartM, setSelStartM ] = React.useState('00');
    const [ selEndH, setSelEndH ] = React.useState('00');
    const [ selEndM, setSelEndM ] = React.useState('00');

    const { loading, error, data } = useQuery(GET_MY_PROFILE);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>error.message</Text>;
    if (!data) //{
        return <Text>Not Found</Text>;
    // } else {
    //     const user = data.GetMyProfile.user
    //     console.log(user)
    //     if(data.GetMyProfile.user.startH) {
    //         setSelStartH(data.GetMyProfile.user.startH);
    //     } else {
    //         setSelStartH('09');
    //     }
    //     if(data.GetMyProfile.user.startM) {
    //         setSelStartM(data.GetMyProfile.user.startM);
    //     } else {
    //         setSelStartM('00');
    //     }
    //     if(data.GetMyProfile.user.endH) {
    //         setSelEndH(data.GetMyProfile.user.endH);
    //     } else {
    //         setSelEndH('18');
    //     }
    //     if(data.GetMyProfile.user.endM) {
    //         setSelEndM(data.GetMyProfile.user.endM);
    //     } else {
    //         setSelEndM('00');
    //     }
    // }
    

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
                                        selectedValue={ (data.GetMyProfile.user.startH !== null ? data.GetMyProfile.user.startH : '09') }
                                        onValueChange={ (itemValue) => setSelStartH(itemValue) } >
                                        {hours.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'80px'}
                                        selectedValue={ (data.GetMyProfile.user.startM !== null ? data.GetMyProfile.user.startM : '00') }
                                        onValueChange={ (itemValue) => setSelStartM(itemValue) } >
                                        {mins.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                            </View>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''))}}
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
                                        selectedValue={ (data.GetMyProfile.user.endH !== null ? data.GetMyProfile.user.endH : '18') }
                                        onValueChange={ (itemValue) => setSelEndH(itemValue) } >
                                        {hours.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'80px'}
                                        selectedValue={ (data.GetMyProfile.user.endM !== null ? data.GetMyProfile.user.endM : '00') }
                                        onValueChange={ (itemValue) => setSelEndM(itemValue) } >
                                        {mins.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                            </View>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''))}}
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
                    <ModalContainer modalHeight={'450px'}>
                        <View>
                            <ModalHeaderText>연봉 설정</ModalHeaderText>
                            <ButtonContainer
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''))}}
                                btnBottom={'30px'}>
                                <ButtonText>적용</ButtonText>
                            </ButtonContainer>
                        </View>
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