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
  HStack,
  Divider,
  Text,
  useColorModeValue,
  color,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../components/OathButtonGroup.js";
import { login } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";

const Login = observer(() => {
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
    const data = await login(email, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate("/admin");
      if (user.isAuth) navigate("/user");
    }
  };

  return (
    // <Container className="d-flex justify-content-center">
    //   <Card style={{ width: "50%" }} className="p-2 mt-5 bg-light">
    //     <h3 className="m-auto">Авторизация</h3>
    //     <Form className="d-flex flex-column" onSubmit={handleSubmit}>
    //       <Form.Control
    //         name="email"
    //         className="mt-3"
    //         placeholder="Введите ваш email..."
    //       />
    //       <Form.Control
    //         name="password"
    //         className="mt-3"
    //         placeholder="Введите ваш пароль..."
    //         type="password"
    //       />
    //       <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
    //         <Button type="submit">Войти</Button>
    //         <p>
    //           Нет аккаунта?
    //           <Link to="/signup">Зарегистрирутесь!</Link>
    //         </p>
    //       </div>
    //     </Form>
    //   </Card>
    // </Container>
    <Flex>
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Войти</Heading>
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
                  Вход
                </Button>
              </Stack>
            </form>

            <Stack pt={6}>
              <Text align={"center"}>
                Нет аккаунта? <Link to={"/signup"}>Зарегистрирутесь!</Link>
              </Text>{" "}
              <Divider />
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
});

export default Login;
