import axios from "axios";

const status = [];
export const format_time = (time) => {
  var timestamp = parseInt(time);
  var date = new Date(timestamp);
  console.log(date.getTime());

  const array = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const res =
    date.getDate() +
    " " +
    array[date.getMonth() + 1] +
    ", " +
    date.getFullYear() +
    " " +
    date.toLocaleTimeString();

  return res;
};

export const addStatus = async (id, name, time, stat, token) => {
  //status.splice(status.length, 0, stat);

  const data = {
    id: id,
    name: name,
    time: time,
    text: stat,
  };

  let res = await axios
    .post("http://127.0.0.1:2000/status", data, {
      headers: { Authorization: token },
    })
    .then((response) => {
      // alert("yes");
      // console.log("response", response);
      // Cookies.set("token", response.data.access_token);
      // Cookies.set("username", response.data.username);
      // Cookies.set("id", response.data.id);

      return response;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const addStory = async (id, name, time, form) => {
  //status.splice(status.length, 0, stat);

  const data = {
    id: id,
    name: name,
    time: time,
    file: form,
  };
  let res = await axios
    .post("http://127.0.0.1:8000/stories", form)
    .then((response) => {
      // alert("yes");
      // console.log("response", response);
      // Cookies.set("token", response.data.access_token);
      // Cookies.set("username", response.data.username);
      // Cookies.set("id", response.data.id);

      return response;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const getStatus = (token) => {
  const res = axios
    .get("http://127.0.0.1:2000/status", { headers: { Authorization: token } })
    .then((response) => {
      // alert("yes");
      // console.log("response", response);
      // Cookies.set("token", response.data.access_token);
      // Cookies.set("username", response.data.username);
      // Cookies.set("id", response.data.id);
      //  console.log(response);
      return response;
      //return response;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return res;
};

export const getStory = (token) => {
  const res = axios
    .get("http://127.0.0.1:5000/stories", { headers: { Authorization: token } })
    .then((response) => {
      // alert("yes");
      // console.log("response", response);
      // Cookies.set("token", response.data.access_token);
      // Cookies.set("username", response.data.username);
      // Cookies.set("id", response.data.id);
      //  console.log(response);
      return response;
      //return response;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return res;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
