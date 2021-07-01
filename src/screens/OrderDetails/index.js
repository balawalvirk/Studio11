import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header';
import OrderStatusComponent from '../../components/OrderStatusComponent';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function OrderDetails(props) {
    const { orderDetails } = props.route.params
    const Dash = ({ containerStyle }) => <View style={[styles.dash, containerStyle]} />
    return (
        <ScreenWrapper
            scrollEnabled
            transclucent
            statusBarColor={AppColors.transparent}
            headerUnScrollable={() =>
                <Header
                    leadingIcon={'arrow-left'}
                    onPressLeadingIcon={() => props.navigation.goBack()}
                    headerTitle={'OrderDetails'} />}
        >

            <View style={styles.mainViewContainer}>
                <View style={styles.productDetails}>
                    <View style={styles.productInfo}>
                        <Text style={styles.idText}>Order ID: {orderDetails?.id?.substr(0, 5)}</Text>
                        <Text style={styles.descrText}>{orderDetails?.name}</Text>
                        <Text style={styles.priceText}>${orderDetails?.total}</Text>
                    </View>
                    <Image source={{ uri: orderDetails?.cartItems[0]?.images[0]?.imageUri }} style={styles.productImg} />
                </View>
                <Dash />
                <Text style={styles.trackText}>Track Order</Text>
                <OrderStatusComponent
                    orderStatus={orderDetails?.status}
                    containerStyle={styles.orderContainer} />
                <Dash />
            </View>
        </ScreenWrapper>
    );
};
