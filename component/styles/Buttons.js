import styled from 'styled-components/native';

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