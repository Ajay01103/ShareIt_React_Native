import React, { FC } from "react"
import { View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import IonIcons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { RFValue } from "react-native-responsive-fontsize"

interface IconProps {
  color?: string
  size: number
  name: string
  iconFamily: "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons"
}

const Icon: FC<IconProps> = ({ iconFamily, name, size, color }) => {
  return (
    <>
      {iconFamily === "Ionicons" && (
        // @ts-ignore
        <IonIcons
          name={name}
          color={color}
          size={RFValue(size)}
        />
      )}
      {iconFamily === "MaterialIcons" && (
        // @ts-ignore
        <MaterialIcons
          name={name}
          color={color}
          size={RFValue(size)}
        />
      )}
      {iconFamily === "MaterialCommunityIcons" && (
        // @ts-ignore
        <MaterialCommunityIcons
          name={name}
          color={color}
          size={RFValue(size)}
        />
      )}
    </>
  )
}

export default Icon
