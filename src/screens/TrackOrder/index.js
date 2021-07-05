import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import product from '../../assets/images/shop/1.png';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import OrderStatusComponent from '../../components/OrderStatusComponent';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import { height } from 'react-native-dimension';
import { getBarberOngoingOrders, getBarberPastOrders, getCustomerOngoingOrders, getCustomerPastOrders } from '../../firebaseConfig';
import { OrderStatus, UserTypes } from '../../utills/Enums';
import { useSelector } from 'react-redux';
export default function TrackOrder(props) {
    const user = useSelector(state => state.Auth.user)
    const [tabState, setTabState] = useState(0) //  0 => current 1 => past 
    const [pastOrders, setPastOrders] = useState([])
    const [onGoingOrders, setOnGoingOrders] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const sub = props.navigation.addListener('focus', () => loadData())
    }, [])
    const loadData = async () => {
        try {
            setLoading(true)
            let onGoingOrders = []
            let pastOrders = []
            if (user?.Type == UserTypes.CUSTOMER) {
                onGoingOrders = await getCustomerOngoingOrders()
                pastOrders = await getCustomerPastOrders()
            } else {
                onGoingOrders = await getBarberOngoingOrders()
                pastOrders = await getBarberPastOrders()
                console.log(onGoingOrders)
            }
            setOnGoingOrders(onGoingOrders)
            setPastOrders(pastOrders)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }
    }
    const Dash = ({ containerStyle }) => <View style={[styles.dash, containerStyle]} />
    const renderPastOrder = ({ item }) => {
        let statusText = ''
        switch (item.status) {
            case OrderStatus.PLACED:
                statusText = "Order placed"
                break
            case OrderStatus.CONFIRMED:
                statusText = "Confirmed"
                break
            case OrderStatus.PROCESSED:
                statusText = "Processed"
                break
            case OrderStatus.SHIP_READY:
                statusText = "Ready for shipment"
                break
            case OrderStatus.DELIVERY:
                statusText = "Out for delivery"
                break
            case OrderStatus.COMPLETED:
                statusText = "Delivered"
                break
        }
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', { orderDetails: item })} style={styles.pastContainer}>
                <View style={styles.details}>
                    <Text style={styles.id}>Order ID: {item.id.substr(0, 5)}</Text>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.total}>$ {item.total}</Text>
                    <Text style={styles.status}>{statusText}</Text>
                </View>
                <Image source={{ uri: item?.cartItems[0]?.images[0]?.imageUri }} style={styles.pastImg} />
            </TouchableOpacity>)
    }
    const renderEmpty = () =>
        <View style={styles.emptyContainer}>
            <Text style={styles.emptext}>{tabState == 0 ? 'No ongoing orders' : 'No past orders'}</Text>
        </View>
    return (
        <ScreenWrapper scrollEnabled transclucent
            headerUnScrollable={() =>
                <>
                    <Header
                        headerTitle={'Track Order'}
                        leadingIcon={'arrow-left'}
                        onPressLeadingIcon={() => props.navigation.goBack()} />
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            onPress={() => setTabState(0)}
                            style={tabState == 0 ? styles.activeTab : styles.inActiveTab}>
                            <Text style={styles.tabText}>On Going</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setTabState(1)}
                            style={tabState == 1 ? styles.activeTab : styles.inActiveTab}>
                            <Text style={styles.tabText}>Past</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            statusBarColor={AppColors.transparent}>
            {isLoading ?
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size={'large'} color={AppColors.primaryGold} />
                </View> :
                <View>
                    {tabState == 0 ?
                        <View style={styles.mainViewContainer}>
                            <FlatList
                                data={onGoingOrders}
                                renderItem={renderPastOrder}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={renderEmpty}
                                contentContainerStyle={{ marginTop: height(2) }}
                                ItemSeparatorComponent={() => <Dash />}
                            />
                        </View> :
                        <View style={styles.mainViewContainer}>
                            <FlatList
                                data={pastOrders}
                                renderItem={renderPastOrder}
                                keyExtractor={item => item.id}
                                contentContainerStyle={{ marginTop: height(2) }}
                                ItemSeparatorComponent={() => <Dash />}
                                ListEmptyComponent={renderEmpty}
                            />
                        </View>
                    }
                </View>}
        </ScreenWrapper >
    );
};
