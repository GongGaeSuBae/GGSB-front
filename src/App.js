import {  GGSBMap, TopBar, Tab, WaterQualityStandard } from "./components/organisms";
import { WaterQualityInfoTab, WaterQualityGraphTab } from "./components/templates";
import { useState } from "react";
import { Provider } from "react-redux";
import store from './redux/Store';
import reducers from './redux/Reducer';

const App = () => {
    const [ opt, setOpt ] = useState('info');
    return (
      <>
      <Provider store={store(reducers)}>
          <TopBar />
          <GGSBMap />
          {/* <WaterQualityStandard /> */}
          <Tab select={opt} handler={setOpt}>
            {opt === 'info' 
            ? <WaterQualityInfoTab />
            : <WaterQualityGraphTab/>}
          </Tab>
      </Provider>
      </>
    );
}

export default App;
