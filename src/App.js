import { H1, SearchBtn, SelectBox } from "./components/atoms";

const App = () => {
  const items = [{name: "구미시", value: 1234}, {name: "경산시", value: 1235}, {name: "고령시", value: 1233}];
    return (
      <>
      asdf
      <H1>asdf</H1>
      <SearchBtn/>
      <SelectBox 
      label="시/군/구 선택"
      items={items}/>
      </>
    );
}

export default App;
