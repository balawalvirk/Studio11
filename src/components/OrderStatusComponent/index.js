import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utills/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { height, width } from 'react-native-dimension';
import { OrderStatus } from '../../utills/Enums';
const OrderStatusComponent = ({
    orderStatus = [OrderStatus.CONFIRMED, OrderStatus.PROCESSED, OrderStatus.PLACED],
    containerStyle,
}) => {
    const RenderRow = ({ title, description, date, checked }) =>
        <View style={styles.row}>
            <TouchableOpacity>
                {checked ?
                    <AntDesign
                        name={'checkcircle'}
                        color={AppColors.primaryGold}
                        size={height(3.5)} /> :
                    <FontAwesome
                        name={'circle-thin'}
                        color={AppColors.primaryGold}
                        size={height(3.8)} />
                }
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.goldTitle}>{title}</Text>
                <Text style={styles.text}>{description}</Text>
                <Text style={styles.text}>On: {date}</Text>
            </View>
        </View>
    return (
        <View style={[styles.container, containerStyle]}>
            <RenderRow
                checked={orderStatus.includes(OrderStatus.PLACED)}
                title={'Order Placed'}
                description={'We have received your order'}
                date={'23-May-2021'}
            />
            <RenderRow
                checked={orderStatus.includes(OrderStatus.CONFIRMED)}
                title={'Order Confirmed'}
                description={'Your order has been confirmed'}
                date={'23-May-2021'}
            />
            <RenderRow
                checked={orderStatus.includes(OrderStatus.PROCESSED)}
                title={'Order Processed'}
                description={'Your order is being processed'}
                date={'23-May-2021'}
            />
            <RenderRow
                checked={orderStatus.includes(OrderStatus.SHIP_READY)}
                title={'Ready to Ship'}
                description={'Your order is ready for shipping'}
                date={'23-May-2021'}
            />
            <RenderRow
                checked={orderStatus.includes(OrderStatus.DELIVERY)}
                title={'Out for Delivery'}
                description={'Your order is out for delivery'}
                date={'23-May-2021'}
            />
        </View>
    )
};

export default OrderStatusComponent;
