import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
//provider provides the necessary data from the redux
import { Provider } from "react-redux";
import store from "../store";
//accesing persistor from store
import { persistor } from "../store";

import "../components/SideBar/SideBar.css";

//unused imports might be deleted later
import { persistGet } from "redux-persist/integration/react";
import io from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";



function MyApp({ Component, pageProps }) {

  // //* realtime start

  // const socket = io(SOCKET_URL);
  // const [newMessage, setNewMessage] = useState(false)


  // useEffect(() => {
  //   socket.on('test api', (data) => {
  //     console.log(data)
  //     setNewMessage(true)
  //   })

  //   const token = localStorage.getItem('token');

  //   socket.on('report data', (data) => {

  //     if (token) {
  //       console.log(data, "with token");
  //       setNewMessage(true);
  //     } else {
  //       console.log(data, "without token") //test
  //     }

  //     // setIsRealTimeData(data.flag);
  //     // setRealtimeData(data);
  //   });
  // }, [socket])

  // //* realtime end

  // let messg = "AI Report Generated"

  // const Snackk = () => {
  //   return (
  //     <Stack spacing={2} sx={{ width: "100%" }}>
  //       <Snackbar
  //         open={newMessage}
  //         autoHideDuration={6000}
  //         onClose={() => setNewMessage(false)}
  //       >
  //         <Alert
  //           onClose={() => setNewMessage(false)}
  //           severity="success"
  //           sx={{ width: "100%" }}
  //         >
  //           {messg}
  //         </Alert>
  //       </Snackbar>
  //     </Stack>
  //   )
  // }

  return (
    <Provider store={store}>
      <persistGet persistor={persistor}>
        <Component {...pageProps} /* updateReport={socket} *//>
        {/* <Snackk /> */}
      </persistGet>
    </Provider>
  );
}

export default MyApp;
