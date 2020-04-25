import { AsyncStorage } from 'react-native'
import { useApolloClient } from 'react-apollo';

const AUTH_TOKEN = 'jwt';
let token;

export const client = useApolloClient();

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }
  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const signIn = (newToken) => {
  token = newToken;
  AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = () => {
  token = undefined;
  AsyncStorage.removeItem(AUTH_TOKEN);
};