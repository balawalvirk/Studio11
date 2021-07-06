import React from 'react';
import { ImageBackground, SafeAreaView, StatusBar, View } from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import AppColors from '../../utills/AppColors';
import { height } from 'react-native-dimension';
const ScreenWrapper = ({
  children,
  statusBarColor = AppColors.textColor,
  transclucent = false,
  scrollEnabled = false,
  backgroundImage,
  barStyle = "light-content",
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  hideStatus = false,
  extraHeight,
  extraScrollHeight,
  nestedScrollEnabled,
  enableOnAndroid = false
}) => {
  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : null;
  }
  const content = () => {
    return (
      <View style={[styles.container, backgroundImage && { backgroundColor: 'transparent' }]}>
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={transclucent}
        />
        {!transclucent && (
          <SafeAreaView
            style={(styles.container, { backgroundColor: statusBarColor })}
          />
        )}
        {headerUnScrollable()}
        {scrollEnabled ? (
          <KeyboardAwareScrollView
            extraScrollHeight={extraScrollHeight}
            extraHeight={extraHeight}
            enableOnAndroid={enableOnAndroid}
            nestedScrollEnabled={nestedScrollEnabled}
            style={[styles.container, backgroundImage && { backgroundColor: 'transparent' }]}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        ) : (
          children
        )}
        {footerUnScrollable()}
      </View>)
  }
  return (
    backgroundImage ? <ImageBackground source={backgroundImage} style={styles.container} resizeMode={'cover'}>
      {content()}
    </ImageBackground>
      :
      content()
  );
};

export default ScreenWrapper;
