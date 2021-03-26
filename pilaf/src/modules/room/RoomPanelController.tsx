import { JoinRoomAndGetInfoResponse } from "@dogehouse/kebab";
import React, { useEffect } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
// import { ErrorToast } from "../../ui/ErrorToast";
import Toast from "react-native-toast-message";
import { TitledHeader } from "../../components/header/TitledHeader";
import { colors, h4, paragraph } from "../../constants/dogeStyle";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { isUuid } from "../../lib/isUuid";
import { useTypeSafeMutation } from "../../shared-hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { useNavigation } from "@react-navigation/core";
import { useMuteStore } from "../../global-stores/useMuteStore";
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
  const { mutateAsync: leaveRoom } = useTypeSafeMutation("leaveRoom");
  const navigation = useNavigation();
  const { currentRoomId, setCurrentRoomId } = useCurrentRoomIdStore();
  const setInternalMute = useMuteStore((s) => s.setInternalMute);
  const muted = useMuteStore((s) => s.muted);
  const { data, isLoading } = useTypeSafeQuery(
    ["joinRoomAndGetInfo", roomId || ""],
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

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!data) {
      setCurrentRoomId(null);
      navigation.navigate("Home");
      return;
    }
    if ("error" in data) {
      setCurrentRoomId(null);
      //showErrorToast(data.error);
      navigation.navigate("Home");
    }
  }, [data, isLoading, navigation.navigate, setCurrentRoomId]);

  if (isLoading || !currentRoomId) {
    return placeHolder;
  }

  if (!data || "error" in data) {
    return null;
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

      <Button
        title={"leave the room"}
        onPress={() => {
          leaveRoom([]);
          navigation.navigate("Home");
        }}
      />

      <Button
        title={"mute"}
        onPress={() => {
          setInternalMute(!muted);
        }}
      />
    </View>
  );
};
