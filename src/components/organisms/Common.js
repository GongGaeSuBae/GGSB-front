import { H1, H5, Span, SelectBox, SearchBtn } from "../atoms";
import { ColFlex, RowFlex, RowWrapper } from "../molecules";
import { WaterQualityInfoTab, WaterQualityGraphTab } from "../templates"
import { Container, Tabs, Tab } from "react-bootstrap";

import { useCities, useDistricts, useMapInfo } from "../../hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../redux/Action";

const Logo = () => {
    return (<ColFlex id="Logo">
        <H1 className="GongGae">공개<Span>水</Span>배</H1>
    </ColFlex>);
}

const Search = () => {
    const { cities } = useCities();
    const cityItem = [];
    cities.map((c) => cityItem.push({name: c, value: c}));
    
    const dispatch = useDispatch();
    const state = useSelector((state) => state.searchArea);
    const mapState = useSelector((state) => state.mapInfo);

    const { districts, centers } = useMapInfo();

    const DistrictSearch = () => {
        const { districts } = useDistricts(state.city);
        const districtItem = [];
        districts.map((d) => districtItem.push({name: d, value: d}));

        return (<>
        <SelectBox 
        id="districtSearch"
        name="districtSearch"
        label="읍/면/동" 
        value={state.district}
        items={districtItem}
        eventHandler={e => {
            dispatch(Action.dispatchSearchDistrict(e.currentTarget.value));
            dispatch(Action.tabClosed());
        }}></SelectBox>
        </>);
    }
    
    const validate = () => state.city !== '' && state.district !== ''
    return (
        <ColFlex id="SearchArea">
            <RowFlex>
                <H5>💧수질이 궁금한 지역을 검색해주세요</H5> 
                <Span>지도에서 지역을 선택하여 검색할 시, 지역 선택 후 버튼을 클릭해주세요</Span>
            </RowFlex>
        <RowFlex id="Search">
            <SelectBox id="stateSearch" name="stateSearch" label="경상북도" items={[]}></SelectBox>
            <SelectBox id="citySearch" name="citySearch" label="시/군/구" value={state.city}
            items={cityItem}
            eventHandler={e => {
                dispatch(Action.dispatchSearchCity(e.currentTarget.value));
                dispatch(Action.dispatchSearchDistrict(''));
                dispatch(Action.tabClosed());
            }}></SelectBox>
            <DistrictSearch />
            <SearchBtn
            eventHandler={e => {
                if(validate()) {
                    dispatch(Action.tabOpened());
                    dispatch(Action.changeMapLevel(mapState.level > 9 ? mapState.level-2 : mapState.level));
                    var idx = districts.indexOf(state.district);
                    dispatch(Action.changeMapCenter(centers[idx]));
                }
                else 
                    alert('지역을 선택해주세요');
            }} />
        </RowFlex>
    </ColFlex>);
}

const TopBar = () => {
    return (<Container fluid className="TopBar">
        <RowWrapper>
            <Logo />
            <Search />
        </RowWrapper>
    </Container>)
}

const CustomTab = () => {
    const tabState = useSelector((state) => state.tabOptions);
    const locationState = useSelector((state) => state.searchArea);
    const dispatch = useDispatch();
    useEffect(() => {}, [tabState.tabOpened]);
    const SubTab = () => {
        return (
        <Tabs className="CustomSubTab"
        activeKey={tabState.tabType}
        onSelect={(k) => dispatch(Action.changeTabOption(k))}>
            <Tab eventKey="info" title="동네 수질">
                {locationState.city !== '' && locationState.district !== ''
                ?<><WaterQualityInfoTab /></>:<></>}
            </Tab>
            <Tab eventKey="graph" title="수질 추이">
                {locationState.city !== '' && locationState.district !== ''
                ?<><WaterQualityGraphTab /></>:<></>}
            </Tab>
        </Tabs>         
        )
    }
    return (<div className={tabState.tabOpened ? "TabArea" : "TabAreaClosed"}>
        <RowFlex id={tabState.tabOpened ? "TabOpened" : "TabClosed"}>
    <Container className="Tab">
        <div className="ToggleBtn" onClick={() => dispatch(Action.tabToggle())}>{tabState.tabOpened ? <>닫기▶</> : <>열기◀</>}</div>
        <SubTab />
    </Container></RowFlex></div>);
}


export { TopBar, CustomTab, Search }