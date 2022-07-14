import axios from "axios";

var timestamp = parseInt("1657405086");
var date = new Date(timestamp);
console.log(date.getTime());

array = [
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
console.log(
  date.getFullYear() +
    "-" +
    array[date.getMonth() + 1] +
    "-" +
    date.getDate() +
    " " +
    date.toLocaleTimeString()
);
