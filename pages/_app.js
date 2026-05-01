import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/store";
import { setUser } from "../redux/slices/userSlice";
import { useEffect } from "react";

export default function AppWrapper(props) {
  return (
    <Provider store={store}>
      <InnerApp {...props} />
    </Provider>
  );
}

function InnerApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("userDetail");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
