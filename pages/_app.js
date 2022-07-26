import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../store";
import { persistGet } from "redux-persist/integration/react";
import { persistor } from "../store";
// import './SideBar.css';
import "../components/SideBar.css";


import io from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";

const SOCKET_URL = "https://dev.aivara.in";

function MyApp({ Component, pageProps }) {

  //* realtime start

  const socket = io(SOCKET_URL);
  const [newMessage, setNewMessage] = useState(false)

  const updateReport = useRef(1);


  useEffect(() => {
    socket.on('test api', (data) => {
      console.log(data)
      setNewMessage(true)
      updateReport.current++;
    })

    const token = localStorage.getItem('token');

    socket.on('report data', (data) => {

      if (token) {
        console.log(data, "with token");
        setNewMessage(true);
      } else {
        console.log(data, "without token") //test
      }

      // setIsRealTimeData(data.flag);
      // setRealtimeData(data);
    });
  }, [socket])

  //* realtime end

  let messg = "AI Report Generated"

  const Snackk = () => {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={newMessage}
          autoHideDuration={6000}
          onClose={() => setNewMessage(false)}
        >
          <Alert
            onClose={() => setNewMessage(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {messg}
          </Alert>
        </Snackbar>
      </Stack>
    )
  }

  return (
    <Provider store={store}>
      <persistGet persistor={persistor}>
        <Component {...pageProps} updateReport={updateReport}/>
        <Snackk />
      </persistGet>
    </Provider>
  );
}

export default MyApp;
