import React, { useState } from "react";
import "./login.css";
import axios from "axios";
const Login: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string>("");

  const time_to_show_login = 400;
  const time_to_hidden_login = 200;
  const time_to_show_sign_up = 100;
  const time_to_hidden_sign_up = 400;
  const time_to_hidden_all = 500;

  const change_to_login = () => {
    setActiveForm("login");
    setTimeout(() => {
      const loginForm = document.querySelector(
        ".cont_form_login"
      ) as HTMLElement;
      if (loginForm) loginForm.style.opacity = "1";
    }, time_to_show_login);
    setTimeout(() => {
      const signUpForm = document.querySelector(
        ".cont_form_sign_up"
      ) as HTMLElement;
      if (signUpForm) signUpForm.style.display = "none";
    }, time_to_hidden_login);
  };

  const change_to_sign_up = () => {
    setActiveForm("sign_up");
    setTimeout(() => {
      const signUpForm = document.querySelector(
        ".cont_form_sign_up"
      ) as HTMLElement;
      if (signUpForm) signUpForm.style.opacity = "1";
    }, time_to_show_sign_up);

    setTimeout(() => {
      const loginForm = document.querySelector(
        ".cont_form_login"
      ) as HTMLElement;
      if (loginForm) loginForm.style.display = "none";
    }, time_to_hidden_sign_up);
  };

  const hidden_login_and_sign_up = () => {
    setActiveForm("");
    const signUpForm = document.querySelector(
      ".cont_form_sign_up"
    ) as HTMLElement;
    const loginForm = document.querySelector(".cont_form_login") as HTMLElement;
    if (signUpForm) signUpForm.style.opacity = "0";
    if (loginForm) loginForm.style.opacity = "0";

    setTimeout(() => {
      if (signUpForm) signUpForm.style.display = "none";
      if (loginForm) loginForm.style.display = "none";
    }, time_to_hidden_all);
  };

  return (
    <div className="cotn_principal">
      <div className="cont_centrar">
        <div className="cont_login">
          <div className="cont_info_log_sign_up">
            <div className="col_md_login">
              <div className="cont_ba_opcitiy">
                <h2 style={{ color: "black" }}>LOGIN</h2>
                <p style={{ fontSize: 14 }}>
                  Login and find out the exiting events happening in IIT
                  Hyderabad
                </p>
                <button className="btn_login" onClick={change_to_login}>
                  LOGIN
                </button>
              </div>
            </div>
            <div className="col_md_sign_up">
              <div className="cont_ba_opcitiy">
                <h2 style={{ color: "black" }}>SIGN UP</h2>
                <p style={{ fontSize: 14 }}>
                  Sign up to stay connected with IIT Hyderabad
                </p>
                <button className="btn_sign_up" onClick={change_to_sign_up}>
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
          <div className="cont_back_info">
            <div className="cont_img_back_grey">
              <img
                src="https://analyticsindiamag.com/wp-content/uploads/2019/09/iit-hyd.jpg"
                alt=""
              />
            </div>
          </div>
          <div
            className={`cont_forms ${
              activeForm === "login"
                ? "cont_forms_active_login"
                : activeForm === "sign_up"
                ? "cont_forms_active_sign_up"
                : ""
            }`}
          >
            <div className="cont_img_back_">
              <img
                src="https://analyticsindiamag.com/wp-content/uploads/2019/09/iit-hyd.jpg"
                alt=""
              />
            </div>
            <div
              className="cont_form_login"
              style={{
                display: activeForm === "login" ? "block" : "none",
                opacity: activeForm === "login" ? "1" : "0",
              }}
            >
              <a href="#" onClick={hidden_login_and_sign_up}>
                <i className="material-icons">&#x2190;</i>
              </a>
              <h2>LOGIN</h2>
              <input
                type="email"
                name="login_mail"
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="login_password"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="btn_login"
                onClick={change_to_login}
              >
                LOGIN
              </button>
            </div>
            <div
              className="cont_form_sign_up"
              style={{
                display: activeForm === "sign_up" ? "block" : "none",
                opacity: activeForm === "sign_up" ? "1" : "0",
              }}
            >
              <a href="#" onClick={hidden_login_and_sign_up}>
                <i className="material-icons">&#x2190;</i>
              </a>
              <h2>SIGN UP</h2>
              <input
                type="email"
                name="signup_mail"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="signup_username"
                placeholder="Username"
                required
              />
              <input
                type="password"
                name="signup_password"
                placeholder="Password"
                required
              />
              <input
                type="password"
                name="signup_conform_password"
                placeholder="Confirm Password"
                required
              />
              <button
                type="submit"
                className="btn_sign_up"
                onClick={change_to_sign_up}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
