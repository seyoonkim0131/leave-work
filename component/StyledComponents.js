import styled from 'styled-components/native';
import Modal from "react-native-modal";

/** User.js */
export const Container = styled.View`
    flex: 1;
    height: 100%;
`;

export const MenuContainer = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`;

export const ModalContainer = styled.View`
    width: 320px;
    height: ${props => props.modalHeight};
    align-items: center;
    background-color: #f4f1ee;
    border-radius: 5px;
`;

export const StyledModal = styled(Modal)`
    margin: 0;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ModalHeaderText = styled.Text`
    font-size: 30px;
    font-weight: 600;
    margin-top: 30px;
    text-align: center;
`;

export const ModalBodyText = styled.Text`
    margin-top: 70px;
    text-align: center;
    font-size: 19px;
`;

export const ItemText = styled.Text`
    padding: 10px;
    font-size: 20px;
    height: 44px;
`;

export const StyledPicker = styled.Picker`
    width: 60px;
    height: 50px;
    margin-left: ${props => props.left};
`;

export const DownArrowImage = styled.Image`
    height: 15px;
    width: 20px;
    margin: 15px;
`;

/** LogoutBuuton.js */
export const ButtonContainer = styled.TouchableOpacity`
    background-color: #fdda6c;
    width: 150px;
    height: 40px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: ${props=> props.btnBottom || 0};
`;

export const ButtonText = styled.Text`
    color: #640000;
    font-size: 18px;
`;