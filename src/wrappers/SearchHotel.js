import React, { useState , useEffect , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from '../component/Modal';
import months from '../data/dates.json';
import endpoint from '../api/endpoint';
import FormHelperText from '@mui/material/FormHelperText';

const SearchHotel = () => {
 
    
    //const sizemini = useMediaQuery('(max-width:375px)');
    let navicate = useNavigate();
    const {setListBooking} = useContext(DataContext);
    const [locateID , setLocateID] = useState(0);
    const [locate , setLocate] = useState('');
    const [locationTh , setLocationTh] = useState([]);
    const [loadData , setLoadData] = useState(false);
    const [dataCheckin , setDateCheckIn] = useState(dayjs());
    const [numBook , setNumBook] = useState(0);
    const [dateChkOut , setDateChkOut] = useState(null);
    const [dateChkInTh , setDateChkInTh] = useState('');
    const [totalGuest , setTotalGuest] = useState(0);
    const [validNumBook , setValidaNumbook] = useState(false)
    const [validGuest , setValidGuest] = useState(false);
    const [openModal , setOpenModal] = useState(false);
    
    useEffect(() => {

      let callStatus = true;

      const reqLocate = async () => {

        try {
          const response = await endpoint.get("/getlocation");
          console.log(response.data)
          let objs = [];

          if(response.data.code === 1){
            
            if(response.data.list.length > 0){

              response.data.list.forEach(ele => {

                objs.push({labelid:ele.id , label:ele.name_th})
               
               })

              setLocationTh(objs);
            }

            setLoadData(true)


          }
        } catch (error) {
          console.error(error)
        }
  
  
      }


      if(callStatus){

        reqLocate();
      }

      return () => {

        callStatus = false;

      }


    },[])

    const convertDate = (data) => {
      var lastdate;
      if(data.indexOf("-") > -1){
  
        var spdate = data.split("-");
        var dates = spdate[2];
        var mon = spdate[1];
        //console.log(mon);
        var years = parseInt(spdate[0]) + 543;
        var last = dates +" " + months[parseInt(mon)-1].namemonth+" "+ years.toString();
  
         lastdate = last;
      }
  
      return lastdate;
   }

   const changeDatePicker = (data) => {

        
        if(data.format().indexOf("T") > -1){

           let sp_date = data.format().split("T");

           convertDate(sp_date[0])

           setDateChkInTh(convertDate(sp_date[0]));

        }
        
        setDateCheckIn(data);
    }
    
    const bookNight = (vals) => {

      var day = new Date(dataCheckin.format());
      
      var nextDay = day.getDate()+vals;

      var daychk = dataCheckin.date(nextDay).format();
      var spDay = "";
      var chkout = "";
      if(daychk.indexOf("T") >-1){

        spDay = daychk.split("T");
        chkout = convertDate(spDay[0]);


      }else{
        chkout = dataCheckin.date(nextDay).format();
      }
      
      //console.log(dataCheckin.date(nextDay).format())

      setDateChkOut(chkout)
      
      //console.log(nextDay);

      setNumBook(vals)
      setValidaNumbook(false);

    }

    const frmSearchSubmit = (e) => {

        e.preventDefault();

        let newobj = {};

        console.log(numBook);
        if(numBook === 0){

          setValidaNumbook(true)

        }if(totalGuest === 0){
           setValidGuest(true);
        }else{

          setOpenModal(true)

          newobj = {
            locationid:locateID,
            location:locate , 
            checkin : dateChkInTh === "" ? dataCheckin.format() : dateChkInTh , 
            checkout : dateChkOut , 
            night:numBook , 
            totalguest:totalGuest}


          setListBooking(newobj)


          localStorage.setItem('booking', JSON.stringify(newobj));


          setTimeout(() => {

             setOpenModal(false)

          }, 1000);

          setTimeout(() => {

           navicate("/hotels/"+ locateID);

        }, 1500);

        }
 
 }

 return (<Box sx={{ position:"relative" , zIndex:2 }}>
    <Container>
   
    {/*console.log(dataCheckin.format())*/}
         <Box
           sx={{
               mt:-9,
               p:5,
               background: "#fff",
               boxShadow: "0 15px 30px 0 rgba(0, 0, 0, 0.15)",
               mb:5
            }}
         >
            <form onSubmit={(e) => frmSearchSubmit(e)}>
            <Grid container spacing={3}>
                   <Grid item xs={12} sm={12}>
                           
                               <Typography variant='h5' sx={{ml:1.5}} >จองโรงแรมกับเรา ไม่ต้องชำระเงินก่อน</Typography>
                             
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    <Autocomplete
                           freeSolo
                           id="brand"
                           options={loadData ? locationTh : []}
                          
                           onChange={(event, value) => 

                             {
                                  if(value !== null){
                                     
                                     setLocateID(value.labelid);
                                     return setLocate(value.label)
                                  }
                             }


                           } 
                           renderInput={(params) => 
                           <TextField {...params} label="ค้นหาจากชื่อเมือง" value={locate} onChange={(e) => setLocate(e.target.value)} required/>}
                          
                   />
                  
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                    <InputLabel>เช็คอิน</InputLabel>
                      <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={dataCheckin} onChange={(values) => 
                              {
                                changeDatePicker(values);
                              }
                            } />
                        </LocalizationProvider>
                      </FormControl>
                   </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                    <InputLabel>ระยะเวลา</InputLabel>
                    <Select
                          id="numbook"
                          labelId="numbooking"
                          value={numBook}
                          label="numbooking"
                          onChange={(e) => bookNight(e.target.value)}
                          disabled={dataCheckin !== null ? false : true}
                          required
                          fullWidth
                        >
                          <MenuItem value={0}>กรุณาเลือกข้อมูล</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                        </Select>
                        <FormHelperText sx={{display:validNumBook ? "block" : "none" , color:"red"}}>กรุณาเลือก จำนวนคืนที่พัก</FormHelperText>

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                    <InputLabel>เช็คเอาท์</InputLabel>
                     <Typography variant='h6'>{dateChkOut !== null ? dateChkOut : "ไม่มีข้อมูล"}</Typography>
                     
                    

                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                    <FormControl variant="filled"  fullWidth>
                          <InputLabel sx={{fontSize:20}}>จำนวนผู้เข้าพัก</InputLabel>
                          <Select
                           labelId="total-guest"
                           value={totalGuest}
                           onChange={(e) => {

                            if(e.target.value === 0){
                              setValidGuest(true)
                            }else{
                              setValidGuest(false)
                            }

                            setTotalGuest(e.target.value)

                           }}
                           label="จำนวนผู้เข้าพัก"
                           
                           >
                           <MenuItem value={0}></MenuItem>
                           <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                         
                         </Select>
                         <FormHelperText sx={{display:validGuest ? "block" : "none" , color:"red"}}>กรุณาระบุจำนวนผู้เข้าพัก</FormHelperText>
                   </FormControl>
                

                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                           <Button type='submit' size='large' variant="contained" fullWidth 
                            sx={{
                            background: '#eea412 !important',
                            border: '2px solid #fff',
                            borderRadius:0,
                            fontSize:18,
                            '&:hover': {
                                          transition: 'all 0.3s',
                                          backgroundColor: '#fff !important',
                                          color:'#eea412',
                                          border: '2px solid #fff',
                                          cursor:"pointer",
                                         
                            },

                           }}>
                            
                            ค้นหา</Button>               
                    </Grid>
               </Grid>
               </form>
         </Box>
          <Modal open={openModal} setOpen={setOpenModal}  />
         </Container>
         </Box>
  )
}

export default SearchHotel