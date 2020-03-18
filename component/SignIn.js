import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import LogoTitle from './LogoTitle';
import { signIn } from '../util';

const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        SignIn(email: $email, password: $password) {
            ok
            error
            token
        }
    }
`;

function Login(){
    const [ email, onChangeEmail ] = React.useState('');
    const [ password, onChangePassword ] = React.useState('');

    const [SignIn, { data }] = useMutation(SIGN_IN);

    const submit = async () => {
        SignIn({ variables: {email, password} }).then(response => {signIn(data.SignIn.token)}).catch(err=>{console.log(err.message)})
    };

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
                    onPress={submit}
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