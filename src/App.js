import {  GGSBMap, TopBar, Tab } from "./components/organisms";
import { WaterQualityInfoTab, WaterQualityGraphTab } from "./components/templates";

const App = () => {
    return (
      <>
          <TopBar />
          <GGSBMap />
          <Tab><WaterQualityGraphTab/></Tab>
      </>
    );
}

export default App;
