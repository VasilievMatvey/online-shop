import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  Container,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext.js";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { FaShoppingCart } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Header = observer(() => {
  const { colorMode } = useColorMode();
  const { user, basket } = useContext(AppContext);

  return (
    <Box
      shadow={"lg"}
      as="header"
      py={2}
      bg={colorMode === "dark" ? "gray.600" : "gray.100"}
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Box as="div">
            <Flex justifyContent="center" alignItems="center">
              <NavLink to="/" className={"header-link"}>
                Магазин
              </NavLink>
            </Flex>
          </Box>
          <Box as="div">
            <Flex justifyContent="center" alignItems="center">
              <NavLink to="/catalog" className="px-2">
                <Button size="sm" colorScheme="teal">
                  Каталог
                </Button>
              </NavLink>
              {user.isAuth ? (
                <NavLink to="/user" className="px-2">
                  <Button size="sm" colorScheme="teal">
                    Личный кабинет
                  </Button>
                </NavLink>
              ) : (
                <>
                  <ButtonGroup gap="1">
                    <NavLink to="/login">
                      {" "}
                      <Button size="sm" colorScheme="teal">
                        Войти
                      </Button>
                    </NavLink>{" "}
                    <NavLink to="/signup">
                      <Button size="sm" colorScheme="teal">
                        Регистрация
                      </Button>
                    </NavLink>
                  </ButtonGroup>
                </>
              )}
              {user.isAdmin && (
                <NavLink to="/admin" className="px-2">
                  <Button size="sm" colorScheme="teal">
                    Панель управления
                  </Button>
                </NavLink>
              )}
              {user.isAuth ? (
                <NavLink to="/basket" className="px-2">
                  <Button size="sm" colorScheme="teal">
                    Корзина
                    <Icon ml={2} as={FaShoppingCart} boxSize={6} />
                    {!!basket.count && <span>({basket.count})</span>}
                  </Button>
                </NavLink>
              ) : (
                ""
              )}

              <ColorModeSwitcher />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
});

export default Header;
