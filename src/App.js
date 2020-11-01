import React, { useEffect } from 'react';
import './App.css';

import Surf from './pages/Surf'
import Falling from './pages/Falling'
import MainPage from './pages/MainPage'
import CalmBeforeStorm from './pages/CalmBeforeStorm'
import Shadows from './pages/Shadows'
import Diving from './pages/Diving'
import LastPage from './pages/LastPage'

import jQuery from "jquery";

import {
  Route
} from "react-router-dom";

window.$ = window.jQuery = jQuery;
const $ = window.$;

function App() {

  return (
    <div className="App">
      <div className="body">
        <Route path={"/last"} exact component={LastPage} />           {/** 6 */}
        <Route path={"/surf"} exact component={Surf} />           {/** 6 */}
        <Route path={"/shadows"} exact component={Shadows} />     {/** 5 */}
        <Route path={"/calm"} exact component={CalmBeforeStorm} />{/** 4 */}
        <Route path={"/diving"} exact component={Diving} />       {/** 3 */}
        <Route path={"/falling"} exact component={Falling} />     {/** 2 */}
        <Route path={"/"} exact component={MainPage} />           {/** 1 */}
      </div>
    </div>

  );
}

export default App;
