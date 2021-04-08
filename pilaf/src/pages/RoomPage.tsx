import { RouteProp } from "@react-navigation/native";
import React from "react";
import { RootStackParamList } from "../navigation/MainNavigator";
import { RoomController } from "../modules/room/RoomController";

type RoomPageRouteProp = RouteProp<RootStackParamList, "Room">;

type RoomPageProps = {
  route: RoomPageRouteProp;
};

export const RoomPage: React.FC<RoomPageProps> = ({ route }) => {
  return <RoomController roomId={route.params.roomId} />;
};
