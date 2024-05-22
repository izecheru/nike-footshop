import { LoginProps, RegisterProps } from "@/interfaces/UserInterfaces";

export function mapLoginToJson(email: string, password: string): LoginProps {
  let json: LoginProps = {
    email: email,
    password: password,
  };

  return json as LoginProps;
}

export function mapRegisterToJson(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): RegisterProps {
  let json: RegisterProps = {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  };

  return json as RegisterProps;
}
