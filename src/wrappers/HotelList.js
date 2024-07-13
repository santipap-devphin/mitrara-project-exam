import React , {useState , useEffect , useContext } from 'react';
import DataContext from '../context/DataContext';
import { useParams } from 'react-router-dom';
import {Grid , Stack , Box , Typography ,Container , Button , Chip} from "@mui/material";
import endpoint from '../api/endpoint';
import HotelRowList from './HotelRowList';
import Pagination from '@mui/material/Pagination';


const HotelList = () => {

    const {listBooking} = useContext(DataContext);
    const [listHotel , setListHotel] = useState([]);
    const [reqSuccess , setReqSuccess] = useState(false);
    
    const {id} = useParams();

    useEffect(() => {

        let callStatus = true;

        const reqHotel = async () => {
  
          try {
            const response = await endpoint.get("/gethotel/"+id);

            if(response.data.code === 1){

                if(response.data.lists.length > 0){

                    setListHotel(response.data.lists);
                    setReqSuccess(true)

                }
            }
           
           
            
          } catch (error) {
            console.error(error)
          }
    
    
        }
  
        if(callStatus){
  
            reqHotel();
        }
  
        return () => {
  
          callStatus = false;
  
        }


    },[id])

    const btnBack = () => {

         window.location = "/";
    }


  return (<Box sx={{mt:5}}>
          <Container>
         
           <Grid container>
               
                 <Grid item xs={12} md={12}>
                     <Typography variant='h6'>ค้นหาข้อเสนอพบ <Chip label= {listHotel.length} color="warning" />  รายการ</Typography>
                 </Grid>
                 <Grid item xs={12} md={12} sx={{mb:5}}>
                     <Typography variant='h6' sx={{mb:1}}>ตำแหน่งที่ลูกค้าค้นหา {listBooking !== undefined ? <Chip label={listBooking.location} color="default" /> : "ไม่มีข้อมูล" }</Typography>
                     <Typography variant='h6' sx={{mb:1}}>จำนวนวันเข้าพัก {listBooking !== undefined ? <Chip label={listBooking.night + "คน"} color="default" /> : "ไม่มีข้อมูล" }</Typography>
                     <Typography variant='h6' sx={{mb:1}}>วันเช็คอิน {listBooking !== undefined ? <Chip label={listBooking.checkin} color="default" /> : "ไม่มีข้อมูล" }</Typography>
                     <Typography variant='h6' sx={{mb:1}}>วันเช็คเอ๊าท์ {listBooking !== undefined ? <Chip label={listBooking.checkout} color="default" /> : "ไม่มีข้อมูล" }</Typography>
                 </Grid>
                
                 <Grid item xs={12} md={12}>
                  
                   {
                    reqSuccess ? 
                        listHotel.length > 0 ?
                            listHotel.map((hotel , index) => {


                                if(hotel.star.indexOf(".") >-1){
                                    
                                    let spdata = hotel.star.split(".");

                                    return <HotelRowList key={index} datahotel={hotel} ratting={parseInt(spdata[0])} half={"have"} />;

                                }else{

                                    return <HotelRowList  key={index} datahotel={hotel} ratting={parseInt(hotel.star)} half={"nohave"} />;
                                }

                                

                            }) :<Box sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , pt:2 , pl:2 , pb:2}}>
                                     <Typography variant='h6' sx={{textAlign:'left'}}>ไม่มีข้อมูล</Typography>
                                     <Button variant="contained" onClick={btnBack}>ค้นหาอีกครั้ง</Button>
                                </Box>
                           
                    : <Box sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , pt:2 , pl:2 , pb:2}}>
                            <Typography variant='h6' sx={{textAlign:'left'}}>ไม่มีข้อมูล</Typography>
                            <Button variant="contained" onClick={btnBack}>ค้นหาอีกครั้ง</Button>
                     </Box>

                   }
                    
                  <Stack spacing={2} justifyContent="center" alignItems="center" sx={{pt:3 , pb:5}}>
                        <Pagination count={1} color="primary" />
                    </Stack>   
                 </Grid>

           </Grid>
           </Container>
         
       </Box>
  )
}

export default HotelList