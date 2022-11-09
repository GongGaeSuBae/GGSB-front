import { useSelector } from "react-redux";
import { ColFlex } from "../molecules";
import { WaterQualityStandard, WaterQualityMainInfo, WaterPurificationInfo, 
    WaterQualityGraphSearchHanlder, WaterQualityGraph } from "../organisms";
import { useSingleWaterQuality } from "../../hooks";

const WaterQualityInfoTab = () => {
    const state = useSelector((state) => state.searchArea);
    return (<ColFlex id="Tab1">
        <WaterQualityMainInfo 
        city={state.city} district={state.district}
        phVal={6.0} tbVal={0.632} clVal={7.32}/>
        <WaterQualityStandard/> 
    </ColFlex>)
}

const WaterQualityGraphTab = () => {
    const state = useSelector((state) => state.searchArea);
    const {singleWaterQuality} = useSingleWaterQuality(state.city, state.district);

    return (<ColFlex id="Tab2">
        {singleWaterQuality === null
        ?<></> 
        :<><WaterPurificationInfo city={state.city} district={state.district} wpname={singleWaterQuality.waterPurification.wname}/></>}
        
        <WaterQualityGraphSearchHanlder />
        <WaterQualityGraph />
    </ColFlex>)
}

export { WaterQualityInfoTab, WaterQualityGraphTab }