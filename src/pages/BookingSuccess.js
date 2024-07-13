import React from 'react';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import BookingInformation from '../wrappers/BookingInformation';

const BookingSuccess = () => {
  return (<MainWeb>
                 <HomePage page={"ขอบคุณที่จองห้องพักกับเรา"} vals="bookingsuccess"  />
                 <BookingInformation />
               
         </MainWeb>
  )
}

export default BookingSuccess