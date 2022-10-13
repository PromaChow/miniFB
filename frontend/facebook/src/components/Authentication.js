import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Authentication.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import axios from "axios";
import Cookies from "js-cookie";
import Home from "./Home";
import {
  format_time,
  addStatus,
  getStatus,
} from "../helperFiles/helperFunctions";
var validator = require("validator");
const Authentication = React.memo(({ dummy }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useState(false);
  const [username, setUsername] = useState("");
  const [valid, setValid] = useState(false);
  //console.log(dummy);

  //   const reg_email = useRef("");
  //   const reg_password = useRef("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [reg_email, setRegEmail] = useState("");
  const [reg_password, setRegPassword] = useState("");
  const [data, setData] = useState("p");

  const onChangeEmail = useCallback(
    (e) => {
      if (validator.isEmail(e.target.value)) {
        console.log("yes");
        setRegEmail(e.target.value);
        setValid(true);
      } else {
        console.log("email invalid");
        setValid(false);
      }
    },
    [reg_email]
  );

  const onChangePassword = useCallback(
    (e) => {
      if (validator.isStrongPassword(e.target.value)) {
        setRegPassword(e.target.value);
        console.log("strong password");
        setValid(true);
      } else {
        console.log("weak password");
        setValid(false);
      }
    },
    [reg_password]
  );

  const onChangeUsername = useCallback(
    (e) => {
      if (e.target.value.length > 3 && e.target.value.length < 15) {
        setUsername(e.target.value);
        setValid(true);
      } else {
        console.log("username invalid");
        setValid(false);
      }
    },
    [username]
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
    if (evt) {
      evt.preventDefault();
    }
    const data = {
      email: email,
      password: password,
    };
    const news = async () => {
      let res = await axios
        .post("http://localhost:8000/auth/login", data)
        .then((response) => {
          console.log("Successful");
          console.log("response", response);
          var inFifteenMinutes = new Date(
            new Date().getTime() + 30 * 60 * 1000
          );
          Cookies.set("token", response.data.access_token, {
            expires: inFifteenMinutes,
          });
          Cookies.set("username", response.data.username, {
            expires: inFifteenMinutes,
          });
          Cookies.set("id", response.data.id, {
            expires: inFifteenMinutes,
          });

          return response;
        })
        .catch((error) => {
          console.log(error.message);
        });
      return res;
    };
    let x = await news();
    setData(x);
    if (x) {
      window.location.reload();
    }
    console.log(data);

    return x;
  };

  //   const onRegisterEmailChange = (e) => {
  //     setRegEmail(e);
  //   };

  const onRegister = (evt) => {
    evt.preventDefault();
    const data = {
      username: username,
      email: reg_email,
      password: reg_password,
    };
    if (valid) {
      axios
        .post("http://localhost:8000/auth/register", data)
        .then((response) => {
          console.log(response);
          console.log("Registration Successful");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            <input
              type="button"
              value="Login"
              onClick={async () => {
                const tok = await onLogin();
                setData(tok);
                console.log(tok);
              }}
            />
          </div>
          <div class="register-show">
            <h2>REGISTER</h2>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                onChangeUsername(e);
              }}
            />
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

            <input type="button" value="Register" onClick={onRegister} />
          </div>
        </div>
      </div>
    );
  } else {
    return <Home data={data}></Home>;
  }
});
export default Authentication;
