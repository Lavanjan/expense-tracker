import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme/theme";
import { ExpensesPage } from "./pages/Expenses";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnline } from "./store/offlineSlice";
import { syncNow } from "./store/filterSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const goOnline = () => {
      dispatch(setOnline(true));
    };
    const goOffline = () => {
      dispatch(setOnline(false));
    };

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    dispatch(syncNow());
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ExpensesPage />
    </ThemeProvider>
  );
}

export default App;
