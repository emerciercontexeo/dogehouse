import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TitledHeader } from "../components/header/TitledHeader";
import { MessageElement } from "../components/MessageElement";
import { colors } from "../constants/dogeStyle";
import { MessagesController } from "../pageControllers/MessagesController";

export const MessagesPage: React.FC = () => {
  return <MessagesController />;
};
