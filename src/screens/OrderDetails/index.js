import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../../components/Header';
import OrderStatusComponent from '../../components/OrderStatusComponent';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { OrderStatus, UserTypes } from '../../utills/Enums';
import styles from './styles';
import Button from '../../components/Button'
import { useSelector } from 'react-redux';
import { width } from 'react-native-dimension';
import { saveData } from '../../firebaseConfig'
export default function OrderDetails(props) {
    const { orderDetails } = props.route.params
    const user = useSelector(state => state.Auth.user)
    const Dash = ({ containerStyle }) => <View style={[styles.dash, containerStyle]} />

    const [order, setOrder] = useState(orderDetails)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [processLoading, setProcessLoading] = useState(false)
    const [cancelLoading, setCancelLoading] = useState(false)
    const [shipmentLoading, setShipmentLoading] = useState(false)
    const [deliveryLoading, setDeliveryLoading] = useState(false)
    const [completeLoading, setCompleteLoading] = useState(false)
    const onConfirmOrder = async () => {
        try {
            setConfirmLoading(true)
            await saveData('Orders', order.id, { status: OrderStatus.CONFIRMED })
            setOrder({
                ...orderDetails,
                status: OrderStatus.CONFIRMED,
            })
            setConfirmLoading(false)
        } catch (error) {
            console.log(error.message)
            setConfirmLoading(false)
        }
    }
    const onCancelPress = async () => {
        try {
            setCancelLoading(true)
            await saveData('Orders', order.id, { status: OrderStatus.CANCELLED })
            props.navigation.goBack()
            setCancelLoading(false)
        } catch (error) {
            console.log(error.message)
            setCancelLoading(false)
        }
    }
    const onProcessOrder = async () => {
        try {
            setProcessLoading(true)
            await saveData('Orders', order.id, { status: OrderStatus.PROCESSED })
            setOrder({
                ...orderDetails,
                status: OrderStatus.PROCESSED,
            })
            setProcessLoading(false)
        } catch (error) {
            console.log(error.message)
            setProcessLoading(false)
        }
    }
    const onShipmentOrder = async () => {
        try {
            setShipmentLoading(true)
            await saveData('Orders', order.id, { status: OrderStatus.SHIP_READY })
            setOrder({
                ...orderDetails,
                status: OrderStatus.SHIP_READY,
            })
            setShipmentLoading(false)
        } catch (error) {
            console.log(error.message)
            setShipmentLoading(false)
        }
    }
    const onDeliveryPress = async () => {
        try {
            setDeliveryLoading(true)
            await saveData('Orders', order.id, { status: OrderStatus.DELIVERY })
            setOrder({
                ...orderDetails,
                status: OrderStatus.DELIVERY,
            })
            setDeliveryLoading(false)
        } catch (error) {
            console.log(error.message)
            setDeliveryLoading(false)
        }
    }
    const onCompletePress = async () => {
        try {
            setCompleteLoading(true)
            await saveData('Orders', order.id, { status: OrderStatus.COMPLETED })
            setOrder({
                ...orderDetails,
                status: OrderStatus.COMPLETED,
            })
            setCompleteLoading(false)
        } catch (error) {
            console.log(error.message)
            setCompleteLoading(false)
        }
    }
    return (
        <ScreenWrapper
            scrollEnabled
            transclucent
            statusBarColor={AppColors.transparent}
            headerUnScrollable={() =>
                <Header
                    leadingIcon={'arrow-left'}
                    onPressLeadingIcon={() => props.navigation.goBack()}
                    headerTitle={'OrderDetails'} />}>

            <View style={styles.mainViewContainer}>
                <View style={styles.productDetails}>
                    <View style={styles.productInfo}>
                        <Text style={styles.idText}>Order ID: {order?.id?.substr(0, 5)}</Text>
                        <Text style={styles.descrText}>{order?.name}</Text>
                        <Text style={styles.priceText}>${order?.total}</Text>
                    </View>
                    <Image source={{ uri: order?.cartItems[0]?.images[0]?.imageUri }} style={styles.productImg} />
                </View>
                <Dash />
                <Text style={styles.trackText}>Track Order</Text>
                <OrderStatusComponent
                    orderStatus={order?.status}
                    containerStyle={styles.orderContainer} />
                {/* <Dash /> */}
                {user?.Type == UserTypes.BARBER &&
                    <View>
                        {order?.status == OrderStatus.PLACED &&
                            <View style={styles.flexRow}>
                                <Button
                                    planButton
                                    disabled={(confirmLoading || cancelLoading)}
                                    isLoading={cancelLoading}
                                    containerStyle={styles.plainBtn}
                                    title={'Cancel'}
                                    onPress={onCancelPress}
                                />
                                <Button
                                    disabled={(confirmLoading || cancelLoading)}
                                    isLoading={confirmLoading}
                                    title={'Confirm Order'}
                                    onPress={onConfirmOrder}
                                    containerStyle={{ width: width(30) }}
                                />
                            </View>}
                        {order?.status == OrderStatus.CONFIRMED &&
                            <Button
                                disabled={processLoading}
                                isLoading={processLoading}
                                title={'Mark order as processed'}
                                onPress={onProcessOrder}
                            />
                        }
                        {order?.status == OrderStatus.PROCESSED &&
                            <Button
                                disabled={shipmentLoading}
                                isLoading={shipmentLoading}
                                title={'Ready for shipment'}
                                onPress={onShipmentOrder}
                            />
                        }
                        {order?.status == OrderStatus.SHIP_READY &&
                            <Button
                                disabled={deliveryLoading}
                                isLoading={deliveryLoading}
                                title={'Mark order as out for Delivery'}
                                onPress={onDeliveryPress}
                            />
                        }
                    </View>
                }
                {user?.Type == UserTypes.CUSTOMER && order?.status == OrderStatus.DELIVERY &&
                    <Button
                        disabled={completeLoading}
                        isLoading={completeLoading}
                        title={'Complete Order'}
                        onPress={onCompletePress}
                    />
                }
            </View>
        </ScreenWrapper >
    );
};
