import React , {useContext , useState , useEffect} from 'react';
import endpoint from '../api/endpoint';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RoomIcon from '@mui/icons-material/Room';
import ArticleIcon from '@mui/icons-material/Article';
import PaidIcon from '@mui/icons-material/Paid';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DataContext from '../context/DataContext';
import ModalPayment from '../component/ModalPayment';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../component/Modal';

const BookCheckout = () => {

  const {scaleMobile , listBooking , setListBooking} = useContext(DataContext);
  let navicate = useNavigate();
  const [nameGuest , setNameGuest] = useState('');
  const [emailGuest , setEmailGuest] = useState('');
  const [telGuest , setTelGuest] = useState('');
  const [openLoading , setOpenLoading] = useState(false);
  const [openPayment , setOpenPayment] = useState(false);
  const [payment , setPayment] = useState(1);
  const [listPayment , setListPayment]= useState([]);
  const [statusSubmit , setStatusSubmit] = useState(false);

  
  const [statusPayment , setStatusPayment] = useState(false);
  
   const sumRoom = (price , night) => {

    const pricehotel = parseInt(price);
    const tnight = parseInt(night);

    return pricehotel * tnight


   }

    useEffect(() => {

        let callPaymentStatus = true;

         const reqPaymentDetail = async () => {
    
          try {

           const response = await endpoint.get("/getpayments");
           if(response.data.code === 1){
    
            setListPayment(response.data.lists);

            setStatusPayment(true)
    
                
          }
          } catch (error) {
            console.error(error)
          }
    
    
        }
        if(callPaymentStatus){
    
            reqPaymentDetail();
        }
    
        return () => {
    
            callPaymentStatus = false;
    
        }
    
    
    },[payment])

   const sumVat = (price , night) => {

    const pricehotel = parseInt(price);
    const tnight = parseInt(night);
    const totalroom = pricehotel * tnight;
    const vat = (totalroom * 7) / 100;

    return vat;


   }

  const bookingHotel = async(e) => {

    e.preventDefault();

    if (e.target.checkValidity()) {
      
        const paymentDetail = listPayment.find((ele) => parseInt(ele.paymentID) === payment);

        let newObjs = {};
        newObjs = listBooking;
        newObjs["bookingID"] = Date.now();
        newObjs["nameguest"] = nameGuest;
        newObjs["emailguest"] = emailGuest;
        newObjs["telguest"] = telGuest;
        newObjs["payment"] = paymentDetail;
        newObjs["sumroom"] = sumRoom(newObjs.hprice , newObjs.night);
        newObjs["vat"] = sumVat(newObjs.hprice , newObjs.night);
        newObjs["totalbook"] = sumRoom(newObjs.hprice , newObjs.night) + sumVat(newObjs.hprice , newObjs.night);
      
        setListBooking(newObjs);

        localStorage.setItem("booking" , JSON.stringify(newObjs));

        
        try {

            const response = await endpoint.post("/booking"  , newObjs, {delay: 500});
           
            if(response.data.code === 1){

                 setOpenLoading(true);

                 setTimeout(() => {

                    setOpenLoading(false);
                    
                 }, 1500);

                  setTimeout(() => {

                    navicate("/booking-success")
                    
                }, 1500);

            }

        } catch (error) {
             console.error(error)
        }
     } else {


        alert("กรุณากรอกข้อมูลให้ครบถ้วน.");


      }

  }

  const openModalPayment = () => {

    setStatusSubmit(false);
    setOpenPayment(true);
  }
  const closeModal = () => {
    setOpenPayment(false);
  }

  const changePayment = (e) => {

    setPayment(e.target.value)


  }
 
  const updatePayment = (e) => {

    e.preventDefault();

    console.log(payment);
     if(payment === "" || payment.length === 0){

        alert("กรุณาเลือกข้อมูล");
        

     }else{

        alert("เปลื่ยนแปลงเรียบร้อย");

         setStatusSubmit(true);

         setTimeout(() => {
        
            setOpenPayment(false);

        }, 500);
        
     }

     

  }

  const handdleEmail = (e) => {
  setEmailGuest(e.target.value);
  }


  return (<><Container>
     <form onSubmit={(e) => bookingHotel(e)}>
    <Box sx={{backgroundColor:"#030f27", color:"#dfb163"  , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
        <Grid container>
                <Grid item xs={12} sx={{pt:1 ,pb:1}}>

                    <Stack spacing={2}>
                        <Stack direction="row">
                        <RoomIcon sx={{fontSize:32 , color:"#dfb163"}} /> <Typography variant={scaleMobile ? "p" : "h6"}>รายละเอียดการติดต่อ (สำหรับใบจองอิเล็กทรอนิกส์)</Typography>
                        </Stack>

                    </Stack>

                </Grid>
              
        </Grid>  
    </Box>
   
    <Box sx={{backgroundColor: "#ffffff" , color:"#000" , boxShadow: "1px 5px 5px 0px rgb(0 0 0 / 10%)"}}>
        
                
                <Grid container sx={{pt:2,pb:2}}>
                    <Grid item xs={12} sx={{p:1}}>
                     
                        <TextField
                        id="nameguest"
                        variant="filled"
                        label="ชื่อผู้เข้าพัก"
                        value={nameGuest}
                        onChange={(e) => setNameGuest(e.target.value) }
                        multiline
                        fullWidth
                        required
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={6} sx={{p:1}}>
                     
                        <TextField
                        id="guestemail"
                        type="email"
                        variant="filled"
                        label="อีเมล์"
                        value={emailGuest}
                        onChange={(e) => handdleEmail(e)}
                        required
                        fullWidth
                        
                        size='small'
                        />
                    </Grid>
                    <Grid item xs={6} sx={{p:1}}>
                     
                     <TextField
                     id="guesttel"
                     variant="filled"
                     label="หมายเลขโทรศัพท์"
                     value={telGuest}
                     onChange={(e) => setTelGuest(e.target.value) }
                     required
                     fullWidth
                     size='small'
                     />
                   </Grid>
                 
                
                </Grid>
    </Box>
    <Box sx={{backgroundColor:"#ffffff", color:"#000" , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
    <Grid container>
        <Grid item xs={12} md={4} sx={{p:2}}>
         <img src="../../images/roomimage.png" style={{width:"100%"}} alt="roomimage" />
        </Grid>
        <Grid item xs={12} md={8} sx={{p:2}}>

            <Stack direction="column" spacing={1}>
                <Typography variant='h6'>รายละเอียดการจอง</Typography>
                <Typography variant='p'>ชื่อโรงแรม  : {listBooking !== null || undefined ? listBooking.hotelName: "ไม่มีข้อมูล" }</Typography>
                <Typography variant='p'>เช็คอิน  : 
                    {listBooking !== null || undefined ? listBooking.checkin: "ไม่มีข้อมูล" }  | เช็คเอาท์ :{listBooking !== null || undefined ? listBooking.checkout: "ไม่มีข้อมูล" }
                </Typography> 
                <Typography variant='p'>{listBooking !== null || undefined ? listBooking.roomnametype: "ไม่มีข้อมูล" }</Typography> 
                <Typography variant='p'>{listBooking !== null || undefined ? listBooking.night: "ไม่มีข้อมูล" } คืน</Typography> 
                <Typography variant='p'>ราคาห้องพักต่อคืน : 
                    <span style={{textDecorationLine: 'line-through', color:"#000"}}> 
                        {listBooking !== null || undefined ? parseInt(listBooking.hprice) + 600: "ไม่มีข้อมูล" }</span> 
                        <span style={{color:"red",fontSize:24 , marginLeft:10, marginRight:2}}>
                         {listBooking !== null || undefined ? listBooking.hprice: "ไม่มีข้อมูล" }</span> บาท 
                </Typography> 
              

            </Stack>

         </Grid>

    </Grid>
    </Box>
    <Box sx={{backgroundColor:"#ffffff", color:"#000" , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                    <Grid container>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2}>
                                    <Stack direction="row">
                                    <ArticleIcon sx={{fontSize:32 , color:"#dfb163" , mr:1}} /> <Typography variant='h6'>โค้ดส่วนลด</Typography>
                                    </Stack>

                                </Stack>

                            </Grid> 
                          
                    </Grid>
                    <Grid container>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2} textAlign="center">
                                    <Typography>ส่วนลดห้องพัก</Typography>
                                </Stack>

                            </Grid>
                            <Grid item xs={6} textAlign="center" sx={{pt:1 , pb:1}}>
                                    <Typography>0</Typography>
                            </Grid>
                    </Grid>
            </Box>
            <Box sx={{ mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                    <Grid container sx={{backgroundColor:"#030f27"}}>
                            <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                                <Stack spacing={2} sx={{color:"#dfb163"}}>
                                    <Stack direction="row">
                                    <PaidIcon sx={{fontSize:30 , color:"#dfb163" , mr:0.3}} /> <Typography variant={scaleMobile ? "p" : "h6"}>สรุปราคาการจองห้องพักของคุณ</Typography>
                                    </Stack>

                                </Stack>

                            </Grid>
                            <Grid item xs={6} >
                                <Grid container>
                                    <Grid item xs={6} textAlign="right" sx={{mt:1.5}}>
                                        
                                         {
                                            statusPayment ? 

                                            listPayment.map((vals , keys) => {


                                                return  (parseInt(vals.paymentID) === payment) ? <Typography key={keys} variant='p' sx={{color:"#fff"}}>{vals.paymentName}</Typography> : null

                                            })

                                            :null
                                            
                                         }
                                            
                                        
                                    </Grid>
                                    <Grid item xs={6} textAlign="right" sx={{mt:0.5}}>
                                         <Button variant="outlined" color="warning" sx={{mr:1}} onClick={openModalPayment}>{scaleMobile ? "เปลื่ยน" :"เปลื่ยนช่องทางชำระ"}</Button>        
                                    </Grid>
                                </Grid>
                               
                            </Grid>
                    </Grid>
                    
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ราคา
                                           
                                            {listBooking !== null || undefined ? listBooking.roomnametype: "ไม่มีข้อมูล" } 
                                            
                                            ( {listBooking !== null || undefined ? listBooking.hprice: "ไม่มีข้อมูล" } บาท)
                                            |
                                            ({listBooking !== null || undefined ? listBooking.night: "ไม่มีข้อมูล" } คืน) 
                                            
                                            </Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>
                                        {sumRoom(listBooking.hprice , listBooking.night)}
                                        </Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ภาษีและค่าธรรมเนียม (Vat 7 %):</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>
                                        {sumVat(listBooking.hprice , listBooking.night)}
                                        </Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#ffffff" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ส่วนลด:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>{0}</Typography>
                                </Grid>
                        </Grid>
                        <Grid container sx={{backgroundColor:"#e6f4f6" , color:"#000"}}>
                                <Grid item xs={8} sx={{pt:1 ,pb:1}}>

                                    <Stack spacing={2} textAlign="center">
                                        <Typography>ราคารวมทั้งสิ้น:</Typography>
                                    </Stack>

                                </Grid>
                                <Grid item xs={4} textAlign="center" sx={{pt:1 , pb:1}}>
                                        <Typography>{ sumRoom(listBooking.hprice , listBooking.night) + sumVat(listBooking.hprice , listBooking.night)}</Typography>
                                </Grid>
                        </Grid>
            </Box>

            {
                payment === 2 && statusSubmit === true ? 

                <Box sx={{backgroundColor:"#ffffff", color:"#000" , mt:3 , boxShadow: "0px 0px 15px 0px rgb(0 0 0 / 15%)"}}>
                <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                            <Stack spacing={2}>
                                <Stack direction="row">
                                    <Typography variant='h6' sx={{pl:2}}>ช่องทางการโอนเงิน</Typography>
                                </Stack>

                            </Stack>

                        </Grid> 
                      
                </Grid>
                <Grid container>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                            <Stack spacing={2} textAlign="center">
                                <Typography>ธนาคาร</Typography>
                            </Stack>

                        </Grid>
                        <Grid item xs={6} textAlign="center" sx={{pt:1 , pb:1}}>
                                <Typography>{listPayment[1].paymentDetail[0].bankname}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                            <Stack spacing={2} textAlign="center">
                                <Typography>หมายเลขบัญชี</Typography>
                            </Stack>

                        </Grid>
                        <Grid item xs={6} textAlign="center" sx={{pt:1 , pb:1}}>
                                <Typography>{listPayment[1].paymentDetail[0].bankno}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{pt:1 ,pb:1}}>

                            <Stack spacing={2} textAlign="center">
                                <Typography>QRCODE</Typography>
                            </Stack>

                            </Grid>
                            <Grid item xs={6} textAlign="center" sx={{pt:1 , pb:1}}>
                                <img src="../../images/qrcode-exam.png" alt="qrcode" style={{width:"25%"}} />
                            </Grid>
                </Grid>
            </Box>
            :null
                
            }
           
                    <Grid container sx={{mt:1}}>
                                <Grid item xs={12} sx={{pt:1 ,pb:3}} textAlign="right">
                                            <Button type="submit" variant="contained" sx={{width:250, background:"#eea412"}}><PriceCheckIcon/> ยืนยันการจองห้องพัก</Button>
                                </Grid>
                    </Grid>
                    </form>
                 
        </Container>
        <ModalPayment open={openPayment} setOpen={setOpenPayment}>
                         <form onSubmit={updatePayment}>
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="label-payment">ข้อมูล</InputLabel>
                            <Select
                            labelId="label-payment"
                            id="payment-select"
                            value={payment}
                            label="ช่องทางชำระเงิน"
                            fullWidth
                            onChange={changePayment}
                            >
                            <MenuItem value={''}>กรุณาเลือกช่องทางชำระ</MenuItem>

                            {
                                statusPayment ? 
                                listPayment.map((ele , index) => {

                                    return <MenuItem key={index} value={ele.paymentID}>{ele.paymentName}</MenuItem>
                                })
                                :null
                            }
                       
                        
                            </Select>
                        </FormControl>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{pt:1 ,pb:3}} textAlign="left">
                                <Button type="submit" variant="contained" sx={{mt:1,background:"#eea412"}}><PriceCheckIcon/> ยืนยัน</Button>
                                <Button variant="contained" color="error" sx={{mt:1, ml:1}} onClick={closeModal}><CloseIcon/> ยกเลิก</Button>
                            </Grid>
                        </Grid>
                        </form>
                    </ModalPayment>
                    <Modal open={openLoading} setOpen={setOpenLoading}></Modal>
        </>
  )
}

export default BookCheckout