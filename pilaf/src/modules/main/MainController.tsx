import React from "react";
import { Header } from "../../components/header/Header";
import { WebRtcApp } from "../webrtc/WebRtcApp";
import { BottomNavigator } from "../../navigators/BottomNavigator";

export const MainController: React.FC = () => {
  return (
    <>
      <Header />
      <BottomNavigator />
      <WebRtcApp />
    </>
  );
};
