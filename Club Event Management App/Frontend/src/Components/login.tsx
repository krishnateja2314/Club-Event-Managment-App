import React, { useState } from "react";
import "./login.css";
import Alert from "./Alert";

interface props {
  onLogin: (data: string) => void;
  close: () => void;
}

const Login: React.FC<props> = ({ onLogin, close }: props) => {
  const [activeForm, setActiveForm] = useState<string>("");
  const [alertMsg, setAlertmsg] = useState("");
  const [clickStatus, changeClickstatus] = useState(false);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConformPassword, setConformPassword] = useState("");

  const change_to_login = () => {
    setActiveForm("login");
    setTimeout(() => {
      const loginForm = document.querySelector(
        ".cont_form_login"
      ) as HTMLElement;
      if (loginForm) loginForm.style.opacity = "1";
    }, 400);
    setTimeout(() => {
      const signUpForm = document.querySelector(
        ".cont_form_sign_up"
      ) as HTMLElement;
      if (signUpForm) signUpForm.style.display = "none";
    }, 200);
  };

  const change_to_sign_up = () => {
    setActiveForm("sign_up");
    setTimeout(() => {
      const signUpForm = document.querySelector(
        ".cont_form_sign_up"
      ) as HTMLElement;
      if (signUpForm) signUpForm.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      const loginForm = document.querySelector(
        ".cont_form_login"
      ) as HTMLElement;
      if (loginForm) loginForm.style.display = "none";
    }, 400);
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
    }, 500);
  };

  const validateEmail = (email_id: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email_id);
  };

  const handle_on_sign_up = () => {
    if (Email.length == 0 || Username.length == 0) {
      setAlertmsg("Error!!!   All fields required");
      changeClickstatus(true);
    } else if (!validateEmail(Email)) {
      setAlertmsg("Error!!!   Invalid Email");
      changeClickstatus(true);
    } else if (Password.length < 8) {
      setAlertmsg("Error!!!   Password should be 8 characters long");
      changeClickstatus(true);
    } else if (Password != ConformPassword) {
      setAlertmsg("Error!!!    Password did not match Conform Password");
      changeClickstatus(true);
    } else {
      const data = { Email, Username, Password };
      fetch("http://localhost:3000/user/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((Response) => Response.json())
        .then((data) => {
          setEmail("");
          setUsername("");
          setConformPassword("");
          setPassword("");
          setAlertmsg(data.status);
          changeClickstatus(true);
        });
    }
  };

  const handle_on_login = () => {
    if (Email.length == 0) {
      setAlertmsg("Error!!!   All fields required");
      changeClickstatus(true);
    } else if (!validateEmail(Email)) {
      setAlertmsg("Error!!!   Invalid Email");
      changeClickstatus(true);
    } else if (Password.length < 8) {
      setAlertmsg("Error!!!   Password should be 8 characters long");
      changeClickstatus(true);
    }
    fetch(
      `http://localhost:3000/user/auth?Email=${encodeURIComponent(
        Email
      )}&Password=${encodeURIComponent(Password)}`
    )
      .then((Response) => Response.json())
      .then((data) => {
        if (data.status != "User authenticated") {
          setAlertmsg(data.status);
          changeClickstatus(true);
        } else {
          onLogin(data.user.username);
          close();
        }
      });
  };

  function onClose() {
    changeClickstatus(false);
  }

  return (
    <div>
      {clickStatus && <Alert onClose={onClose}>{alertMsg}</Alert>}
      <div className="cotn_principal">
        <div className="cont_centrar">
          <div className="cont_login">
            <div className="cont_info_log_sign_up">
              <div className="col_md_login">
                <div className="cont_ba_opcitiy">
                  <h2>LOGIN</h2>
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
                  <h2>SIGN UP</h2>
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
                  onChange={(Event) => {
                    setEmail(Event.target.value);
                  }}
                  type="email"
                  name="login_mail"
                  placeholder="Email"
                  required
                />
                <input
                  onChange={(Event) => {
                    setPassword(Event.target.value);
                  }}
                  type="password"
                  name="login_password"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  onClick={handle_on_login}
                  className="btn_login"
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
                  onChange={(Event) => {
                    setEmail(Event.target.value);
                  }}
                  type="email"
                  name="signup_mail"
                  placeholder="Email"
                  value={Email}
                  required
                />
                <input
                  onChange={(Event) => {
                    setUsername(Event.target.value);
                  }}
                  type="text"
                  name="signup_username"
                  placeholder="Username"
                  value={Username}
                  required
                />
                <input
                  onChange={(Event) => {
                    setPassword(Event.target.value);
                  }}
                  type="password"
                  name="signup_password"
                  placeholder="Password"
                  value={Password}
                  required
                />
                <input
                  onChange={(Event) => {
                    setConformPassword(Event.target.value);
                  }}
                  type="password"
                  name="signup_conform_password"
                  placeholder="Confirm Password"
                  value={ConformPassword}
                  required
                />
                <button
                  onClick={handle_on_sign_up}
                  type="submit"
                  className="btn_sign_up"
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
