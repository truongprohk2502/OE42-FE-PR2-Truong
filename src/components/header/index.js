import React, { useEffect, useLayoutEffect, useState } from "react";
import "./style.sass";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as routePath from "../../constants/routes";

function Header(props) {
  const [language, setLanguage] = useState("vi");
  const [keyword, setKeyword] = useState("");
  const [showTopMenu, setShowTopMenu] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(true);
  const [showBottomButton, setShowBottomButton] = useState(false);

  const history = useHistory();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLanguage(localStorage.getItem("i18nextLng"));
  }, []);

  useLayoutEffect(() => {
    const resizeWindow = () => {
      const { innerWidth: width } = window;
      if (width < 576 && !showTopButton && !showBottomButton) {
        setShowTopButton(true);
        setShowBottomButton(true);
        setShowTopMenu(false);
        setShowBottomMenu(false);
      } else if (width >= 576 && showTopButton && showBottomButton) {
        setShowTopButton(false);
        setShowBottomButton(false);
        setShowTopMenu(true);
        setShowBottomMenu(true);
      }
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [showTopButton, showBottomButton]);

  const handleClick = (type) => {
    if (type === "top") {
      setShowTopMenu(!showTopMenu);
    } else {
      setShowBottomMenu(!showBottomMenu);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim().length === 0) return;
    setKeyword("");
    history.push(routePath.FILM_PAGE_PATH + "?keyword=" + keyword.trim());
  };

  const changeLanguage = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <header>
      <nav className="top-header">
        {showTopButton && (
          <button className="menu-button" onClick={() => handleClick("top")}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        {showTopMenu && (
          <ul>
            <li>
              <form onClick={handleSearch}>
                <input
                  type="text"
                  placeholder={t("header.top_header.search_placeholder")}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </li>
            <li>
              <Link to="/login">{t("header.top_header.login")}</Link>
            </li>
            <li>
              <Link to="/register">{t("header.top_header.register")}</Link>
            </li>
            <li>
              <Link to="/member-card">
                {t("header.top_header.member_card")}
              </Link>
            </li>
            <li>
              <Link to="/support">{t("header.top_header.support")}</Link>
            </li>
            <li>
              <select value={language} onChange={changeLanguage}>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        )}
      </nav>
      <section className="main-logo">
        <a href="/">
          <img
            src="http://www.lottecinemavn.com/LCHS/Image/logo_main.gif"
            alt="Lotte cinema"
          />
        </a>
      </section>
      <nav className="bottom-header">
        {showBottomButton && (
          <button className="menu-button" onClick={() => handleClick("bottom")}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        {showBottomMenu && (
          <ul>
            <li>
              <Link to="/gift">{t("header.bottom_header.gift_shop")}</Link>
            </li>
            <li>
              <Link to="/ticket">{t("header.bottom_header.buy_ticket")}</Link>
            </li>
            <li>
              <Link to="/film">{t("header.bottom_header.movie")}</Link>
            </li>
            <li>
              <Link to="/cinema">{t("header.bottom_header.cinema")}</Link>
            </li>
            <li>
              <Link to="/promotion">{t("header.bottom_header.promotion")}</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;