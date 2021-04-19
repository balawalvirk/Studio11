import React, {Fragment} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/Button.component';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Redux/Actions/Auth';
import ScreenWrapper from '../../components/ScreenWrapper';
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  return (
    <ScreenWrapper>
      <View style={styles.mainViewContainer}>
        <Text> Login</Text>
        <Button
          title="Login"
          onPress={() => dispatch(login({userName: 'John Doe'}))}
        />
      </View>
    </ScreenWrapper>
  );
}
