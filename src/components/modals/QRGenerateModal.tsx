import { ActivityIndicator, Modal, TouchableOpacity, View } from "react-native"
import React, { FC, useEffect, useMemo, useState } from "react"
import { modalStyles } from "../../styles/modalStyles"
import Icon from "../global/Icons"
import CustomText from "../global/CustomText"
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import LinearGradient from "react-native-linear-gradient"
import QRCode from "react-native-qrcode-svg"
import { multiColor } from "../../utils/Constants"
import DeviceInfo from "react-native-device-info"
import { useTCP } from "../../services/TCPProvider"
import { navigate } from "../../utils/NavigationUtil"
import { getLocalIPAddress } from "../../utils/networkUtils"

interface ModalProps {
  visible: boolean
  onClose: () => void
}

const QRGenerateModal: FC<ModalProps> = ({ onClose, visible }) => {
  const { isConnected, startServer, server } = useTCP()
  const [loading, setLoading] = useState(true)
  const [QRValue, setQRValue] = useState("AJ")

  const shimmerTranslateX = useSharedValue(-300)

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslateX.value }],
  }))

  const setupServer = async () => {
    const deviceName = await DeviceInfo.getDeviceName()
    const ip = await getLocalIPAddress()
    const port = 4000

    if (server) {
      const ip = await getLocalIPAddress()
      const port = 4000
      setQRValue(`tcp://${ip}:${port}|${deviceName}`)
      setLoading(false)
      return
    }

    startServer(port)
    setQRValue(`tcp://${ip}:${port}|${deviceName}`)

    console.log(`Server Info: ${ip}:${port}`)

    setLoading(false)
  }

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(300, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    )

    if (visible) {
      setLoading(true)
      setupServer()
    }
  }, [visible])

  useEffect(() => {
    console.log("TCPProvider: is Connected updated to", isConnected)

    if (isConnected) {
      onClose()
      navigate("ConnectionScreen")
    }
  }, [isConnected])

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="formSheet"
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.qrContainer}>
          {loading || QRValue == null || QRValue == "" ? (
            <View style={modalStyles.skeleton}>
              <Animated.View style={[modalStyles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={["#F3F3F3", "#FFF", "#F3F3F3"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={modalStyles.shimmerGradient}
                />
              </Animated.View>
            </View>
          ) : (
            <QRCode
              value={QRValue}
              size={250}
              logoSize={60}
              logoBackgroundColor="#FFF"
              logoMargin={2}
              logoBorderRadius={10}
              logo={require("../../assets/images/profile2.jpg")}
              linearGradient={multiColor}
              enableLinearGradient
            />
          )}
        </View>

        <View style={modalStyles.info}>
          <CustomText style={modalStyles.infoText1}>
            Ensure you're on the same Wi-Fi network
          </CustomText>
          <CustomText style={modalStyles.infoText2}>
            Ask the sender to scan this QR code to connect and transfer files
          </CustomText>
        </View>

        <ActivityIndicator
          size="small"
          style={{ alignSelf: "center" }}
        />

        <TouchableOpacity
          onPress={() => onClose()}
          style={modalStyles.closeButton}
        >
          <Icon
            name="close"
            iconFamily="Ionicons"
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default QRGenerateModal