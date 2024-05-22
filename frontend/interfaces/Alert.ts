import { AlertStatus } from "@chakra-ui/react";

export interface AlertConfig {
  status: AlertStatus;
  title: string;
  description: string;
  isVisible: boolean;
}
