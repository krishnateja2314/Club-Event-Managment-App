const express = require('express')
const app = express()

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const userRouter = require("./routes/user")
app.use("/user", userRouter)

app.listen(3000)