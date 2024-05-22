"use client";
import { LoginProps } from "@/interfaces/UserInterfaces";
import { login } from "@/requests/userRequest";
import { LoginBody, LoginContainer } from "@/style/LoginComponents";
import { NikeLogoWrapper } from "@/style/NikeLogo";
import {
  CreateAccountFirst,
  LoginSuccess,
  ServerError,
  WrongCredentials,
} from "@/toasts/UserToasts";
import { validateEmail, validatePassword } from "@/utils/DataValidation";
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function sendLoginRequest() {
    let loginProps: LoginProps = {
      email: email,
      password: password,
    };
    await login(loginProps)
      .then((response) => {
        switch (response.status) {
          case 401:
            toast(WrongCredentials);
            break;
          case 404:
            toast(CreateAccountFirst);
            break;
          case 200:
            toast(LoginSuccess);
            break;
        }
      })
      .catch((error) => {
        toast(ServerError);
      });
  }

  const loginButton = validateEmail(email) ? (
    <Button
      _hover={{
        bg: "green.200",
      }}
      marginTop="20px"
      onClick={sendLoginRequest}
    >
      Login
    </Button>
  ) : (
    <Button
      disabled
      _hover={{}} // No hover effect for disabled buttons
      _focus={{}} // No focus effect for disabled buttons
      bg="gray.300" // Background color for disabled state
      color="gray.500" // Text color for disabled state
      cursor="not-allowed" // Change cursor to indicate non-interactivity
      opacity="0.7" // Lower opacity to indicate disabled state
      marginTop="20px"
    >
      Log in
    </Button>
  );

  return (
    <LoginBody>
      <NikeLogoWrapper>
        <Image
          src="./nike.svg"
          objectFit="cover"
          alt="nike-logo"
          filter="invert(1)"
          width={300}
        />
      </NikeLogoWrapper>
      <LoginContainer>
        <Stack spacing={4} width={500}>
          {/* Email */}
          <Input
            focusBorderColor="purple.400"
            color="white"
            placeholder="Your email address"
            _placeholder={{ color: "white" }}
            size="lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* pass  */}
          <InputGroup size="md">
            <Input
              color="white"
              size="lg"
              type={show ? "text" : "password"}
              focusBorderColor="purple.400"
              placeholder="Confirm password"
              _placeholder={{ color: "white" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem" paddingTop="10px">
              <Button
                h="1.75rem"
                onClick={() => setShow(!show)}
                _hover={{
                  bg: "purple.400",
                }}
              >
                {show ? (
                  <Image src="./eye_close.svg" width={5} alt="eye" />
                ) : (
                  <Image src="./eye_open.svg" width={5} alt="eye" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          {loginButton}
        </Stack>
      </LoginContainer>
    </LoginBody>
  );
}
