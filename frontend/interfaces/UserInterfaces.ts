export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginProps {
  email: string;
  password: string;
}
