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
  getBase64,
  addStory,
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

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [stat, setStat] = useState("");
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [ind, setInd] = useState([]);
  const [imgURL, setImgURL] = useState();
  console.log("img", imgURL);
  //console.log(data);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const textareaRef = useRef();
  var arr = [];

  const handleChange = useCallback((e) => {
    console.log("Changed value to: ", e.target.value);
    setStat(e.target.value);
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onImageChange = useCallback(async (e) => {
    console.log(e.target.files[0]);
    var file = e.target.files[0];
    const img = await toBase64(file);
    console.log(img);
    addStory(id, name, String(Date.now()), img);
  }, []);

  var indents = [];
  useEffect(() => {
    indents = [];
    const pullStatus = () => {
      getStatus().then((dat) => {
        arr = [];
        arr = dat["data"]["list"];
        console.log(arr);
        console.log("data", arr.length);
        add_status(arr);
      });
    };
    setName(Cookies.get("username"));
    setId(Cookies.get("id"));
    pullStatus();

    //console.log(getStatus());
  }, []);

  const add_status = () => {
    console.log(arr.length);
    indents = [];
    for (var i = 0; i < arr.length; i++) {
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
                {arr[i]["name"][0]}
              </Avatar>
            }
            title={arr[i]["name"]}
            subheader={format_time(arr[i]["time"])}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {arr[i]["text"]}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    console.log("indents", indents.length, arr.length);
    setInd(indents);
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
            addStatus(id, name, String(Date.now()), stat);
            window.location.reload();
          }}
        >
          POST
        </button>
      </div>

      <div class="div-center_2">
        <div class="image-upload">
          <label for="file-input">
            <img
              src={require("./index.png")}
              alt="new"
              style={{
                borderRadius: "99px",
                height: "80px",
                width: "80px",
                margin: "10px",
              }}
            />
          </label>

          <input id="file-input" type="file" onChange={onImageChange} />
        </div>

        <img
          src="http://127.0.0.1:9000/images/test.png"
          alt="new"
          style={{
            borderRadius: "99px",
            height: "80px",
            width: "80px",
            margin: "10px",
          }}
        />
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
        {ind}
      </div>
    </div>
  );
}

export default Home;
