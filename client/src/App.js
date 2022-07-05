import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn]   = useState(false);

  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displaySignupModal, setDisplaySignupModal] = useState(false);

  const [loginFormUsername, setLoginFormUsername] = useState("");
  const [loginFormPassword, setLoginFormPassword] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");

  //Change app state
  function handleLogin(e) {
    e.preventDefault();
    console.log("Logging in with...")
    console.log(loginFormUsername + ", " + loginFormPassword);

    fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginFormUsername,
        password: loginFormPassword
      })
    })
      .then(res => {
        console.log(res);

        if (res.ok) {
          res.json().then((json) => {
            console.log(json);
            setCurrentUser(json);
            setIsLoggedIn(true);
            setLoginErrorText("");
          })
        } else {
          res.json().then((json) => {
            console.log(json);
            //console.error("Error:", json.error);
            //setLoginErrorText(json.error);   
          })
        }
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    console.log("Logout pressed");
    setIsLoggedIn(false);
  }


  //Display features on page
  function handleOpenLogin(e) {
    e.preventDefault();
    console.log("Display Login pressed");
    setDisplayLoginModal(true);
    setIsLoggedIn(true);
  }

  function handleOpenSignup(e) {
    e.preventDefault();
    console.log("Display Signup pressed");
  }

  function handleChangeLoginUsername(e) {
    setLoginFormUsername(e.target.value);
  }

  function handleChangeLoginPassword(e) {
    setLoginFormPassword(e.target.value);
  }

  return (
    <BrowserRouter>
        <div className="App">

          <Dialog open={displayLoginModal} onClose={() => setDisplayLoginModal(false)} >
              <DialogTitle>Log in</DialogTitle>
              <DialogContent>
                <TextField autoFocus fullWidth label="Username" type="text" variant="standard" value={loginFormUsername} onChange={handleChangeLoginUsername}/>
                <TextField fullWidth label="Password" type="password" variant="standard" value={loginFormPassword} onChange={handleChangeLoginPassword}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLogin}>Log in</Button>
              </DialogActions>
          </Dialog>

          <Header currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  handleOpenLogin={handleOpenLogin}
                  handleOpenSignup={handleOpenSignup}
                  handleLogout={handleLogout}/>
          {/* <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="user">
              <Route path=":id" element={<UserProfile/>}/>
            </Route>
            <Route path="wikiblog">
              <Route path=":id">
                <Route path="/" element={<Wikiblog/>}/>
                <Route path="edit" element={<EditWikiblog/>}/>
              </Route>
            </Route>
          </Routes> */}
        </div>
    </BrowserRouter>
  );
}

export default App;
