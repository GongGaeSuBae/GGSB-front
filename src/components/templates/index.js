import { useDispatch, useSelector } from "react-redux";
import { P } from "../atoms";
import { ColFlex } from "../molecules";
import { Search, WaterQualityStandard, WaterQualityMainInfo, WaterPurificationInfo, 
    WaterQualityGraphSearchHanlder, WaterQualityGraph } from "../organisms";

const SearchArea = () => {
    return (<ColFlex id="SearchArea">
        <P>수질이 궁금한 지역을 검색해주세요 ex) 경상북도 구미시 거의동</P>
        <Search />
    </ColFlex>);
}

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
    return (<ColFlex id="Tab2">
        <WaterPurificationInfo />
        <WaterQualityGraphSearchHanlder />
        <WaterQualityGraph />
    </ColFlex>)
}

export { SearchArea, WaterQualityInfoTab, WaterQualityGraphTab }