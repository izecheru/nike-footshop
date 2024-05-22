"use client";
import useLoginForm from "@/hooks/useLoginForm";
import { register } from "@/requests/userRequest";
import { NikeLogoWrapper } from "@/styled components/NikeLogo";
import { FailureLogin } from "@/toasts/UserToasts";
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
import { AxiosResponse } from "axios";
import { mapRegisterToJson } from "@/utils/MapToJson";

export default function SignUpPage() {
  const router = useRouter();
  function goToLogin() {
    router.push("/log-in");
  }

  const toast = useToast();
  const {
    setEmail,
    setPassword,
    isEmailValid,
    isPasswordValid,
    name,
    email,
    password,
    passwordConfirmation: password_confirmation,
    handleShowPassClick,
    handleShowPassConfClick,
    showPass,
    showPassConf,
    setName,
    setPasswordConfirmation,
  } = useLoginForm();

  async function sendRegisterRequest() {
    let registerUserData = mapRegisterToJson(
      name,
      email,
      password,
      password_confirmation
    );

    await register(registerUserData)
      .then((response: AxiosResponse) => {
        if (response.status === 422) {
          // router.push("/home");
          toast(FailureLogin);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  const signUpButton =
    isEmailValid &&
    isPasswordValid &&
    password_confirmation === password &&
    password_confirmation.length > 6 &&
    name.length > 4 ? (
      <Button
        _hover={{
          bg: "var(--button-hover-color)",
        }}
        marginTop="20px"
        onClick={sendRegisterRequest}
      >
        Sign up
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
        Sign up
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
            {/* Name */}
            <Input
              color="white"
              focusBorderColor="purple.700"
              placeholder="Your name"
              _placeholder={{ color: "white" }}
              size="lg"
              onChange={(e) => setName(e.target.value)}
            />
            {/* Email  */}
            <Input
              color="white"
              focusBorderColor="purple.700"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              _placeholder={{ color: "white" }}
              size="lg"
            />
            {/* Password */}
            <InputGroup size="md">
              <Input
                focusBorderColor="purple.700"
                size="lg"
                color="white"
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                _placeholder={{ color: "white" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowPassClick}
                  _hover={{
                    bg: "var(--button-hover-color)",
                  }}
                >
                  {showPass ? (
                    <Image src="./eye_open.svg" width={5} alt="eye" />
                  ) : (
                    <Image src="./eye_close.svg" width={5} alt="eye" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* Password confirmation */}
            <InputGroup size="md">
              <Input
                color="white"
                size="lg"
                type={showPassConf ? "text" : "password"}
                placeholder="Confirm password"
                _placeholder={{ color: "white" }}
                focusBorderColor="purple.700"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleShowPassConfClick}
                  _hover={{
                    bg: "var(--button-hover-color)",
                  }}
                >
                  {showPassConf ? (
                    <Image src="./eye_open.svg" width={5} alt="eye" />
                  ) : (
                    <Image src="./eye_close.svg" width={5} alt="eye" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex gap={5} justifyContent={"center"} direction={"row"}>
              <Text fontSize={17} color="white">
                You already have an account?
              </Text>
              <Button
                h="1.75rem"
                size="sm"
                _hover={{
                  bg: "var(--button-hover-color)",
                }}
                onClick={goToLogin}
              >
                Go to Log in
              </Button>
            </Flex>
            {signUpButton}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
