import React, { useEffect } from 'react';
import './App.css';
import Surf from './pages/Surf'
import MainPage from './pages/MainPage'
import jQuery from "jquery";

import {
  Route
} from "react-router-dom";

window.$ = window.jQuery = jQuery;
const $ = window.$;

function App() {

  return (
    <div className="App">
      <Route path={"/surf"} component={Surf}/>
      <Route path={"/main"} component={MainPage}/>
    </div>
  );
}

export default App;
