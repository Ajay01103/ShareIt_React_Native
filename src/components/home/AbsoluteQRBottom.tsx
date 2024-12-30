import { TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { bottomTabStyles } from "../../styles/bottomTabStyle"
import Icon from "../global/Icons"
import { navigate } from "../../utils/NavigationUtil"
import QRScannerModal from "../modals/QRScannerModal"

const AbsoluteQRBottom = () => {
  const [isVisible, setVisible] = useState(false)

  return (
    <>
      <View style={bottomTabStyles.container}>
        <TouchableOpacity onPress={() => navigate("RecievedFileScreen")}>
          <Icon
            name="apps-sharp"
            iconFamily="Ionicons"
            color="#333"
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={bottomTabStyles.qrCode}
          onPress={() => setVisible(true)}
        >
          <Icon
            name="qrcode-scan"
            iconFamily="MaterialCommunityIcons"
            color="#fff"
            size={26}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Icon
            name="beer-sharp"
            iconFamily="Ionicons"
            color="#333"
            size={24}
          />
        </TouchableOpacity>
      </View>

      {isVisible && (
        <QRScannerModal
          visible={isVisible}
          onClose={() => setVisible(false)}
        />
      )}
    </>
  )
}

export default AbsoluteQRBottom
