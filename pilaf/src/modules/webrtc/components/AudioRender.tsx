import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useConsumerStore } from "../stores/useConsumerStore";

interface AudioRenderProps {}

const MyAudio = ({
  volume,
  onRef,
  debug,
  ...props
}: React.DetailedHTMLProps<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  HTMLAudioElement
> & {
  onRef: (a: HTMLAudioElement) => void;
  volume: number;
  debug?: boolean;
}) => {
  const myRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (myRef.current) {
      myRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <audio
      ref={(r) => {
        if (debug && r) {
          console.log("audio-debug", {
            currentTime: r.currentTime,
            paused: r.paused,
            ended: r.ended,
            readyState: r.readyState,
            duration: r.duration,
            volume: r.volume,
          });
          if (r.dataset.debugPlay !== "true") {
            r.dataset.debugPlay = "true";
            r.play()
              .then(() => console.log("debug-play-then"))
              .catch((err) => {
                console.log("debug-play-catch", err);
              });
          }
        }
        // @todo
        if (r && !myRef.current) {
          (myRef as any).current = r;
          onRef(r);
        }
      }}
      {...props}
    />
  );
};

export const AudioRender: React.FC<AudioRenderProps> = () => {
  const notAllowedErrorCountRef = useRef(0);
  const [showAutoPlayModal, setShowAutoPlayModal] = useState(false);
  // const [globalVolume] = useAtom(volumeAtom);
  const globalVolume = 100;
  const { consumerMap } = useConsumerStore();
  const audioRefs = useRef<[string, HTMLAudioElement][]>([]);

  return <View></View>;
};
