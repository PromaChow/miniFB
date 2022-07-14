import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./Home.css";
import Modal from "react-modal";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Textarea from "react-expanding-textarea";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { borderColor } from "@mui/system";
import Cookies from "js-cookie";
import {
  format_time,
  addStatus,
  getStatus,
} from "../helperFiles/helperFunctions";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Home({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stat, setStat] = useState("");
  console.log(data);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const textareaRef = useRef();

  const handleChange = useCallback((e) => {
    console.log("Changed value to: ", e.target.value);
    setStat(e.target.value);
  }, []);
  var indents = [];
  useEffect(() => {
    console.log("home", Cookies.get("token"));
    console.log("home", Cookies.get("id"));
    console.log(getStatus().length);
  }, []);

  const add_status = (text) => {
    console.log("t", text);
    addStatus(text);
    const status = getStatus();
    console.log(status);

    for (var i = 0; i < status.length; i++) {
      indents.push(
        <Card
          style={{
            width: "100%",
            borderTop: "9px solid black",
            borderRadius: "30px",
            marginTop: "10px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: " #c884dc" }} aria-label="recipe">
                {Cookies.get("username")[0]}
              </Avatar>
            }
            title={Cookies.get("username")}
            subheader={format_time(Date.now())}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {status[i]}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    console.log(indents.length);
  };

  return (
    <div>
      <div class="topnav">
        <div>
          <a class="active" href="#home">
            Home
          </a>
        </div>
        {/* <button
          class="logout-but"
          onClick={() => {
            Cookies.remove("token");
            window.location.reload();
          }}
        >
          logout
        </button> */}
        <div>
          <a
            class="logout-but"
            href="#"
            onClick={() => {
              Cookies.remove("token");
              window.location.reload();
            }}
          >
            Logout
          </a>
        </div>
      </div>
      <div class="div-center">
        <Textarea
          className="textarea"
          id="my-textarea"
          maxLength="3000"
          name="pet[notes]"
          onChange={handleChange}
          placeholder="What's happening?"
          class="center"
        ></Textarea>

        <button
          class="button-style"
          onClick={() => {
            add_status(stat);
            window.location.reload();
          }}
        >
          POST
        </button>
      </div>

      <div
        style={{
          /*border: "0.001px solid rgb(134, 136, 134)",*/
          //   marginTop: "100px",
          width: "100%",
          //   marginRight: "10px",
          //   overflowY: "scroll",
          //   position: "relative",

          overflowY: "scroll",
          float: "left",
          height: "760px",
          position: "relative",
          flexGrow: 1,
        }}
      >
        {/* <Card
          style={{
            width: "100%",
            borderTop: "9px solid black",
            borderRadius: "30px",
            marginTop: "10px",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: " #c884dc" }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader={Date.now()}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card> */}
        {indents}
      </div>
    </div>
  );
}

export default Home;
