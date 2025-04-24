import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const BottomSheet = () => {
  return (
    <View style={styles.BottomSheet}>
      <Pressable>
        <View style={styles.BottomSheetShadowCover} />
      </Pressable>
      <View style={styles.BottomSheetMainContainer}>
        <Pressable style={styles.closingBar} />

      </View>
    </View>
  );
}
export default BottomSheet;
const styles = StyleSheet.create({
    BottomSheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 300,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    BottomSheetShadowCover: {
        position: "absolute",
        top: -50,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    BottomSheetMainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    closingBar: {
        width: 40,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 2.5,
        marginBottom: 10,
    },
    BottomSheetText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    BottomSheetButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    BottomSheetButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    BottomSheetInput: {
        width: "80%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
})