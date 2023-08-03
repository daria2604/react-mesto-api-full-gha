import React from "react";
import headerLogo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({
  email,
  onSignOut,
  isOpen,
  onMobileMenuClick,
  onClose,
  isMobile,
}) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && isOpen && (
        <div className="mobile-menu">
          <p className="mobile-menu__email">{email}</p>
          <button
            type="button"
            className="header__nav-link header__nav-button"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </div>
      )}

      <header className="header">
        <a href="#" className="header__link">
          <img src={headerLogo} alt="Логотип" className="header__logo" />
        </a>
        {location.pathname === "/sign-up" && (
          <div className={`heaver__nav ${isMobile && "header__nav_display"}`}>
            <Link to="/sign-in" className="header__nav-link">
              Войти
            </Link>
          </div>
        )}
        {location.pathname === "/sign-in" && (
          <div className={`heaver__nav ${isMobile && "header__nav_display"}`}>
            <Link to="/sign-up" className="header__nav-link">
              Регистрация
            </Link>
          </div>
        )}
        {location.pathname === "/" && (
          <div className="header__nav">
            <p className="header__email">{email}</p>
            <button
              type="button"
              className="header__nav-link header__nav-button"
              onClick={onSignOut}
            >
              Выйти
            </button>
          </div>
        )}
        {location.pathname === "/" &&
          (!isOpen ? (
            <button
              type="button"
              className="mobile-menu__button"
              onClick={onMobileMenuClick}
            />
          ) : (
            <button
              type="button"
              className="button_action_close"
              onClick={onClose}
            />
          ))}
      </header>
    </>
  );
}

export default Header;
