import React , {useState} from 'react';
import {Grid , Stack ,Typography ,Button} from "@mui/material";
import { Link , useNavigate  } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Modal from '../component/Modal';

const HotelRowList = ({datahotel , ratting , half}) => {

let navacate = useNavigate();

const [openM , setOpenM] = useState(false);

 const clkChooseRoom = (id , name) => {

   let objs =  JSON.parse(localStorage.getItem("booking"));
   objs["hotelID"] = id;
   objs["hotelName"] = name;
  
    localStorage.setItem("booking" , JSON.stringify(objs));

    setOpenM(true)

    setTimeout(() => {
    
        setOpenM(false)

    }, 1000);

    setTimeout(() => {
    
        navacate(`/hotel-detail/${name}/${id}`)

    }, 1300);

    


 }

  return (
            <>
            <Grid container spacing={{ xs: 0.5, md: 1.5 }} 
            sx={{backgroundColor:"#fff", boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , mb:5}}>
                    <Grid item xs={12} md={4} sx={{pb:1.5}}>
                        <Link to={`/hotel-detail/${datahotel.hotelName}/${datahotel.hotelID}`}>
                        <img
                                src={`../../images/hotelimg.png`}
                                alt={`imglist-${datahotel.hotelID}`}
                                width="100%"
                                loading="lazy"
                        />
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                                <Link to={`/hotel-detail/${datahotel.hotelName}/${datahotel.hotelID}`} style={{ textDecoration: 'none' , color:"#000" }}>
                                    <Typography variant='h5'>{datahotel.hotelName}</Typography>
                                </Link>
                                <Typography variant='h5' sx={{color:"#000"}}>ราคา 
                                    <span style={{marginLeft:"10px"}}>{datahotel.lowprice}</span><span style={{textDecoration:"line-through" , marginLeft:"10px" ,color:"#E81C2E"}}>{datahotel.highprice}</span></Typography>
                                <Typography variant='h6'>ตำแหน่ง {datahotel.addressTH}</Typography>
                                <Stack direction="row" sx={{color:"goldenrod"}}>

                                 {
                                    ratting === 1 ? <StarIcon /> 
                                        : ratting === 2 ? <><StarIcon /><StarIcon /></> 
                                            : ratting === 3 ? <><StarIcon /><StarIcon /><StarIcon /></> 
                                              : ratting === 4 ? <><StarIcon /><StarIcon /><StarIcon /><StarIcon /></> 
                                                : ratting === 5 ? <><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></> 
                                                    :null
                                 }
                                 {
                                    half === "have" ? <StarHalfIcon /> : null
                                 }
                                 
                                 <Typography variant='p'> ({datahotel.star + "คะแนน"})  </Typography>
                                
                                    
                                </Stack>
                                <Typography variant='p' paragraph>
                                    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                                </Typography>
                               
                                <Stack direction="row" sx={{pt:2 , pb:2}}>
                                
                                    <Button variant="contained" onClick={() => clkChooseRoom(datahotel.hotelID , datahotel.hotelName)} sx={{background:'#eea412'}}><ArrowForwardIosIcon sx={{fontSize:12}} />
                                        เลือกห้องพัก
                                    </Button>
                              
                                 
                                </Stack>
                        </Stack>
                    </Grid>
            </Grid>
            <Modal open={openM} setOpen={setOpenM} />
            </>
        
  )
}

export default HotelRowList