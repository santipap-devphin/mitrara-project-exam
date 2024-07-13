import React from 'react';
import {useParams } from 'react-router-dom';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import RoomList from '../wrappers/RoomList';

const HotelDetail = () => {

 const {id , slug} = useParams();

  return (<MainWeb>
                <HomePage page={slug} vals="roomlist"  />
                 
                <RoomList id={id} page={slug}/>
                
          </MainWeb>
  )
}

export default HotelDetail