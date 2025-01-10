import React, { FC, useState, useEffect } from "react"
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native"
import RNFS from "react-native-fs"
import Icon from "../components/global/Icons"
import { sendStyles } from "../styles/sendStyles"
import { connectionStyles } from "../styles/connectionStyles"
import CustomText from "../components/global/CustomText"
import { Colors } from "../utils/Constants"
import { formatFileSize } from "../utils/libraryHelpers"
import { goBack } from "../utils/NavigationUtil"
import ReactNativeBlobUtil from "react-native-blob-util"
import LinearGradient from "react-native-linear-gradient"

const ReceivedFileScreen: FC = () => {
  const [receivedFiles, setReceivedFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getFilesFromDirectory = async () => {
    setIsLoading(true)
    const platformPath =
      Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/`
        : `${RNFS.DocumentDirectoryPath}/`

    try {
      const exists = await RNFS.exists(platformPath)

      if (!exists) {
        setReceivedFiles([])
        setIsLoading(false)
        return
      }

      const files = await RNFS.readDir(platformPath)

      const formattedFiles = files.map((file) => ({
        id: file.name,
        name: file.name,
        size: file.size,
        uri: file.path,
        mimeType: file.name.split(".").pop() || "unknown",
      }))

      setReceivedFiles(formattedFiles)
    } catch (error) {
      console.log("Error fetching files: ", error)
      setReceivedFiles([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getFilesFromDirectory()
  }, [])

  const getMimeType = (fileExt: string | undefined) => {
    switch (fileExt) {
      case "mp3":
        return "audio/mpeg"
      case "mp4":
        return "video/mp4"
      case "jpg":
        return "image/jpeg"
      case "pdf":
        return "application/pdf"
      default:
        return "*/*"
    }
  }

  const renderThumbnail = (mimeType: string) => {
    switch (mimeType) {
      case "mp3":
        return (
          <Icon
            name="musical-notes"
            size={16}
            color="blue"
            iconFamily="Ionicons"
          />
        )
      case "mp4":
        return (
          <Icon
            name="videocam"
            size={16}
            color="green"
            iconFamily="Ionicons"
          />
        )
      case "jpg":
        return (
          <Icon
            name="image"
            size={16}
            color="orange"
            iconFamily="Ionicons"
          />
        )
      case "pdf":
        return (
          <Icon
            name="document"
            size={16}
            color="red"
            iconFamily="Ionicons"
          />
        )
      default:
        return (
          <Icon
            name="folder"
            size={16}
            color="gray"
            iconFamily="Ionicons"
          />
        )
    }
  }

  const renderItem = ({ item }: any) => {
    return (
      <View style={connectionStyles.fileItem}>
        <View style={connectionStyles.fileInfoContainer}>
          {renderThumbnail(item.mimeType)}
          <View style={connectionStyles.fileDetails}>
            <CustomText
              numberOfLines={1}
              fontFamily="Okra-Bold"
              fontSize={10}
            >
              {item.name}
            </CustomText>

            <CustomText
              numberOfLines={1}
              fontFamily="Okra-Medium"
              fontSize={8}
            >
              {item.mimeType} • {formatFileSize(item.size)}
            </CustomText>
          </View>
        </View>

        <TouchableOpacity
          // onPress={() => {
          //   const normalizePath = Platform.OS === "ios" ? `file://${item?.uri}` : item?.uri

          //   if (Platform.OS === "ios") {
          //     ReactNativeBlobUtil.ios
          //       .openDocument(normalizePath)
          //       .then(() => console.log("File opened successfully"))
          //       .catch((err) => console.error("Error opening file: ", err))
          //   } else {
          //     ReactNativeBlobUtil.android
          //       .actionViewIntent(normalizePath, "*/*")
          //       .then(() => console.log("File opened Successfully"))
          //       .catch((err) => console.error("Error opening file: ", err))
          //   }
          // }}
          onPress={async () => {
            try {
              // Check if file exists
              const exists = await ReactNativeBlobUtil.fs.exists(item?.uri)
              if (!exists) {
                throw new Error("File not found")
              }

              // Normalize path based on platform
              const normalizePath = Platform.select({
                ios: `file://${item?.uri}`,
                android: item?.uri,
                default: item?.uri,
              })

              // Get file type
              const fileExt = item?.uri.split(".").pop()?.toLowerCase()
              const mimeType = getMimeType(fileExt) || "*/*"

              // Platform specific opening
              if (Platform.OS === "ios") {
                await ReactNativeBlobUtil.ios.previewDocument(normalizePath)
              } else {
                await ReactNativeBlobUtil.android.actionViewIntent(normalizePath, mimeType)
              }
            } catch (error) {
              console.error("Error opening file:", error)
              Alert.alert(
                "Error",
                "Unable to open file. Please make sure you have an app that can open this file type."
              )
            }
          }}
          style={connectionStyles.openButton}
        >
          <CustomText
            numberOfLines={1}
            color="#FFF"
            fontFamily="Okra-Bold"
            fontSize={9}
          >
            Open
          </CustomText>
        </TouchableOpacity>
      </View>
    )
  }

  const handleGoBack = () => {
    goBack()
  }

  return (
    <LinearGradient
      colors={["#FFF", "#CDDAEE", "#8DBAFF"]}
      style={sendStyles.container}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView />

      <CustomText
        fontFamily="Okra-Bold"
        fontSize={15}
        color="#fff"
        style={{ textAlign: "center" }}
      >
        All received files
      </CustomText>

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Colors.primary}
        />
      ) : receivedFiles.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={receivedFiles}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={connectionStyles.fileList}
          />
        </View>
      ) : (
        <View style={connectionStyles.noDataContainer}>
          <CustomText
            numberOfLines={1}
            fontFamily="Okra-Medium"
            fontSize={11}
          >
            No files received yet.
          </CustomText>
        </View>
      )}

      <TouchableOpacity
        onPress={handleGoBack}
        style={sendStyles.backButton}
      >
        <Icon
          name="arrow-back"
          iconFamily="Ionicons"
          size={16}
          color="#000"
        />
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default ReceivedFileScreen
