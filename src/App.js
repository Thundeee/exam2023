import { Routes, Route } from "react-router-dom";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Venue from './pages/Venue';
import VenueCreate from './pages/VenueCreate';
import VenueList from './pages/VenueList';

function App() {
  return (

    <ThemeProvider theme={theme}>
          <Layout>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/Venue" element={<Venue/>} />
        <Route path="/Venue/Create" element={<VenueCreate/>} />
        <Route path="/Venue/All" element={<VenueList/>} />
        <Route path="*" element={<div>Route not found</div>} />


      </Routes>
      </Layout>
  </ThemeProvider>
  );
}

export default App;
