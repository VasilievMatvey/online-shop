import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { YandexIcon, GoogleIcon, TwitterIcon } from "./ProviderIcons";

const providers = [
  { name: "Google", icon: <GoogleIcon />, path: "https://www.google.com" },
  { name: "Yandex", icon: <YandexIcon />, path: "https://ya.ru/" },
];

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="secondary" spacing="4">
    {providers.map(({ name, icon, path }) => (
      <Button flexGrow={1} as={"a"} href={path}>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
