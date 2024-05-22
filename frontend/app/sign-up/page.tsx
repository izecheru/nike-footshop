"use client";
import useLoginForm from "@/hooks/useLoginForm";
import { RegisterProps } from "@/interfaces/UserInterfaces";
import { register } from "@/requets/userRequest";
import { SignupBody, SignupContainer } from "@/style/SignupComponents";
import { NikeLogoWrapper } from "@/style/NikeLogo";
import { FailureLogin } from "@/toasts/UserToasts";
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

export default function SignUpPage() {
  const router = useRouter();
  const toast = useToast();
  const {
    setEmail,
    setPassword,
    isEmailValid,
    isPasswordValid,
    name,
    email,
    password,
    passwordConfirmation,
    handleShowPassClick,
    handleShowPassConfClick,
    showPass,
    showPassConf,
    setName,
    setPasswordConfirmation,
  } = useLoginForm();

  async function sendRegisterRequest() {
    let registerUserData: RegisterProps = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };
    await register(registerUserData)
      .then((response) => {
        if (response.status === 422) {
          // router.push("/home");
          toast(FailureLogin);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  const signUpButton =
    isEmailValid &&
    isPasswordValid &&
    passwordConfirmation === password &&
    passwordConfirmation.length > 6 &&
    name.length > 4 ? (
      <Button
        _hover={{
          bg: "cyan.100",
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
    <SignupBody>
      <NikeLogoWrapper>
        <Image
          src="./nike.svg"
          objectFit="cover"
          alt="nike-logo"
          filter="invert(1)"
          width={300}
        />
      </NikeLogoWrapper>
      <SignupContainer>
        <Stack spacing={4} width={500}>
          {/* Name */}
          <Input
            color="white"
            isInvalid={name.length <= 4}
            borderColor="green.200"
            placeholder="Your name"
            _placeholder={{ color: "white" }}
            size="lg"
            onChange={(e) => setName(e.target.value)}
          />
          {/* Email  */}
          <Input
            color="white"
            isInvalid={!isEmailValid}
            borderColor="green.200"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            _placeholder={{ color: "white" }}
            size="lg"
          />
          {/* Password */}
          <InputGroup size="md">
            <Input
              size="lg"
              color="white"
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              _placeholder={{ color: "white" }}
              isInvalid={!isPasswordValid}
              borderColor="green.200"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleShowPassClick}
                _hover={{
                  bg: "cyan.200",
                }}
              >
                {showPass ? "Hide" : "Show"}
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
              isInvalid={passwordConfirmation !== password || !isPasswordValid}
              borderColor="green.200"
              _placeholder={{ color: "white" }}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleShowPassConfClick}
                _hover={{
                  bg: "cyan.200",
                }}
              >
                {showPassConf ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Stack
            spacing={3}
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Text fontSize={17} color="white">
              You already have an account?
            </Text>
            <Button
              h="1.75rem"
              size="sm"
              _hover={{
                bg: "cyan.200",
              }}
            >
              Log in
            </Button>
          </Stack>
          {signUpButton}
        </Stack>
      </SignupContainer>
    </SignupBody>
  );
}
