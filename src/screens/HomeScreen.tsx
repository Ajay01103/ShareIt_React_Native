import { View, Text, ScrollView } from "react-native"
import React, { FC } from "react"
import { commonStyles } from "../styles/commonStyles"
import Homeheader from "../components/home/Homeheader"
import SendOrRecieveButton from "../components/home/SendOrRecieveButton"
import Options from "../components/home/Options"
import Misc from "../components/home/Misc"
import AbsoluteQRBottom from "../components/home/AbsoluteQRBottom"

const HomeScreen: FC = () => {
  return (
    <View style={commonStyles.baseContainer}>
      <Homeheader />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <SendOrRecieveButton />
        <Options isHome={true} />
        <Misc />
      </ScrollView>

      <AbsoluteQRBottom />
    </View>
  )
}

export default HomeScreen
