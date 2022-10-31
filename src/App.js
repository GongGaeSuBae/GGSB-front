import { H1, SearchBtn, SelectBox } from "./components/atoms";
import { RowWrapper, ColWrapper, RowFlex, ColFlex, RowFlexCenter, ColFlexCenter } from "./components/molecules";
import {  GGSBMap, TopBar, Tab } from "./components/organisms";
import { Container, Row, Col } from "react-bootstrap";
const App = () => {
    return (
      <>
          <TopBar />
          <GGSBMap />
          <Tab>ㅁㄴㅇㄻㄴㅇㄹ</Tab>
      </>
    );
}

export default App;
