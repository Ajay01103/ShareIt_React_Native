import { View, Text } from "react-native"
import React, { FC } from "react"
import { commonStyles } from "../styles/commonStyles"
import Homeheader from "../components/home/Homeheader"

const HomeScreen: FC = () => {
  return (
    <View style={commonStyles.baseContainer}>
      <Homeheader />
    </View>
  )
}

export default HomeScreen
