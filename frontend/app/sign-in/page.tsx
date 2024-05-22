"use client";
import { LoginProps } from "@/interfaces/UserInterfaces";
import { login } from "@/requets/userRequest";
import { LoginBody, LoginContainer } from "@/style/LoginComponents";
import { NikeLogoWrapper } from "@/style/NikeLogo";
import {
  CreateAccountFirst,
  LoginSuccess,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  async function sendLoginRequest() {
    let loginProps: LoginProps = {
      email: email,
      password: password,
    };
    await login(loginProps).then((response) => {
      if (response.status === 401) {
        // wrong credentials
        toast(WrongCredentials);
      }
      if (response.status === 404) {
        // create an account
        toast(CreateAccountFirst);
      }
      if (response.status === 200) {
        // we logged in
        toast(LoginSuccess);
      }
    });
  }

  const loginButton = validateEmail(email) ? (
    <Button
      _hover={{
        bg: "cyan.100",
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
            color="white"
            isInvalid={!validateEmail(email)}
            borderColor="green.200"
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
              isInvalid={!validatePassword(password)}
              placeholder="Confirm password"
              borderColor="green.200"
              _placeholder={{ color: "white" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
                _hover={{
                  bg: "cyan.200",
                }}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {loginButton}
        </Stack>
      </LoginContainer>
    </LoginBody>
  );
}
