import React from "react";
import "./Login.css";
import { useTranslation } from "react-i18next";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  
  const navigate = useNavigate()

  const API = 'https://ntbackend.uz/api/v1/auth/login'

  const LoginForm = (e) =>{
    e.preventDefault()
    axios
      .post(API , {
        username: e.target[0].value,
        password: e.target[1].value 
      })
      .then((res)=>{
        if(res.status === 201){
          localStorage.setItem('token' , res.data.token)
          localStorage.setItem('userId' , res.data.data._id)
          console.log(res.data);
          
          navigate('/home')
          
          
        }
      }).catch((err)=>{
        alert(err)
      })
  }
  return (

    <>
      <div className="loginsection">
        <video autoPlay loop muted className="video">
          {" "}
          <source
            src="https://dubaimotor.uz/video/bugatti-divosssss.mp4"
            type="video/mp4"
          />
        </video>
        <div className="container">
          <h1>{t("Login.h1")}</h1>
          <br />
          <h3>
            {t("Login.h3")} <a href="/">{t("Login.a")}</a>
          </h3>
          <br />
          <select onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
            <option value="kr">Korean</option>
            <option value="fr">French</option>
            <option value="sp">Spain</option>
            <option value="jp">Japanese</option>
          </select>
          <br />
          <br />
          <form onSubmit={LoginForm} className="login-form">
            <input type="text" placeholder={t("Login.plec1")} />
            <input type="password" placeholder={t("Login.plec2")} />
            <button type="submit">{t("Login.button")}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
