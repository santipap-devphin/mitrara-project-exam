import React from 'react';
import { useParams } from 'react-router-dom';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import RoomDetail from '../wrappers/RoomDetail';

function HotelRoom() {
  const {slug} = useParams();
  return (<MainWeb>
                 <HomePage page={slug} vals="roomdetail"  />
                 <RoomDetail />
         </MainWeb>
  )
}

export default HotelRoom