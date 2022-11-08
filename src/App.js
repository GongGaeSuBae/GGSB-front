import { GGSBMap, TopBar, CustomTab } from "./components/organisms";
import { Provider } from "react-redux";
import store from './redux/Store';
import reducers from './redux/Reducer';

const App = () => {
    return (
      <Provider store={store(reducers)}>
          <TopBar />
          <GGSBMap />
          <CustomTab />
      </Provider>
    );
}

export default App;
