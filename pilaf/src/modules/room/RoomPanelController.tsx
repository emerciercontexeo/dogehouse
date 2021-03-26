import { JoinRoomAndGetInfoResponse } from "@dogehouse/kebab";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
// import { ErrorToast } from "../../ui/ErrorToast";
import Toast from "react-native-toast-message";
import { TitledHeader } from "../../components/header/TitledHeader";
import { colors, h4, paragraph } from "../../constants/dogeStyle";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { isUuid } from "../../lib/isUuid";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";

interface RoomPanelControllerProps {
  roomId?: string | undefined;
}

const placeHolder = (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.primary900,
    }}
  >
    <TitledHeader title={""} showBackButton={true} />
    <ActivityIndicator color={colors.text} />
  </View>
);

export const RoomPanelController: React.FC<RoomPanelControllerProps> = ({
  roomId,
}) => {
  const { currentRoomId, setCurrentRoomId } = useCurrentRoomIdStore();
  const { data } = useTypeSafeQuery(
    ["joinRoomAndGetInfo", currentRoomId || ""],
    {
      refetchOnMount: "always",
      enabled: isUuid(roomId),
      onSuccess: ((d: JoinRoomAndGetInfoResponse | { error: string }) => {
        if (!("error" in d)) {
          setCurrentRoomId(() => d.room.id);
        }
      }) as any,
    },
    [roomId]
  );
  if (!data) {
    // @todo add error handling
    console.log("return firsst");
    return placeHolder;
  }

  // @todo start using error codes
  if ("error" in data) {
    // @todo replace with real design
    useEffect(() => {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    }, []);
    return <View />;
  }

  if (!currentRoomId) {
    // return null;
    return placeHolder;
  }

  if (currentRoomId !== roomId) {
    return placeHolder;
  }

  const roomCreator = data.users.find((x) => x.id === data.room.creatorId);
  //return placeHolder;
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary900 }}>
      <TitledHeader title={data.room.name} showBackButton={true} />
      <Text style={{ ...paragraph }}>{data.room.description}</Text>
      <Text style={{ ...paragraph }}>{roomCreator.username}</Text>
      <Text style={{ ...paragraph }}>Waiting for design information</Text>
      <Text style={{ ...paragraph }}>{roomId}</Text>
    </View>
  );
};
