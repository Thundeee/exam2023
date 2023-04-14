import { Routes, Route } from "react-router-dom";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import logo from './Logo.svg';

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Routes>
        <Route index element={    <div className="App">
      <h1>Holidaze</h1>
      <img src={logo} alt="Holidaze Logo" />
</div>} />
      </Routes>
  </ThemeProvider>
  );
}

export default App;
