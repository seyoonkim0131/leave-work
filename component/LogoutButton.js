import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';

import { ButtonContainer, ButtonText } from './StyledComponents';

export default function LogoutButton() {
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