import axios, { setTokenForAxios } from "./axios";
import config from "../config/index";

// getToken
export const getToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const aseetsDomain = config.domain;
      const tokenURL = `${aseetsDomain}/lottie-json/token?name=sxh&&password=123456`;
      const { status, data } = await axios(tokenURL);
      const { data: resData, code, msg } = data;
      if (status === 200 && code === 200) {
        const token = resData?.token || "";
        resolve(token);
      } else {
        reject(msg);
      }
    } catch (error) {
      const {
        response: { status, statusText },
      } = error;
      reject({ status, statusText });
    }
  });
};

export function setToken(token) {
  setTokenForAxios(token);
}
