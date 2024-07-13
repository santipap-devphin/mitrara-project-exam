import React from 'react';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import BookCheckout from '../wrappers/BookCheckout';


const Booking = () => {
  return (
         <MainWeb>
                 <HomePage page={"จองห้องพักของคุณ"} vals="booking"  />
                 <BookCheckout />
               
         </MainWeb>
  )
}

export default Booking