import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

function App() {
  [currentUser, setCurrentUser] = useState({});
  [isLoggedIn, setIsLoggedIn]   = useState(false);



  return (
    <BrowserRouter>
        <div className="App">
          <Header/>
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
