import React, { useEffect } from 'react';
import './App.css';
import Surf from './pages/Surf'
import Umbrella from './pages/Umbrella'
import MainPage from './pages/MainPage'
import jQuery from "jquery";
import Diving from './pages/Diving';

import {
  Route
} from "react-router-dom";

window.$ = window.jQuery = jQuery;
const $ = window.$;

function App() {

  return (
    <div className="App">
      <Route path={"/surf"} exact component={Surf} />
      <Route path={"/diving"} exact component={Diving} />
      <Route path={"/falling"} exact component={Umbrella} />
      <Route path={"/"} exact component={MainPage} />
    </div>

  );
}

export default App;
