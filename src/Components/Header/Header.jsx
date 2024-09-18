import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [top, setTop] = useState(window.scrollY);
  const { t, i18n } = useTranslation();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const handleScroll = () => setTop(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <img
            src="https://dubaimotor.uz/images/logo.png"
            alt=""
            width={200}
            height={42}
          />
        </Link>

        <div className="nav">
          <ul className="ul">
            <a className="li" href={"#"}>
              {t("header.a1")}
            </a>
            <a className="li" href="#aboutus">
              {t("header.a2")}
            </a>
            <a className="li" href={"#cars"}>
              {t("header.a3")}
            </a>
            <a className="li" href={"#call"}>
              {t("header.a4")}
            </a>
            {localStorage.getItem("token") ? (
              <a
                className="li"
                onClick={() => {
                  localStorage.removeItem("token") || window.location.reload();
                }}
              >
                Log out
              </a>
            ) : (
              <a className="li" href="/login">
                Log in
              </a>
            )}
          </ul>
          <select onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
            <option value="kr">Korean</option>
            <option value="fr">French</option>
            <option value="sp">Spain</option>
            <option value="jp">Japanese</option>
          </select>
        </div>
        <div className="hmb">
          <h1 className="burger" onClick={toggleDrawer}>
            ☰
          </h1>
        </div>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="top"
        className="bla bla bla drw"
      >
        <h1 className="drawer-close-button" onClick={toggleDrawer}>
          x
        </h1>
        <div className="nav2">
          <ul className="ul2">
            <Link to="/">
              <img
                src="https://dubaimotor.uz/images/logo.png"
                alt=""
                width={200}
                height={42}
              />
            </Link>
            <br />
            <br />
            <a className="li2" href={"#"}>
              {t("header.a1")}
            </a>
            <a className="li2" href={"#aboutus"}>
              {t("header.a2")}
            </a>
            <a className="li2" href={"#cars"}>
              {t("header.a3")}
            </a>
            <a className="li2" href={"#call"}>
              {t("header.a4")}
            </a>
            {localStorage.getItem("token") ? (
              <a
                className="li2"
                onClick={() => {
                  localStorage.removeItem("token") || window.location.reload();
                }}
              >
                Log out
              </a>
            ) : (
              <a className="li2" href="/login">
                Log in
              </a>
            )}
          </ul>
          <select
            defaultValue="uz"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
            <option value="kr">Korean</option>
            <option value="fr">French</option>
            <option value="sp">Spain</option>
            <option value="jp">Japanese</option>
          </select>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
