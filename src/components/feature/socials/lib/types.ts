export type SocialsConfig = {
  label?: string;
  icon?: string;
  iconWhite?: string;
  href?: string;
  socialClassName?: string | { height: string; width: string } | object;
  displayOrder?: number;
  onClick?: () => void;
};
