import { useDispatch, useSelector } from "react-redux";
import { P } from "../atoms";
import { ColFlex } from "../molecules";
import { Search, WaterQualityStandard, WaterQualityMainInfo, WaterPurificationInfo, 
    WaterQualityGraphSearchHanlder, WaterQualityGraph } from "../organisms";

const WaterQualityInfoTab = () => {
    const state = useSelector((state) => state);
    return (<ColFlex id="Tab1">
        <WaterQualityMainInfo 
        city={state.city} district={state.district}
        phVal={6.0} tbVal={0.632} clVal={7.32}/>
        <WaterQualityStandard/> 
    </ColFlex>)
}

const WaterQualityGraphTab = () => {
    const state = useSelector((state) => state);
    return (<ColFlex id="Tab2">
        <WaterPurificationInfo city={state.city} district={state.district} wpname={"[정수장명]"}/>
        <WaterQualityGraphSearchHanlder />
        <WaterQualityGraph />
    </ColFlex>)
}

export { WaterQualityInfoTab, WaterQualityGraphTab }