import { useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/login";
function App() {
  const [Username, setUsername] = useState("");
  const [closeLogin, setcloseLogin] = useState(false);
  const close = () => {
    console.log(Username);
    setcloseLogin(true);
  };

  const onLogin = (data: string) => {
    setUsername(data);
  };

  return (
    <>
      {!closeLogin && <Login onLogin={onLogin} close={close} />}
      {closeLogin && <Home>{Username}</Home>}
    </>
  );
}

export default App;
