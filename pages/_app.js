import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../store";
import { persistGet } from "redux-persist/integration/react";
import { persistor } from "../store";
// import './SideBar.css';
import "../components/SideBar.css";


import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";


function MyApp({ Component, pageProps }) {

  //* realtime start

  const socket = io(`https://dev.aivara.in`);//* socket url
  const [newMessage, setNewMessage] = useState(false)

  // const [isRealTimeData, setIsRealTimeData] = useState(false);
  // const [realtimeData, setRealtimeData] = useState({});

  // const router = useRouter();
  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setShow(false);
  //     router.push("/")
  //   }
  // }, []);

  useEffect(() => {
    socket.on('test api', (data) => {
      console.log(data)
      setNewMessage(true)
    })

    const token = localStorage.getItem('token');

    socket.on('report data', (data) => {

      if (token) {
        console.log(data, "with token");
        setNewMessage(true);
      } else {
        console.log(data, "without token")
      }

      // setIsRealTimeData(data.flag);
      // setRealtimeData(data);
    });
  }, [socket])

  //if realtime data received and flag is true
  // if (isRealTimeData) {
  //   console.log(realtimeData, "gg");

  //   if (realtimeData.token && realtimeData.reportId) {
  //     var myHeaders = new Headers();
  //     myHeaders.append("x-api-key", "d002d6d0-500e-42a4-a6c9-c18a74b81d88");
  //     myHeaders.append("Authorization", `Bearer ${realtimeData.token}`);

  //     var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow'
  //     };

  //     fetch(`${SERVER_URL}userReportData/${realtimeData.reportId}`, requestOptions)
  //       .then(response => response.text())
  //       .then(result => {
  //         console.log(result)
  //         dispatch(setAiReportData(JSON.parse(result)))
  //         router.push("/analysis")
  //       })
  //       .catch(error => console.log('error', error));
  //   }

  // }


  // const [token, setToken] = useState(false);
  // useEffect(() => {
  //   setToken(localStorage.getItem("isloggin"));
  // }, []);
  // if (token === null) {
  //   window.location.href = "/";
  // }

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
  )}

  return (
    <Provider store={store}>
      <persistGet persistor={persistor}>
        <Component {...pageProps} />
        <Snackk />
      </persistGet>
    </Provider>
  );
}

export default MyApp;
