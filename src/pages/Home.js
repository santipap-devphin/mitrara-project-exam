import React from 'react';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import SearchHotel from '../wrappers/SearchHotel';


const Home = () => {

  return (<MainWeb>
                <HomePage page="จองที่พัก" vals="Home"  />
                <SearchHotel />
                { /*<RecommendHotel />*/}
          </MainWeb>
  )
}

export default Home