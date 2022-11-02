import { H1, Span, P, SelectBox, SearchBtn } from "../atoms";
import { ColFlex, RowFlex, RowWrapper } from "../molecules";
import { Container } from "react-bootstrap";

import { useState } from "react";

const Logo = () => {
    return (<ColFlex id="Logo">
        <H1 className="GongGae">공개</H1>
        <H1 className="SuBae"><Span>水</Span>배</H1>
    </ColFlex>);
}

const Search = () => {
    const state = [{name: '대구광역시', value: 0}, {name: '경상북도', value: 1}];
    const city = [{name: '경산시', value: 0}, {name: '구미시', value: 1}];
    const district = [{name: '거의동', value: 0}, {name: '옥계동', value: 1}];
    return (
    <ColFlex id="SearchArea">
        <P>수질이 궁금한 지역을 검색해주세요 ex) 경상북도 구미시 거의동</P>
        <RowFlex id="Search">
            <SelectBox label="행정구역" items={state}></SelectBox>
            <SelectBox label="시/군/구" items={city}></SelectBox>
            <SelectBox label="읍/면/동" items={district}></SelectBox>
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