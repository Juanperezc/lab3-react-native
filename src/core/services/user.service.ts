//import { ThemeKey } from '@src/core/themes';
import axios, { AxiosStatic } from "axios";
//import { REACT_APP_API } from 'react-native-dotenv'
import getEnvVars from "../../../environment";
import AxiosInstance from "./interceptor";
import { Platform } from "react-native";
import FormData from "form-data";
import { ConfigStorage } from "./storage";
const { apiUrl } = getEnvVars();

const createFormData = photo => {
  const data = new FormData();
  data.append("file", {
    type: "image/jpeg", // <-- this
    name:
      "IMG_" +
      Math.random()
        .toString(10)
        .slice(2),
    uri: Platform.OS === "android" ? photo : photo.replace("file://", "")
  });

  /*  Object.keys(body).forEach(key => {
      data.append(key, body[key]);
  });
 */
  return data;
};
export class UserService {
  static login(values): Promise<AxiosStatic> {
    return AxiosInstance.post("auth/login", values);
  }
  static register(data): Promise<AxiosStatic> {
    return AxiosInstance.post("auth/register", data);
  }
  static me(): Promise<AxiosStatic> {
    return AxiosInstance.get("user/me");
  }

  static upload_photo(photo): Promise<AxiosStatic> {
    const formData = createFormData(photo);
    console.log("formData", formData);
    return AxiosInstance.post("user/upload_photo", formData);
  }
  static async index(): Promise<AxiosStatic> {
    return AxiosInstance.get("users");
  }
  static async show(id): Promise<AxiosStatic> {
    return AxiosInstance.get("users/" + id);
  }
  static async update(data): Promise<AxiosStatic> {
    const user = JSON.parse(await ConfigStorage.getUser());
    console.log("usuario", user);
    return AxiosInstance.put("users/" + user._id, data);
  }
  
}
