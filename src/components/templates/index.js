import { useSelector } from "react-redux";
import { useEffect } from "react";
import { H3 } from "../atoms";
import { ColFlex } from "../molecules";
import { WaterQualityStandard, WaterQualityMainInfo, WaterPurificationInfo, 
    WaterQualityGraphSearchHanlder, WaterQualityGraph } from "../organisms";
import { useSingleWaterQuality } from "../../hooks";

const WaterQualityInfoTab = () => {
    const state = useSelector((state) => state.searchArea);
    const {singleWaterQuality} = useSingleWaterQuality(state.city, state.district);

    // useEffect(() => {

    // }, [state]);
    return (<ColFlex id="Tab1">
        { singleWaterQuality !== null
        ?
        <WaterQualityMainInfo 
        city={state.city} district={state.district}
        phVal={singleWaterQuality.phval} tbVal={singleWaterQuality.tbVal} clVal={singleWaterQuality.clVal}/>
        : <></>}
        
        <WaterQualityStandard/> 
    </ColFlex>)
}

const WaterQualityGraphTab = () => {
    const state = useSelector((state) => state.searchArea);
    const {singleWaterQuality} = useSingleWaterQuality(state.city, state.district);
    return (<ColFlex id="Tab2">
        {singleWaterQuality === null
        ?<></> 
        :<><WaterPurificationInfo city={state.city} district={state.district} wpname={singleWaterQuality.waterPurification.wname}/>    
        { singleWaterQuality.waterPurification.type === 2
        ? <H3>수질측정 가능한 정수장이 아닙니다.</H3>
        : <><WaterQualityGraphSearchHanlder wpType={singleWaterQuality.waterPurification.type}/>
        <WaterQualityGraph /></>}
        </>} 
    </ColFlex>)
}

export { WaterQualityInfoTab, WaterQualityGraphTab }