
import React, {useEffect, useState , useContext } from 'react';
import DataContext from '../context/DataContext';
import { useParams ,useNavigate} from 'react-router-dom';
import {Stack  , Accordion , AccordionSummary , AccordionDetails, Chip } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import endpoint from '../api/endpoint';
import Grid from '@mui/material/Unstable_Grid2';
import Modal from '../component/Modal';


const RoomDetail = () => {
  
    const {scaleMobile , setListBooking} = useContext(DataContext);
    const [openL , setOpenL] = useState(false);
    const [roomType , setRoomType] = useState({});
    const [statusCall , setStatusCall] = useState(false);
    const {id , slug} = useParams();
    const [priceRoom , setPriceRoom] = useState(0);
    let navicate = useNavigate();

    
  
   

    useEffect(() => {

        let callTypeStatus = true;

        //console.log(slug)
    
        const reqRoomTypeDetail = async () => {
    
          try {

           const response = await endpoint.get("/gethotel/room-detail/"+id ,  {headers : {'API':  localStorage.getItem("hotelID")}});
    
           if(response.data.code === 1){
    
                  setRoomType(response.data.lists);
                  setPriceRoom(response.data.priceroom)
                  setStatusCall(true)
    
                
          }
          } catch (error) {
            console.error(error)
          }
    
    
        }
        if(callTypeStatus){
    
            reqRoomTypeDetail();
        }
    
        return () => {
    
            callTypeStatus = false;
    
        }
    
    
    },[id , slug])

    const bookCheckout = (roomtype , roomnametype) => {

     let newsObj = {};
     let hotelSid = localStorage.getItem("hotelID");
     newsObj = JSON.parse(localStorage.getItem("booking"))

     newsObj["hotelID"] = hotelSid;
     newsObj["hprice"] = priceRoom;
     newsObj["roomtype"] = roomtype;
     newsObj["roomnametype"] = roomnametype;
    
     
     setListBooking(newsObj);

     localStorage.setItem("booking" , JSON.stringify(newsObj));

     setOpenL(true)

     setTimeout(() => {
        setOpenL(false)
     }, 1000);

     setTimeout(() => {
        navicate("/booking")
     }, 1300);
     

    }

  return (<>

            {
            statusCall ?

            <Box
                sx={{
                display: 'flex'
                }}
                >
                   <Container>
                        
                    <Grid container spacing={2} sx={{p:"20px"}} >

                            <Grid item="true" sm={12} md={12} lg={12} xl={12} >
                                <Typography variant='h5'> ห้องพักแบบ {roomType.roomnameen}  {roomType.roomname}</Typography>

                            </Grid>
                        
                            <Grid id="grdmain" item="true" sm={12} md={8} lg={8} xl={8} >
                           
                                
                               <img src="../../images/roomimage.png" style={{width:'100%'}} />

                               <Typography variant='p' paragraph sx={{mt:5}}>

                                {
                                    roomType.roomrecommend
                                }
                               </Typography>

                              
                               <Stack direction="row" spacing={3}>
                                    <Typography variant={scaleMobile  ? "p" : "h4"}>ราคา</Typography>
                                    <Chip label={priceRoom}  color="info" style={{fontSize:32 , marginTop:5}} />
                                    <Typography variant={scaleMobile  ? "p" : "h4"}>บาท (ต่อ 1 คืน)</Typography>
                                  
                               </Stack>
                            
                                
                            </Grid>
                            <Grid 
                                item="true" 
                                sm={12}
                                md={4}
                                lg={4} 
                                xl={4}
                                sx={{display: { xs: 'none', md: 'block' }}}
                            >
                            
                            <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={6}
                                    sx={{background:"#fff", boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , p:2}}
                                    >
                            <Typography variant='p'>Adults : {roomType.sizeadults}</Typography>
                            <Typography variant='p'>Size : {roomType.sizeroom} m²</Typography>
                            </Stack>
                            <Stack spacing={2} 
                            sx={{background:"#F5F5F5",boxShadow: "0 0px 10px 0px rgb(0 0 0 / 10%)" , transformStyle: "preserve-3d" , p:2 , mt:1}}
                            >
                                <Typography variant='h5'>AMENITIES</Typography>
                                <ul style={{marginTop:"0px"}}>
                                      
                              
                                {
                                     roomType.amenities.length > 0 ?

                                     roomType.amenities.map((val , keys) => {

                                        return <li key={keys} style={{fontSize:18, padding:5}}>{val}</li>

                                    })

                                    :null
                                }
                                  </ul>
                                
                                
                                <Typography variant='h5'>VILLA FACILITIES</Typography>
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center' , fontSize:16 }}
                                    color="text.primary"
                                >  
                                <ul style={{marginTop:"0px"}}>
                                    {
                                        roomType.facilities.length > 0 ?
                                        roomType.facilities.map((val , keys) => {

                                            return <li key={keys} style={{fontSize:14, padding:2}}>{val}</li>
    
                                        })
                                        :null

                                    }
                                 
                                </ul>
                                </Box>
                            
                            </Stack>
                            <Stack spacing={2}>
                                <Button variant="contained" color="warning" sx={{fontSize:20}} 
                                onClick={() => bookCheckout(roomType.typeID , roomType.roomname)}>
                                    จองห้องพักนี้
                                </Button>
                            </Stack>
                            </Grid>
                    </Grid>
                    <Box 
                        className="footer-room"
                        sx={{display: { xs: 'block', md: 'none' }}}
                    >
                  
                    <Accordion sx={{mt:2 , mb:2}}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{background:"#f7f5ef"}}
                                >
                                <Typography>AMENITIES</Typography>
                                </AccordionSummary>
                                    <AccordionDetails sx={{background:"#F5F5F5"}}>
                                            <Box>
                                            <ul style={{marginTop:"0px"}}>
                                                         

                                                         {
                                                                roomType.amenities.length > 0 ?

                                                                roomType.amenities.map((val , keys) => {

                                                                    return <li key={keys} style={{fontSize:14, padding:2}}>{val}</li>

                                                                })

                                                                :null
                                                            }
                                             </ul>
                                            </Box>
                                    </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{mt:2 , mb:3}}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                    sx={{background:"#f7f5ef"}}
                                    >
                                    <Typography>VILLA FACILITIES</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{background:"#F5F5F5"}}>
                                    <Box >
                                    <ul style={{marginTop:"10px"}}>
                                    {
                                        roomType.facilities.length > 0 ?
                                        roomType.facilities.map((val , keys) => {

                                            return <li key={keys} style={{fontSize:14, padding:2}}>{val}</li>
    
                                        })
                                        :null

                                    }
                                    </ul>
                                    </Box>
                                    </AccordionDetails>
                            </Accordion>
                  
                    
                            </Box>
                            <Modal open={openL} setOpen={setOpenL} />
                        </Container>
                </Box>
                :null
                }
            </>

        )
    }

export default RoomDetail