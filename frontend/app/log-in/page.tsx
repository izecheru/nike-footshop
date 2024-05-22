"use client";
import { LoginProps } from "@/interfaces/UserInterfaces";
import { login } from "@/requests/userRequest";
import { NikeLogoWrapper } from "@/styled components/NikeLogo";
import {
  CreateAccountFirst,
  LoginSuccess,
  ServerError,
  WrongCredentials,
} from "@/toasts/UserToasts";
import { validateEmail, validatePassword } from "@/utils/DataValidation";
import {
  Box,
  Button,
  Flex,
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

  function goToSignup() {
    router.push("/sign-up");
    toast.closeAll();
  }

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
        bg: "var(--button-hover-color)",
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
    <Box bg={"black"}>
      <Flex direction={"column"} justifyContent={"center"} height={"100vh"}>
        <NikeLogoWrapper>
          <Image
            src="./nike.svg"
            objectFit="cover"
            alt="nike-logo"
            filter="invert(1)"
            width={300}
          />
        </NikeLogoWrapper>
        <Flex padding={17} direction={"row"} justifyContent={"center"}>
          <Stack spacing={4} width={500}>
            {/* Email */}
            <Input
              focusBorderColor="purple.700"
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
                focusBorderColor="purple.700"
                placeholder="Confirm password"
                _placeholder={{ color: "white" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem" paddingTop="10px">
                <Button
                  h="1.75rem"
                  onClick={() => setShow(!show)}
                  _hover={{
                    bg: "var(--button-hover-color)",
                  }}
                >
                  {show ? (
                    <Image src="./eye_open.svg" width={5} alt="eye" />
                  ) : (
                    <Image src="./eye_close.svg" width={5} alt="eye" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex gap={5} justifyContent={"center"} direction={"row"}>
              <Text fontSize={17} color="white">
                You don't have an account?
              </Text>
              <Button
                h="1.75rem"
                size="sm"
                _hover={{
                  bg: "var(--button-hover-color)",
                }}
                onClick={goToSignup}
              >
                Go to Sign up
              </Button>
            </Flex>
            {loginButton}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
