// TODO Token should not be store in unsecure AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { combine } from "zustand/middleware";

const accessTokenKey = "@toum/token";
const refreshTokenKey = "@toum/refresh-token";

export const useTokenStore = create(
  combine(
    {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKb2tlbiIsImV4cCI6MTYxNjc3MjA0MiwiaWF0IjoxNjE2NzY4NDQyLCJpc3MiOiJKb2tlbiIsImp0aSI6IjJwbnVrbDk3MDlvcmN1Zm43MDAxM3NhMSIsIm5iZiI6MTYxNjc2ODQ0MiwidXNlcklkIjoiNzA0ZDgyYTAtZmY5Ny00MGE4LTg1YjQtNjdmOThmMGQ4OTM2In0.PlqRW1h5XgnTTba-lrYXCuPNnHtXPOe6Z_9vkx0JRJ0",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKb2tlbiIsImV4cCI6MTYxOTM2MDQ0MiwiaWF0IjoxNjE2NzY4NDQyLCJpc3MiOiJKb2tlbiIsImp0aSI6IjJwbnVrbDk3MG5tdXN1Zm43MDAxM3NiMSIsIm5iZiI6MTYxNjc2ODQ0MiwidG9rZW5WZXJzaW9uIjoxLCJ1c2VySWQiOiI3MDRkODJhMC1mZjk3LTQwYTgtODViNC02N2Y5OGYwZDg5MzYifQ.5IWOClqLgdjkPtskJnZmE6XAK63VEaF-__HB7ZDWC6k",
    },
    (set) => ({
      setTokens: async (x: { accessToken: string; refreshToken: string }) => {
        try {
          await AsyncStorage.setItem(accessTokenKey, x.accessToken);
          await AsyncStorage.setItem(refreshTokenKey, x.refreshToken);
        } catch {}

        set(x);
      },
      loadTokens: async () => {
        try {
          let accessToken = await AsyncStorage.getItem(accessTokenKey);
          accessToken = accessToken || "";
          let refreshToken = await AsyncStorage.getItem(refreshTokenKey);
          refreshToken = refreshToken || "";
          set({ accessToken, refreshToken });
        } catch {}
      },
    })
  )
);
// export const useTokenStore = create(
//   combine(getDefaultValues(), (set) => ({
//     setTokens: (x: { accessToken: string; refreshToken: string }) => {
//       try {
//         localStorage.setItem(accessTokenKey, x.accessToken);
//         localStorage.setItem(refreshTokenKey, x.refreshToken);
//       } catch {}

//       set(x);
//     },
//   }))
// );
