import React, { useState } from "react";
import "../Login/Login.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const API = 'https://ntbackend.uz/api/v1/auth/register';

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const { age, firstName, lastName, username, password } = formData;

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("Please enter a valid age between 1 and 120.");
      return false;
    }

    if (!firstName || !lastName || !username || !password) {
      setError("All fields are required.");
      return false;
    }

    setError(''); 
    return true;
  };

  const RegisterForm = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    axios
      .post(API, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: Number(formData.age),
        username: formData.username,
        password: formData.password
      })
      .then((res) => {
        if (res.status === 204) {
          navigate('/login');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'An error occurred');
      });
  };

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
          <h1>{t("Register.h1")}</h1>
          <br />
          <h3>
            {t("Register.h3")} <a href="/login">{t("Register.a")}</a>
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
          <form onSubmit={RegisterForm} className="login-form">
            <input
              type="text"
              placeholder={t("Register.plec3")}
              name="firstName"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder={t("Register.plec4")}
              name="lastName"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder={t("Register.plec5")}
              name="age"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder={t("Login.plec1")}
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder={t("Login.plec2")}
              name="password"
              onChange={handleChange}
            />
            <button type="submit">{t("Login.button")}</button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Register;
