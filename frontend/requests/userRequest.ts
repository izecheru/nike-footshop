import axiosClient from "@/axios/axios";
import { LoginProps, RegisterProps } from "@/interfaces/UserInterfaces";

export async function register(registerProps: RegisterProps) {
  return await axiosClient.post("/register", registerProps);
}

export async function login(loginProps: LoginProps) {
  return axiosClient.post("/login", loginProps);
}
