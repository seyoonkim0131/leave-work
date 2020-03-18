import * as React from 'react';
import { Image } from 'react-native';

function LogoTitle() {
    return (
      <Image
        style={{height: 60, width: 183.56, marginLeft: 35.28, marginTop: 26}}
        source={require('../images/logo.png')}/>
    );
}

export default LogoTitle;