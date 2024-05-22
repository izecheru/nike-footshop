"use client";
import { validateEmail, validatePassword } from "@/utils/DataValidation";
import { useEffect, useState } from "react";

export default function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConf, setShowPassConf] = useState(false);
  const [name, setName] = useState("");

  function handleShowPassClick() {
    setShowPass(!showPass);
  }

  function handleShowPassConfClick() {
    setShowPassConf(!showPassConf);
  }

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
