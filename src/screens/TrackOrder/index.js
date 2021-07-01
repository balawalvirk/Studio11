import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import product from '../../assets/images/shop/1.png';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import OrderStatusComponent from '../../components/OrderStatusComponent';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import { height } from 'react-native-dimension';
import { getCustomerOngoingOrders, getCustomerPastOrders } from '../../firebaseConfig';
import { OrderStatus } from '../../utills/Enums';
export default function TrackOrder(props) {
    const [tabState, setTabState] = useState(0) //  0 => current 1 => past 
    const [pastOrders, setPastOrders] = useState([])
    const [onGoingOrders, setOnGoingOrders] = useState([])
    useEffect(() => {
        loadData()
    }, [])
    const loadData = async () => {
        try {
            const onGoingOrders = await getCustomerOngoingOrders()
            const pastOrders = await getCustomerPastOrders()
            setOnGoingOrders(onGoingOrders)
            setPastOrders(pastOrders)
        } catch (error) {
            console.log(error.message)
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
                statusText = "Ready for delivery"
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
            {
                tabState == 0 ?
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
        </ScreenWrapper>
    );
};
