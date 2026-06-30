import cors from "cors";

import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import cookieParser from "cookie-parser";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/** 1 -entrance  */
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** 2 -sessions  */
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3, //3hours
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;

  res.locals.member = sessionInstance.member;
  next();
});
/** 3 -views  */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/** 4 -routers  */

//ssr :ejs
app.use("/admin", routerAdmin); //ssr

app.use("/", router); //middleware design pattern - SPA:REACT REST API

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});
let summaryClient = 0;
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Connection & total [${summaryClient}]`);



  socket.on("disconnect",() =>{
	summaryClient--;
	console.log(`Disconnection & total [${summaryClient}]`);
  })
});

export default server;
