import React from 'react';
import { View, TextInput, TouchableOpacity, Text, AsyncStorage } from 'react-native';

import { useMutation, useApolloClient } from '@apollo/react-hooks';

import LogoTitle from './LogoTitle';
// import { signIn } from '../util/util';
import { SIGN_IN } from './../Queries/Mutation';

function Login(){
    const client = useApolloClient();
    const [ email, onChangeEmail ] = React.useState('');
    const [ password, onChangePassword ] = React.useState('');

    let token;

    const [SignIn] = useMutation(SIGN_IN, {
        variables: {email, password},
        onCompleted: (data) => {
            if(data.SignIn.ok) {
                token = data.SignIn.token;
                AsyncStorage.setItem('jwt', token);
                client.writeData({ data: { isLoggedIn: true } });
                // signIn(token)
            } else {
                console.log('로그인 실패');
            }
        },
        onError(error) {
            console.log(error.message);
        }
    });

    return(
        <View style={{height: '100%'}}>
            <View style={{marginTop: 154, alignItems: 'center', justifyContent: 'center'}}>
                <LogoTitle/>
            </View>
            <View style={{marginTop: 100, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput 
                    placeholder={'Email'}
                    onChangeText={text => onChangeEmail(text)}
                    value={email}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    style={{borderBottomColor: '#a7a8a7', borderBottomWidth: 1, width: 270, paddingHorizontal: 10}}
                />
                <TextInput 
                    placeholder={'Password'}
                    onChangeText={text => onChangePassword(text)}
                    value={password}
                    secureTextEntry={true}
                    style={{borderBottomColor: '#a7a8a7', borderBottomWidth: 1, width: 270, marginTop: 50, paddingHorizontal: 10}}
                />
            </View>
            <View style={{marginTop: 100, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity 
                    onPress={SignIn}
                    style={{backgroundColor: '#fdda6c', width: 270, height: 50, marginBottom: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{color: '#ffffff', fontSize: 20, fontWeight: "700"}}>로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{marginLeft: 53}}>
                    <TouchableOpacity>
                        <Text style={{fontSize: 16}}>회원가입</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginRight: 53}}>
                    <TouchableOpacity >
                        <Text style={{fontSize: 16}}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login;