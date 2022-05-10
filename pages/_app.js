import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../store";
import { persistGet } from "redux-persist/integration/react";
import { persistor } from "../store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <persistGet persistor={persistor}>
        <Component {...pageProps} />
      </persistGet>
    </Provider>
  );
}

export default MyApp;
