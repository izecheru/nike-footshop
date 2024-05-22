export default interface IToast {
  title: string;
  description: string;
  status: "info" | "warning" | "error" | "success";
  duration: number;
  isClosable: boolean;
}
