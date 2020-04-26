import styled from 'styled-components/native';
import Modal from "react-native-modal";

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