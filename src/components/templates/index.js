import { P } from "../atoms";
import { ColFlex } from "../molecules";
import { Search } from "../organisms";

const SearchArea = () => {
    return (<ColFlex id="SearchArea">
        <P>수질이 궁금한 지역을 검색해주세요 ex) 경상북도 구미시 거의동</P>
        <Search />
    </ColFlex>);
}

export { SearchArea }