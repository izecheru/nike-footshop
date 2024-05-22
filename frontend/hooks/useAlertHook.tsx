"use client";
import { AlertConfig } from "@/interfaces/Alert";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertStatus,
} from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";

export default function useMyAlertHook() {
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    status: "info",
    title: "",
    description: "",
    isVisible: false,
  });

  const showAlert = (
    status: AlertStatus,
    title: string,
    description: string
  ) => {
    setAlertConfig({
      status,
      title,
      description,
      isVisible: true,
    });

    // Hide the alert after 5 seconds (optional)
    setTimeout(() => {
      setAlertConfig((prev: AlertConfig) => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  const AlertContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
  `;

  const alertComponent = alertConfig.isVisible ? (
    <AlertContainer>
      <Alert status={alertConfig.status}>
        <AlertIcon />
        <AlertTitle>{alertConfig.title}</AlertTitle>
        <AlertDescription>{alertConfig.description}</AlertDescription>
      </Alert>
    </AlertContainer>
  ) : null;

  return { showAlert, alertComponent };
}
