import { AppContext } from "../components/AppContext.js";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  color,
} from "@chakra-ui/react";
import { signup } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";

const Signup = observer(() => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // если пользователь авторизован — ему здесь делать нечего
  useEffect(() => {
    if (user.isAdmin) navigate("/admin", { replace: true });
    if (user.isAuth) navigate("/user", { replace: true });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const data = await signup(email, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate("/admin");
      if (user.isAuth) navigate("/user");
    }
  };

  return (
    <Flex>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Зарегистрируйтесь</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Введите ваш email..."
                  name="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Введите ваш пароль..."
                />
              </FormControl>{" "}
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  type="submit"
                  bg={"teal"}
                  color={"white"}
                  _hover={{
                    bg: "teal.400",
                  }}
                >
                  Регистрация
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              <Text align={"center"}>
                Уже зарегистрированы? <Link to={"/login"}>Войти</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});

export default Signup;
