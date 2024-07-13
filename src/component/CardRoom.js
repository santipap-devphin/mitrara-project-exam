import React , {useState , useContext} from 'react';
import DataContext from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import WifiIcon from '@mui/icons-material/Wifi';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PoolIcon from '@mui/icons-material/Pool';
import SpaIcon from '@mui/icons-material/Spa';
import Modal from './Modal';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";


const CardRoom = ({dataroomtype , titlepage}) => {

    const {setListBooking} = useContext(DataContext);
    const [openB , setOpenB] = useState(false);
    let navicate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    
    localStorage.setItem("hotelID" , dataroomtype.rhotelID);
    
    const handleExpandClick = () => {
        //nsole.log(expanded)
        setExpanded(!expanded);
      };
    const goToUrl = (e , id) => {
    
        e.preventDefault();
        navicate(`/room-hotel/${titlepage}/`+id)
    }
    const bookChk = (hotelid , roomtypeid , roomnametype , price) => {

        let objs = {};

        objs = JSON.parse(localStorage.getItem("booking"));
        objs["hotelID"] = hotelid;
        objs["roomtype"] = roomtypeid;
        objs["roomnametype"] = roomnametype;
        objs["hprice"] = price;

        setListBooking(objs);

        localStorage.setItem("booking" , JSON.stringify(objs));
        setOpenB(true)

        setTimeout(() => {

            setOpenB(false)
            
        }, 1000);

        setTimeout(() => {

            navicate("/booking");
            
        }, 1300);
     }

   return (<>
    <Card sx={{ boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , 
            '&:hover': {
                backgroundColor: '#fff',
                border: 0.3 , 
                borderStyle:"ridge",
                cursor:"pointer",
                transform: 'scale(1.05)'
                                                    
              },}}>
             <Box
                sx={{
                    display:"flex",
                    position:"absolute",
                    right:1,
                    zIndex:9
                    
             }}
            >
             </Box>
            <CardMedia
            component="img"
            height="200"
            image={`../../images/${dataroomtype.imgthumb}`}
            alt={""}
            />
             <CardContent>
                <Typography variant='h5' sx={{p:0.5,color:"#006f70"}}> {dataroomtype.roomname} ({dataroomtype.roomnameen}) </Typography>
                <Typography sx={{p:0.5}} paragraph> {dataroomtype.roomrecommend.substring(0,150)+ "....." } </Typography>
                
                
                <Typography sx={{p:0.5 , color:"red"}}>เหมาะสำหรับผู้เข้าพัก {dataroomtype.sizeadults} ท่าน /ขนาดห้อง {dataroomtype.sizeroom} ตารางเมตร </Typography>
                
             </CardContent>
             <Grid container spacing={2} sx={{ml:"5px",mr:"5px" , mb:"5px"}}>
                 <Grid item="true" md={8}>
                     <Typography variant='h6'>ราคา(ต่อ 1 คืน) หน่วย บาท</Typography>
                </Grid>
                <Grid item="true" md={4} sx={{textAlign:"right"}}>
                    <Chip label={dataroomtype.hprice !== null || undefined ? dataroomtype.hprice : "ไม่ทราบราคา"} color="warning" style={{fontSize:18}} /> 
                    
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mt:1 ,mb:1, pl:1  , background:"#f5f5f5"}} >
                                                        <Grid item="true" md={6} sx={{mt:0.8}}>
                                                            <Button 
                                                                variant='outlined' 
                                                                onClick={(e) => goToUrl(e , dataroomtype.typeID)}
                                                                >
                                                                <Typography><FaInfoCircle style={{fontSize:14 , marginRight:5}} />  เพิ่มเติม</Typography>
                                                               
                                                            </Button>
                                                        </Grid>
                                                        <Grid item="true" md={6} sx={{mt:0.8 , textAlign:"right"}}>
                                                            <Button 
                                                                variant='contained' 
                                                                sx={{mb:1,mr:1 , background:"#eea412"}}
                                                                onClick={() => bookChk(dataroomtype.rhotelID,dataroomtype.typeID , dataroomtype.roomname , dataroomtype.hprice) }
                                                                 >

                                                                    <IoIosCheckmarkCircle style={{fontSize:14 , marginRight:5}} /> จองเลย
                                                                
                                                            </Button>
                                                        </Grid>
                                                                    
                                                    </Grid>
          
            
            <Grid container spacing={2} sx={{ml:"5px",mr:"5px" , mb:"5px"}}>
                <Grid item="true" md={8}>
                    <Stack  spacing={2} direction="row">
                        <WifiIcon />
                        <LocalDiningIcon />
                        <PoolIcon />
                        <SpaIcon />
                    </Stack>
                </Grid>
                 <Grid item="true" md={4}>
                    <ExpandMoreIcon
                        expand={expanded.toString()}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{float:"right"}}
                    />
                </Grid>
            </Grid>
           
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3  , pb:3}}>
            <Divider>
                <Chip label="สิ่งอำนวยความสะดวก" sx={{fontSize:18}} />
            </Divider>

                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Typography variant='h6' sx={{textAlign:"left"}}>ไวไฟ</Typography>
                                    <CheckCircleIcon sx={{color:"green"}}/>
                                </Stack>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Typography variant='h6' sx={{textAlign:"left"}}>ที่จอดรถ</Typography>
                                    <CheckCircleIcon sx={{color:"green"}}/>
                                </Stack>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Typography variant='h6' sx={{textAlign:"left"}}>อาหารและเครื่องดื่ม</Typography>
                                    <CheckCircleIcon sx={{color:"green"}}/>
                                </Stack>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <Typography variant='h6' sx={{textAlign:"left"}}>สะว่ายน้ำ</Typography>
                                    <CheckCircleIcon sx={{color:"green"}}/>
                                </Stack>
            </Box>
            </Collapse>
            </Card>
            <Modal open={openB} setOpen={setOpenB} />
            </>
  )
}

export default CardRoom