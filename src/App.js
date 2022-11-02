import {  GGSBMap, TopBar, Tab } from "./components/organisms";
import { WaterQualityInfoTab, WaterQualityGraphTab } from "./components/templates";
import { useState } from "react";

const App = () => {
    const [ opt, setOpt ] = useState('info');
    return (
      <>
          <TopBar />
          <GGSBMap />
          <Tab select={opt} handler={setOpt}>
            {opt === 'info' 
            ? <WaterQualityInfoTab />
            : <WaterQualityGraphTab/>}
          </Tab>
      </>
    );
}

export default App;
