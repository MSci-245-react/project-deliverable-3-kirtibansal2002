import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

const App = () => {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/Search" element={<Search />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
