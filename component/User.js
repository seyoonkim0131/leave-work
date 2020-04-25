import * as React from 'react';
import { View, FlatList, Picker } from 'react-native';
import { Container, MenuContainer, ModalContainer, StyledModal, ItemText, DownArrowImage, ModalHeaderText, ButtonContainer, ButtonText, StyledPicker, ModalBodyText } from './StyledComponents';
import LogoutButton from './LogoutButton';

import { useQuery } from '@apollo/react-hooks';

import { hours, mins } from '../util/vars';
import { GET_MY_PROFILE } from '../Queries/Query';

function User() {
    const [ modalVisible, setModalVisible ] = React.useState(false);
    const [ menuState, setMenuState ] = React.useState('');
    const [ selStartH, setSelStartH ] = React.useState('00');
    const [ selStartM, setSelStartM ] = React.useState('00');
    const [ selEndH, setSelEndH ] = React.useState('00');
    const [ selEndM, setSelEndM ] = React.useState('00');
    const { loading, error, data } = useQuery(GET_MY_PROFILE);
    
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
            {menuState == 'setStartTime' ?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'450px'}>
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
                                onPress={() => {(setModalVisible(!modalVisible), setMenuState(''))}}
                                btnBottom={'30px'}>
                                <ButtonText>적용</ButtonText>
                            </ButtonContainer>
                        </View>
                    </ModalContainer>
                </StyledModal>
            : menuState == 'setEndTime'?
                <StyledModal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    coverScreen={false}
                    isVisible={modalVisible}
                    onBackdropPress={() => {(setModalVisible(false), setMenuState(''))}}>
                    <ModalContainer modalHeight={'450px'}>
                        <View>
                            <ModalHeaderText>퇴근시간 설정</ModalHeaderText>
                            <View style={{flex: 2, justifyContent: 'flex-start', flexDirection: 'column'}}>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'10px'}
                                        selectedValue={selEndH}
                                        onValueChange={ (itemValue) => setSelEndH(itemValue) } >
                                        {hours.map((data, i) => {
                                            return (<Picker.Item label={data.label} value={data.value} key={i} />)
                                        })}
                                    </StyledPicker>
                                </View>
                                <View style={{flex: 2, position: 'absolute'}}>
                                    <StyledPicker
                                        left={'80px'}
                                        selectedValue={selEndM}
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