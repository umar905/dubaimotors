import React from 'react'
import './Footer.css'
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation()

  return (
    <>
      <footer>
        <div className="container">
          <div className="rows">
            <div className="footer-list">
              <h2 className='footer-heading'>{t("footer.footertop.h2")}</h2>
              <br />
              <div className="links-footer">
                <a href="#">{t("header.a1")}</a>
                <a href="#"> {t("header.a2")}</a>
                <a href="#">{t("header.a3")}</a>
                <a href="#"> {t("header.a4")}</a>
              </div>
            </div>
            <div className="right-side-of-footer">
                <div className="right-side">
                    <h2 className='footer-heading'>{t("footer.footertop.h22")}</h2>
                    <br />
                    <div className="linksfoot">
                    <a href="tel:998(99)009-09-09">+998(99)009-09-09</a>
                    
                    <a href="dubaimotor.uz@gmail.com" class="site-footer-link">
                            dubaimotor.uz@gmail.com
                        </a>
                    </div>
                </div>
                <div className="right-side">
                    <h2 className='footer-heading'>{t("footer.footertop.h222")}</h2>
                    <br />
                    <p className='wht-footer'>{t("footer.footertop.p")}</p>

                </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="bottom-footer  ">
            <div className="footer-bottom-list">
              <p className='wht-footer'>© 2023 dubaimotor.uz</p>
              <p className='wht-footer'>developed by: <a className='creator-link' href="https://t.me/umar_abduganiyev">Umar Abduganiyev</a></p>
            </div>
            <div className="links-footer">
                <a href="#">{t("footer.footerbottom.a1")}</a>
                <a href="#"> {t("footer.footerbottom.a2")}</a>
                <a href="#">{t("footer.footerbottom.a3")}</a>
              </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer