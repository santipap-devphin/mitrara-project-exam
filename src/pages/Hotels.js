import React , {useEffect} from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import HotelList from '../wrappers/HotelList';

const Hotels = () => {

  const {id} = useParams();

  let navicate = useNavigate();
  console.log(id.length)
 
  useEffect(() => {
 
    console.log(id)
 
   if(id === null || id === undefined){
 
     navicate("/");
 
   }
 
 
  },[id , navicate])

  return (<MainWeb>
                <HomePage page="รายการโรงแรม" vals="hotels"  />
                <HotelList />
            </MainWeb>
  )
}

export default Hotels