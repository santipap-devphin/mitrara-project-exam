import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

const RecommendHotel = () => {
  return (<Container>
                    <Stack 
                    direction="column" 
                    justifyContent="center"
                    alignItems="center"
                    sx={{mt:2,mb:5}}
                    >
                     <section className='section-title fontKanit' style={{textAlign:"center"}}>
                        <h2>ห้องพักแนะนำจากเรา</h2>
                     </section>   
                  
                   </Stack>
                <Grid container spacing={2} sx={{mb:5}}>
                            {
                                ['0' , '1' , '2' ,'3'].map((keys , items) => {

                                    return <Grid key={keys} item xs={12} sm={6} md={6} lg={3} >
                                            <Card sx={{borderBottom:"3px solid #eea412" ,  boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , 
                                                    '&:hover': {
                                                    backgroundColor: '#fff',
                                                    border: 0.3 , 
                                                    borderStyle:"ridge",
                                                    cursor:"pointer",
                                                    transform: 'scale(1.05)'
                                                    
                                                    },}}>
                                                   <CardMedia
                                                    sx={{ 
                                                        
                                                        width: '100%' ,
                                                        height:200 ,
                                                    }}
                                                    image={'../../images/thumbnailroom.png'}
                                                    title={"รูปภาพ"}
                                                    />
                                                    <Stack sx={{p:1}}>
                                                         <Typography  variant="p">
                                                           โรงแรม  AA
                                                         </Typography>
                                                         <Typography  variant="p">
                                                            <StarIcon style={{color:"#FFDC00"}} />
                                                            <StarIcon style={{color:"#FFDC00"}} />
                                                            <StarIcon style={{color:"#FFDC00"}} />
                                                            <StarIcon style={{color:"#FFDC00"}} />
                                                         </Typography>
                                                      
                                                         <Typography  variant="h6" sx={{textDecorationLine: 'line-through'}}>
                                                            7000 บาท
                                                        </Typography>
                                                        <Typography  variant="h6" sx={{color:"#eea412"}}>
                                                            5500 บาท
                                                        </Typography>
                                                        
                                                    </Stack>
                                                    <Grid container spacing={2} sx={{mt:1, pl:1 , pb:1 , background:"#f5f5f5"}} >
                                                        <Grid item md={4}>
                                                            <Button 
                                                                variant='outlined' 
                                                                style={{mb:1,mr:1}} 
                                                                >
                                                                    <Typography><FaInfoCircle style={{fontSize:14 , marginRight:5}} /> </Typography>
                                                               
                                                            </Button>
                                                        </Grid>
                                                        <Grid item md={8} sx={{textAlign:"right"}}>
                                                            <Button 
                                                                variant='contained' 
                                                                sx={{mb:1,mr:1 , background:"#eea412"}} >
                                                                    <IoIosCheckmarkCircle style={{fontSize:14 , marginRight:5}} /> เลือกห้องพัก
                                                                
                                                            </Button>
                                                        </Grid>
                                                                    
                                                    </Grid>
                                             </Card>
                                                  
                                                   
                                        </Grid>

                                })

                            }
                      </Grid>
                      </Container>
  )
}

export default RecommendHotel