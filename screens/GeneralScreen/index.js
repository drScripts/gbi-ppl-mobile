import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import {
  LoadingModal,
  Alreadyschedulemodal,
  FloatingActionButton,
} from "../../components/ModalComponent";
import { ErrorSnackBar } from "../../components/SnackBarNormal";
import Headerinformation, {
  HeaderInformationSingle,
} from "../../components/HeaderInformation";
import { generalStyles } from "../../shared";

const Index = ({
  error = null,
  isLoading = false,
  onErrorDismiss,
  children,
  safeAreaColor = "white",
  singleHeaderTitle = null,
  alreadyScheduleVisible = false,
  headerInformation = false,
  removePadding = false,
  navigation,
  centeredView,
  floatingActionButtonIcon,
  floatingActionButtonColor,
  floatingActionButtonOnClick,
  disableScroll = false,
}) => {
  return (
    <SafeAreaView
      style={[
        removePadding ? styles.safeAreaWithouPadding : styles.AndroidSafeArea,
        { backgroundColor: safeAreaColor },
      ]}
    >
      <ErrorSnackBar
        title={error}
        visible={error != null}
        onDismiss={onErrorDismiss}
      />
      <LoadingModal isVisible={isLoading} />

      {floatingActionButtonIcon && (
        <FloatingActionButton
          logo={floatingActionButtonIcon}
          color={floatingActionButtonColor}
          onClick={floatingActionButtonOnClick}
        />
      )}
      {headerInformation && <Headerinformation />}
      {singleHeaderTitle && (
        <HeaderInformationSingle title={singleHeaderTitle} />
      )}
      {alreadyScheduleVisible && (
        <Alreadyschedulemodal
          isVisible={alreadyScheduleVisible != null}
          onButtonPressed={() => {
            navigation.jumpTo("Homes");
          }}
        />
      )}
      {centeredView ? (
        <View style={[generalStyles.centeredView, { backgroundColor: "#EEE" }]}>
          {children}
        </View>
      ) : disableScroll ? (
        <View style={styles.containerView}>{children}</View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.containerView}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  containerView: {
    backgroundColor: "#EEE",
    flex: 1,
  },
  safeAreaWithouPadding: {
    flex: 1,
  },
});

export default Index;
