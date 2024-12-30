import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import React from "react"
import { screenHeight } from "../../utils/Constants"
import { navigate } from "../../utils/NavigationUtil"

const SendOrRecieveButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate("SendScreen")}
      >
        <Image
          source={require("../../assets/icons/send1.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate("ReceiveScreen")}
      >
        <Image
          source={require("../../assets/icons/receive1.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.04,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  btn: {
    width: 140,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
})

export default SendOrRecieveButton
