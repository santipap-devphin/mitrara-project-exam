import React from "react";
import { DataProvider } from './context/DataContext';
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import HotelRoom from "./pages/HotelRoom";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Missing from "./pages/Missing";

import "./assets/css/style.css";

function App() {
  return (<DataProvider>
              <BrowserRouter>
              <Routes>
                 <Route path="/" exact element={<Home />}></Route>
                 <Route path="/hotels/:id" element={<Hotels />}></Route>
                 <Route path="/hotel-detail/:slug/:id" element={<HotelDetail />}></Route>
                 <Route path="/room-hotel/:slug/:id" element={<HotelRoom />}></Route>
                 <Route path="/booking" element={<Booking />}></Route>
                 <Route path="/booking-success" element={<BookingSuccess />}></Route>
                 <Route path="*" element={<Missing />} />
              </Routes>
              </BrowserRouter>
          </DataProvider>
  );
}

export default App;
