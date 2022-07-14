import axios from "axios";

const status = [];
export const format_time = (timestamp) => {
  // var timestamp = parseInt(time);
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
    date.toLocaleTimeString();

  return res;
};

export const addStatus = (stat) => {
  status.splice(status.length, 0, stat);
};

export const getStatus = () => {
  return status;
};
