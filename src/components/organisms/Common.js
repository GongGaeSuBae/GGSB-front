import { H1, H5, Span, P, SelectBox, SearchBtn } from "../atoms";
import { ColFlex, RowFlex, RowWrapper } from "../molecules";
import { Container } from "react-bootstrap";

import { useCities, useDistricts } from "../../hooks";
import { useState } from "react";
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
    const state = useSelector((state) => state);
    console.log(state);
    
    const DistrictSearch = () => {
        const { districts } = useDistricts(state.city);
        const districtItem = [];
        districts.map((d) => districtItem.push({name: d, value: d}));

        return (<>
        <SelectBox 
        id="districtSearch"
        name="districtSearch"
        label="읍/면/동" 
        items={districtItem}
        eventHandler={e => {
            dispatch(Action.dispatchSearchDistrict(e.currentTarget.value));
            console.log(e.currentTarget.value);
        }}></SelectBox>
        </>);
    }
    
    const validate = () => state.city !== '' && state.district !== ''

    return (
    <ColFlex id="SearchArea">
        <H5>💧수질이 궁금한 지역을 검색해주세요</H5>
        <RowFlex id="Search">
            <SelectBox id="stateSearch" name="stateSearch" label="경상북도" items={[]}></SelectBox>
            <SelectBox id="citySearch" name="citySearch" label="시/군/구" 
            items={cityItem}
            eventHandler={e => {
                dispatch(Action.dispatchSearchCity(e.currentTarget.value));
                dispatch(Action.dispatchSearchDistrict(''));
            }}></SelectBox>
            <DistrictSearch />
            <SearchBtn
            eventHandler={e => {
                if(validate()) 
                    dispatch(Action.tabOpened());
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

const Tab = (props) => {
    const tabState = useSelector((state) => state.tabOpened);
    const dispatch = useDispatch();
    
    useEffect(() => {}, [tabState]);
    const SubTab = () => {
        return (
        <RowFlex id="SubTab">
            <RowFlex 
            id={props.select === 'info' ? 'open' : 'close'}
            clickHandler={() => props.handler('info')}>동네 수질</RowFlex>
            <RowFlex 
            id={props.select === 'graph' ? 'open' : 'close'}
            clickHandler={() => props.handler('graph')}>수질 추이</RowFlex>
        </RowFlex>            
        )
    }
    return (<div className={tabState ? "TabArea" : "TabAreaClosed"}>
        <RowFlex id={tabState ? "TabOpened" : "TabClosed"}>
    <Container className="Tab">
        <div className="ToggleBtn" onClick={() => dispatch(Action.tabToggle())}>{tabState ? <>닫기▶</> : <>열기◀</>}</div>
        <SubTab />
        {props.children}
    </Container></RowFlex></div>);
}


export { TopBar, Tab, Search }