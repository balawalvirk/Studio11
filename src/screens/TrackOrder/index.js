import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import product from '../../assets/images/shop/1.png';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import OrderStatusComponent from '../../components/OrderStatusComponent';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import { height } from 'react-native-dimension';
export default function TrackOrder(props) {
    const [tabState, setTabState] = useState(0) //  0 => current 1 => past 
    const Dash = ({ containerStyle }) => <View style={[styles.dash, containerStyle]} />
    const orders = [
        {
            id: '1',
            title: 'rerum quibusdam',
            total: 130,
            status: 'Received'
        },
        {
            id: '2',
            title: 'rerum quibusdam',
            total: 130,
            status: 'Received'
        },
    ]
    const renderPastOrder = ({ item }) =>
        <View style={styles.pastContainer}>
            <View style={styles.details}>
                <Text style={styles.id}>Order ID: {item.id}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.total}>$ {item.total}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
            </View>
            <Image source={product} style={styles.pastImg} />
        </View>
    return (
        <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}>
            <Header
                headerTitle={'Track Order'}
                leadingIcon={'arrow-left'}
                onPressLeadingIcon={() => props.navigation.goBack()} />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setTabState(0)}
                    style={tabState == 0 ? styles.activeTab : styles.inActiveTab}>
                    <Text style={styles.tabText}>Current</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setTabState(1)}
                    style={tabState == 1 ? styles.activeTab : styles.inActiveTab}>
                    <Text style={styles.tabText}>Past</Text>
                </TouchableOpacity>
            </View>
            {
                tabState == 0 ?
                    <View style={styles.mainViewContainer}>
                        <View style={styles.productDetails}>
                            <View style={styles.productInfo}>
                                <Text style={styles.idText}>Order ID: 45454454</Text>
                                <Text style={styles.descrText}>esse corporis</Text>
                                <Text style={styles.priceText}>$130</Text>
                            </View>
                            <Image source={product} style={styles.productImg} />
                        </View>
                        <Dash />
                        <Text style={styles.trackText}>Track Order</Text>
                        <OrderStatusComponent containerStyle={styles.orderContainer} />
                        <Dash />
                    </View> :
                    <View style={styles.mainViewContainer}>
                        <FlatList
                            data={orders}
                            renderItem={renderPastOrder}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ marginTop: height(2) }}
                            ItemSeparatorComponent={() => <Dash />}
                        />
                    </View>
            }
        </ScreenWrapper>
    );
};
