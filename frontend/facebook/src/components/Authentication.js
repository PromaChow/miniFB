import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Authentication.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import axios from "axios";
import Cookies from "js-cookie";
import Home from "./Home";

const Authentication = React.memo(({ dummy }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useState(false);
  //console.log(dummy);

  //   const reg_email = useRef("");
  //   const reg_password = useRef("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [reg_email, setRegEmail] = useState("");
  const [reg_password, setRegPassword] = useState("");

  const onChangeEmail = useCallback(
    (e) => {
      console.log("hott");
      setRegEmail(e.target.value);
      console.log(reg_email);
    },
    [reg_email]
  );

  const onChangePassword = useCallback(
    (e) => {
      setRegPassword(e.target.value);
    },
    [reg_password]
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setCookies(true);
      console.log(token);
    }
    //animation code
    $(document).ready(function () {
      $(".login-info-box").fadeOut();
      $(".login-show").addClass("show-log-panel");

      $('input[type="radio"]').on("change", function () {
        if ($("#log-reg-show").is(":checked")) {
          $(".register-info-box").fadeIn();
          $(".login-info-box").fadeOut();

          $(".white-panel").removeClass("right-log");

          $(".login-show").addClass("show-log-panel");
          $(".register-show").removeClass("show-log-panel");
        }
        if ($("#log-login-show").is(":checked")) {
          $(".register-info-box").fadeOut();
          $(".login-info-box").fadeIn();

          $(".white-panel").addClass("right-log");
          $(".register-show").addClass("show-log-panel");
          $(".login-show").removeClass("show-log-panel");
        }
      });
    });
  }, []);
  const onLogin = async (evt) => {
    console.log("pressed");
    if (evt) {
      evt.preventDefault();
    }
    const data = {
      email: email,
      password: password,
    };
    const news = async () => {
      let res = await axios
        .post("http://127.0.0.1:8000/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          alert("yes");
          console.log("response", response);
          Cookies.set("token", response.data.access_token);
          return response;
        })
        .catch((error) => {
          console.log(error.message);
        });
      return res;
    };
    let x = await news();
    if (x) {
      window.location.reload();
    }
  };

  //   const onRegisterEmailChange = (e) => {
  //     setRegEmail(e);
  //   };

  const onRegister = (evt) => {
    evt.preventDefault();
    const data = {
      email: reg_email,
      password: reg_password,
    };
    axios
      .post("http://127.0.0.1:8000/register", data)
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (!cookies) {
    return (
      <div class="login-reg-panel">
        <div class="login-info-box">
          <h2>Have an account?</h2>
          <label id="label-register" for="log-reg-show">
            Login
          </label>
          <input
            type="radio"
            name="active-log-panel"
            id="log-reg-show"
            value="log-reg-show"
          />
        </div>

        <div class="register-info-box">
          <h2>Don't have an account?</h2>
          <label id="label-login" for="log-login-show">
            Register
          </label>
          <input
            type="radio"
            name="active-log-panel"
            value="log-login-show"
            id="log-login-show"
          />
        </div>

        <div class="white-panel">
          <div class="login-show">
            <h2>LOGIN</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="button" value="Login" onClick={onLogin} />
          </div>
          <div class="register-show">
            <h2>REGISTER</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                onChangeEmail(e);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                onChangePassword(e);
              }}
              required
            />
            <input type="password" placeholder="Confirm Password" required />
            <input type="button" value="Register" onClick={onRegister} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Home></Home>;
  }
});
export default Authentication;
