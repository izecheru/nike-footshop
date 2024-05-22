export default interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NavItems: NavItem[] = [
  {
    label: "Sign in",
    href: "#",
    children: [
      {
        label: "sign in child",
      },
    ],
  },
];
