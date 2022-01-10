import { userRouter } from "./routers/user.router";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { twitRouter } from "./routers/twit.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", userRouter);
app.use("/api/v1", twitRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}......`);
});
