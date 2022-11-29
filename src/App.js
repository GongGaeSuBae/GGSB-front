import { GGSBMap, TopBar, CustomTab, Loading } from "./components/organisms";
import { useSelector } from "react-redux";

const App = () => {
    const loading = useSelector((state) => state.loading);
    return (
      <>
          <TopBar />
          { loading ? <Loading /> : <></>}
          <GGSBMap />
          <CustomTab />
      </>
    );
}

export default App;
