import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext.js";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const NavBar = observer(() => {
  const { user, basket } = useContext(AppContext);
  return (
    <Navbar className="header" variant="dark">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Магазин
        </NavLink>
        <Nav className="ml-auto">
          <NavLink to="/catalog" className="nav-link">
            Каталог
          </NavLink>
          {user.isAuth ? (
            <NavLink to="/user" className="nav-link">
              Личный кабинет
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Войти
              </NavLink>
              <NavLink to="/signup" className="nav-link">
                Регистрация
              </NavLink>
            </>
          )}
          {user.isAdmin && (
            <NavLink to="/admin" className="nav-link">
              Панель управления
            </NavLink>
          )}
          {user.isAuth ? (
            <NavLink to="/basket" className="nav-link">
              Корзина
              {!!basket.count && <span>({basket.count})</span>}
            </NavLink>
          ) : (
            ""
          )}
          <ColorModeSwitcher />
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
