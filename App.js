import 'react-native-gesture-handler';

import * as React from 'react';
import { AsyncStorage } from 'react-native'

import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import { NavigationContainer } from '@react-navigation/native';

import LogOutStack from './component/LogOutStack';
import LogInStack from './component/LogInStack';

const cache = new InMemoryCache();

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
`;

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('jwt');
  return {
      headers: {
          ...headers,
          'X-JWT': token,
      },
  };
});
const httpLink = new HttpLink({uri: 'https://leave-work-server.herokuapp.com/graphql'});
const httpAuthLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: httpAuthLink,
  cache,
  resolvers: {},
  request: (operation) => {
    const token = AsyncStorage.getItem('jwt');
    operation.setContext({
      headers: {
        'X-JWT': token ? token : ''
      }
    })
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(AsyncStorage.getItem('jwt'))
  },
});

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <LogInStack/> : <LogOutStack/>;
}

function App() {
  
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isReady, setIsReady ] = React.useState(false);

  React.useEffect(() => {
    const authState = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        const tokenState = (token !== null ? true : false);
        setIsLoggedIn(tokenState);
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      authState();
    }
  }, [isReady]);

  if(!isReady) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* { isLoggedIn ? <LogInStack/> : <LogOutStack/> } */}
        <IsLoggedIn />
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App;