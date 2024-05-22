import IToast from "@/interfaces/Toast";

export const FailureLogin: IToast = {
  title: "Email already in use!",
  description: "Please use your own email or log in.",
  duration: 3200,
  isClosable: true,
  status: "error",
};

export const WrongCredentials: IToast = {
  title: "Check credentials",
  description: "Password or email do not match your account!",
  duration: 3200,
  isClosable: true,
  status: "error",
};

export const CreateAccountFirst: IToast = {
  title: "No account found",
  description: "Please create an account first!",
  duration: 3200,
  isClosable: true,
  status: "error",
};

export const LoginSuccess: IToast = {
  title: "Welcome",
  description: "You will be redirected to your cart",
  duration: 3200,
  isClosable: true,
  status: "success",
};

export const ServerError: IToast = {
  title: "Server error",
  description:
    "Server is currently not running, please come back later, sorry for the inconvenience!",
  duration: 3200,
  isClosable: true,
  status: "error",
};
