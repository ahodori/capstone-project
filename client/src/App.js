import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import WikiblogPage from "./components/WikiblogPage";
import WikiblogEdit from "./components/WikiblogEdit";
import Homepage from "./components/Homepage";
import NewWikiblog from "./components/NewWikiblog";
import WikiblogPageEdit from "./components/WikiblogPageEdit";
import UserProfile from "./components/UserProfile";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn]   = useState(false);

  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displaySignupModal, setDisplaySignupModal] = useState(false);
  const [displayNewWikiblogModal, setDisplayNewWikiblogModal] = useState(false);

  const [loginFormUsername, setLoginFormUsername] = useState("");
  const [loginFormPassword, setLoginFormPassword] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");

  const [signupFormUsername, setSignupFormUsername] = useState("");
  const [signupFormPassword, setSignupFormPassword] = useState("");
  const [signupFormPasswordConfirmation, setSignupFormPasswordConfirmation] = useState("");

  const [newWikiblogFormName, setNewWikiblogFormName] = useState("");
  const [newWikiblogErrorText, setNewWikiblogErrorText] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
    .then(res => {
      if (res.ok) {
        res.json().then((json) => {
          setCurrentUser(json);
          setIsLoggedIn(true);
        });
      }
    })
  }, [])

  //Change app state
  function handleLogin(e) {
    e.preventDefault();

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
        if (res.ok) {
          res.json().then((json) => {
            setCurrentUser(json);
            setIsLoggedIn(true);
            setDisplayLoginModal(false);
            setLoginErrorText("");
            setLoginFormUsername("");
            setLoginFormPassword("");
          })
        } else {
          res.json().then((json) => {
            console.log(json);
            console.error("Error:", json.error);
            setLoginErrorText(json.error);
            setLoginFormPassword("");
          })
        }
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    console.log("Logout pressed");
    setIsLoggedIn(false);
  }


  //submitting signup (do not enable yet)
  function handleSignup(e) {
    e.preventDefault();
    console.log("submitting signup");
  }


  //submitting new wikiblog
  function handleSubmitNewWikiblog(e) {
    e.preventDefault();
    console.log("submitting to create new wikiblog");

    if (!isLoggedIn) {
      setNewWikiblogErrorText("You must log in to create a new Wikiblog.");
      return;
    }

    fetch("/wikiblogs", {
       method: "POST",
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        name: newWikiblogFormName,
        user_id: currentUser.id
       })
    })
    .then(res => {
      console.log(res);
      if (res.ok) {
        res.json().then((json) => {
          console.log(json);
          navigate("/wikiblog/"+json.id);
          setDisplayNewWikiblogModal(false);
          setNewWikiblogErrorText("");
          setNewWikiblogFormName("");
        })
      } else {
        res.json().then((json) => {
          console.log(json);
          setNewWikiblogErrorText(json.error);
        })
      }
    });
    
  }



  //Display features on page
  function handleOpenLogin(e) {
    e.preventDefault();
    console.log("Display Login pressed");
    setDisplayLoginModal(true);
  }

  function handleOpenSignup(e) {
    e.preventDefault();
    console.log("Display Signup pressed");
    setDisplaySignupModal(true);
  }

  function handleOpenNewWikiblog(e) {
    e.preventDefault();
    console.log("opening new wikiblog modal");
    setDisplayNewWikiblogModal(true);
  }


  return (

        <div className="App">

          <Dialog open={displayLoginModal} onClose={() => {setDisplayLoginModal(false); setLoginFormPassword(""); setLoginFormUsername("");}} >
              <DialogTitle>Log in</DialogTitle>
              <DialogContent>
                <TextField autoFocus fullWidth label="Username" type="text" variant="standard" value={loginFormUsername} onChange={(e) => setLoginFormUsername(e.target.value)}/>
                <TextField fullWidth label="Password" type="password" variant="standard" value={loginFormPassword} onChange={(e) => setLoginFormPassword(e.target.value)}/>
                {loginErrorText && <Alert severity="error">{loginErrorText}</Alert>}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLogin}>Log in</Button>
              </DialogActions>
          </Dialog>

          <Dialog open={displaySignupModal} onClose={() => setDisplaySignupModal(false)}>
            <DialogTitle>Sign up</DialogTitle>
            <DialogContent>
              <TextField autoFocus fullWidth label="Username" type="text" variant="standard" value={signupFormUsername} onChange={(e) => setSignupFormUsername(e.target.value)}/>
              <TextField fullWidth label="Password" type="password" variant="standard" value={signupFormPassword} onChange={(e) => setSignupFormPassword(e.target.value)}/>
              <TextField fullWidth label="Confirm Password" type="password" variant="standard" value={signupFormPasswordConfirmation} onChange={(e) => setSignupFormPasswordConfirmation(e.target.value)}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSignup}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={displayNewWikiblogModal} onClose={() => setDisplayNewWikiblogModal(false)}>
            <DialogTitle>New Wikiblog</DialogTitle>
            <DialogContent>
              <TextField autoFocus fullWidth label="Wikiblog Name" type="text" variant="standard" value={newWikiblogFormName} onChange={(e) => setNewWikiblogFormName(e.target.value)}/>
              {newWikiblogErrorText && <Alert severity="error">{newWikiblogErrorText}</Alert>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmitNewWikiblog}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Header currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  handleOpenLogin={handleOpenLogin}
                  handleOpenSignup={handleOpenSignup}
                  handleLogout={handleLogout}/>

          <Routes>
            <Route index element={<Homepage handleOpenNewWikiblog={handleOpenNewWikiblog}/>}/>
            <Route path="user">
              <Route path=":id" element={<UserProfile/>}/>
            </Route>
            <Route path="wikiblog">
              {/* <Route path="new" element={<NewWikiblog/>}/> */}
              <Route path=":wikiblogid">
                <Route index element={<WikiblogPage showIndex={true}/>}/>
                <Route path="edit" element={<WikiblogEdit/>}/>
                {/* <Route path="new" element={<NewWikiblogPage/>}/> */}
                <Route path=":pageid">
                  <Route path="edit" element={<WikiblogPageEdit currentUser={currentUser} isLoggedIn={isLoggedIn}/>}/>
                  <Route index element={<WikiblogPage/>}/>
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
  );
}

export default App;
