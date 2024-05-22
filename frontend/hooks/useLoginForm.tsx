"use client";
import { validateEmail, validatePassword } from "@/utils/DataValidation";
import { useEffect, useState } from "react";

export default function useLoginForm() {
  // fields for user registration request
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");

  // validation variables
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // variables to toggle password as *** or plain text
  const [showPass, setShowPass] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);

  function handleShowPassClick() {
    setShowPass(!showPass);
  }

  function handleShowPassConfClick() {
    setShowPassConf(!showPassConf);
  }

  // we check the validation rules each time we update the email
  // and password fields
  useEffect(() => {
    handleEmailValidation(email);
  }, [email]);

  useEffect(() => {
    handlePasswordValidation(password);
  }, [password]);

  function handleEmailValidation(email: string) {
    setIsEmailValid(validateEmail(email));
  }

  function handlePasswordValidation(password: string) {
    setIsPasswordValid(validatePassword(password));
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    isPasswordValid,
    showPass,
    setShowPass,
    handleShowPassClick,
    showPassConf,
    setShowPassConf,
    handleShowPassConfClick,
    setName,
    name,
    passwordConfirmation,
    setPasswordConfirmation,
  };
}
