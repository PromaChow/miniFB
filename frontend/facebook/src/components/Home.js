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
import axios from "axios";
import {
  format_time,
  addStatus,
  getStatus,
  getBase64,
  addStory,
  getStory,
} from "../helperFiles/helperFunctions";
import { FormLabel } from "@mui/material";
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
  const [ind, setInd] = useState([]);
  const [img, setImg] = useState();
  const [story, setStory] = useState([]);
  const image = "";
  //console.log(data);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  var arr = [];

  const handleChange = useCallback((e) => {
    console.log("Changed value to: ", e.target.value);
    setStat(e.target.value);
  }, []);

  const onImageChange = useCallback(async (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0].name);
    const formData2 = new FormData();
    console.log("hello");

    const dataa = {
      id: id,
      name: name,
      time: String(Date.now()),
    };
    // console.log("img", img.name);
    formData2.append("filesss", e.target.files[0]);

    const headers = {
      "Content-Type": e.target.files[0].type,
      authorization: String(Cookies.get("token")),
    };

    await axios
      .post("http://10.100.104.49:8080/stories", formData2, {
        headers: {
          Authorization: String(Cookies.get("token")),
          "Content-Type": e.target.files[0].type,
        },
      })
      .then(async function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, []);
  const pullStatus = () => {
    getStatus(Cookies.get("token")).then((dat) => {
      arr = [];
      arr = dat["data"]["list"];
      console.log(arr);
      console.log("data", arr.length);
      add_status(arr);
    });
  };
  const pullStory = () => {
    getStory(String(Cookies.get("token"))).then((dat) => {
      arr = [];
      arr = dat["data"]["list"];
      console.log(arr);
      console.log("data_1", arr.length);
      add_story();
    });
  };

  var indents = [];
  useEffect(() => {
    console.log("doc", document.cookie);
    console.log("hello world");
    console.log("cookies", Cookies.get("id"));
    setName(Cookies.get("username"));
    setId(Cookies.get("id"));
    indents = [];

    pullStatus();
    pullStory();
  }, []);

  const add_status = () => {
    console.log(arr.length);

    indents = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      console.log("id", id);
      if (arr[i]["id"] === Cookies.get("id")) continue;
      else if (indents.length === 10) break;
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

  const add_story = () => {
    console.log(arr.length);
    indents = [];
    console.log("inside");
    for (var i = arr.length - 1; i >= 0; i--) {
      console.log("h");
      if (arr[i]["id"] === Cookies.get("id")) continue;
      else if (indents.length === 10) break;
      console.log(arr);
      const source = arr[i]["img"];

      indents.push(
        <article
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`data:image/png;base64,${source}`}
            alt="new"
            style={{
              borderRadius: "99px",
              height: "80px",
              width: "80px",
              margin: "10px",
            }}
          />
          <p style={{ color: "#FFFFFF", justifySelf: "center" }}>
            {arr[i]["name"]}
          </p>
        </article>
      );
    }
    console.log("indents", indents.length, arr.length);
    setStory(indents);
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
            addStatus(id, name, String(Date.now()), stat, Cookies.get("token"));
            //window.location.reload();
          }}
        >
          POST
        </button>
      </div>

      <div class="div-center_2">
        <form class="image-upload">
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
        </form>
        {story}
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
          height: "590px",
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
