import express from "express";
import http from "http";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/**
  info 객체 예시
  {
    targetUrl: "https://www.master-key.co.kr/booking/bk_detail?bid=11",
    themeTitle: "연애조작단",
    targetDate: "2023-11-25",
    targetTime: "11:05",
    bookerName: "이남곤",
    bookerPhoneNumber: "01012345678",
  }
 */
