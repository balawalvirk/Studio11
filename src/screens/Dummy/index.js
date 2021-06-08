import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { adduser, deluser } from '../../Redux/Actions/Member'
import InputField from '../../components/InputField';
import { width } from 'react-native-dimension';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Dummy(props) {
    const [name, setname] = useState('');
    const [age, setage] = useState('');
    const [email, setemail] = useState('');
    const [userView, setuserView] = useState(false);
    const count = useSelector((state) => state.Practice.count);
    const Allusers = useSelector((state) => state.Member.user);
    // const age=  useSelector((state) => state.Member.age);
    // const email=  useSelector((state) => state.Member.email);
    const dispatch = useDispatch();

    return (
        <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
            <View style={styles.mainViewContainer}>
                {!userView ? <>
                    <InputField value={name} label='Name'
                        onChangeText={(name) => setname(name)} />
                    <InputField value={age} label='Age'
                        onChangeText={(age) => setage(age)} />
                    <InputField value={email} label='Email'
                        onChangeText={(email) => setemail(email)} />
                    <Button title={'Add'}
                        onPress={
                            () => dispatch(adduser({
                                Name: name,
                                Age: age,
                                Email: email
                            }))
                        } />
                    <Button title={'User Details'}
                        onPress={
                            () => setuserView('true')
                        } />
                </> :
                    <>
                        <Text style={styles.heading}>Available Users are </Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={Allusers}
                            keyExtractor={item => item.Email}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.userList}>
                                        <View style={styles.oneEntry}>
                                            <View style={styles.leftSection}>
                                                <Text style={styles.text}>
                                                    Name: {item.Name}
                                                </Text>
                                                <Text style={styles.text}>
                                                    Email: {item.Email}
                                                </Text>
                                                <Text style={styles.text}>
                                                    Age: {item.Age}
                                                </Text>
                                            </View>
                                            <View style={styles.BtnSection}>
                                                <Icon name='eye' style={{ color: 'green', fontSize: width(6) }} />
                                                <Icon name='minus-circle' style={{ color: 'red', fontSize: width(6) }}
                                                    onPress={() => dispatch(deluser(item.Email))}
                                                />
                                                <MaterialCommunityIcons name='update' style={{ color: 'orange', fontSize: width(6) }} />
                                            </View>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                        <Button title={'Hide Details'}
                            onPress={
                                () => setuserView(false)
                            } />
                    </>}

            </View>
        </ScreenWrapper>
    );
};
