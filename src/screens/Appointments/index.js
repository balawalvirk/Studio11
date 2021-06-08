import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { Appointmentslist } from '../../dummyData';
export default function Appointments(props) {
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Appointments'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>

        <FlatList contentContainerStyle={{ paddingBottom: height(15) }}
          data={Appointmentslist}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <AppointmentCard barberName={item.barberName} cuttingName={item.cuttingName}
                  appointmentTime={item.time} timeLeft={item.timeLeft} onpressAppointmentcard={() => props.navigation.navigate('AppointmentDetails')}
                  appointmentImage={item.appointmentImage} style={{ verticalmargin: 5 }} />
                <HorizontalLine lineColor={styles.transparent} />
              </View>
            );
          }}
        />

      </View>
    </ScreenWrapper>
  );
};
