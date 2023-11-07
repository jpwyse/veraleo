import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : "https://veraleo-3519216c27e7.herokuapp.com/",
  timeout: 10000,
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
  headers: { "Content-Type": "application/json" },
});

export default instance;

