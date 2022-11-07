import { H1, Span, P, SelectBox, SearchBtn } from "../atoms";
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
    cityItem.push({name: '시/군/구', value: ''})
    cities.map((c) => cityItem.push({name: c, value: c}));
    
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const SubSearch = () => {
        const { districts } = useDistricts(state.city);
        const districtItem = [];
        districtItem.push({name: '읍/면/동', value: ''})
        districts.map((d) => districtItem.push({name: d, value: d}));

        useEffect(() => { console.log(state)});
        return (<>
        <SelectBox 
        label="읍/면/동" 
        items={districtItem}
        eventHandler={e => 
            dispatch(Action.dispatchSearchDistrict(e.currentTarget.value))
        }></SelectBox>
        </>);
    }

    return (
    <ColFlex id="SearchArea">
        <h5>💧수질이 궁금한 지역을 검색해주세요</h5>
        <RowFlex id="Search">
            <SelectBox label="경상북도" items={[{name: '경상북도', value: ''}]}></SelectBox>
            <SelectBox label="시/군/구" 
            items={cityItem}
            eventHandler={e => {
                dispatch(Action.dispatchSearchCity(e.currentTarget.value));
                }}></SelectBox>
            <SubSearch />
            <SearchBtn />
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
    const [open, isOpen] = useState(false);
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
    return (<div className={open ? "TabArea" : "TabAreaClosed"}>
        <RowFlex id={open ? "TabOpened" : "TabClosed"}>
    <Container className="Tab">
        <div className="ToggleBtn" onClick={() => isOpen(!open)}>{open ? <>닫기▶</> : <>열기◀</>}</div>
        <SubTab />
        {props.children}
    </Container></RowFlex></div>);
}


export { TopBar, Tab, Search }