import { H1, SearchBtn, SelectBox } from "./components/atoms";
import { RowWrapper, ColWrapper, RowFlex, ColFlex, RowFlexCenter, ColFlexCenter } from "./components/molecules";
import {  GGSBMap, TopBar } from "./components/organisms";
import { Container, Row, Col } from "react-bootstrap";
const App = () => {
    return (
      <>
          <TopBar />
          <GGSBMap />
      </>
    );
}

export default App;
