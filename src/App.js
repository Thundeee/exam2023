import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { lightTheme, darkTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Venue from './pages/venue/Venue';
import VenueCreate from './pages/venueManagment/VenueCreate';
import VenueList from './pages/venueList/VenueList';
import VenueEdit from './pages/venueManagment/VenueEdit';
import { ThemeContext } from "./context/themeSelect";

function App() {

  const {isDarkMode} = useContext(ThemeContext);




  return (

    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />

          <Layout>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Venue/:id" element={<Venue/>} />
        <Route path="/Venue/Create" element={<VenueCreate/>} />
        <Route path="/Venue/All" element={<VenueList/>} />
        <Route path="/Venue/Edit/:id" element={<VenueEdit/>} />
        <Route path="*" element={<div>Route not found</div>} />


      </Routes>
      </Layout>
  </ThemeProvider>
  );
}

export default App;
