import Test from "./Components/test";
import Login from "./Components/login";
import axios from "axios";
import React, { useState } from "react";
/* const [userdata, changedata] = useState(""); */
var data_ = "";
fetch("http://localhost:3000/data")
  .then((Response) => Response.text())
  .then((data) => (data_ = data));
function App() {
  return (
    <>
      <Test text={data_} />
      <Login />
    </>
  );
}

export default App;
