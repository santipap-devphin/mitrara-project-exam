import React from 'react';
import {Container,Typography , Grid  , Stack , Box  , Divider} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { BsLine , BsFacebook } from "react-icons/bs";
import { FaTiktok} from "react-icons/fa";
import { ImInstagram } from "react-icons/im";


function Footer() {

    const handleClk = (id) => {

        window.location.reload();
    }
  return (<>
    <footer>
    <Box sx={{backgroundColor:"#4c5a7d", pt:7 , pb:7}}>
    <Container>
            <Grid rowSpacing={4} alignItems="left" container sx={{color:"#fff"}}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Stack spacing={2} sx={{p:2}}>
                                            <Typography variant="h5" style={{color:"#eea412"}}>
                                                Footer Hotel Example Test
                                            </Typography>
                                            <Typography paragraph sx={{fontSize:16}}> 
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                            </Typography>
                                        </Stack>

                                        <Stack 
                                            direction="row" 
                                            spacing={2}
                                            divider={<Divider orientation="vertical" flexItem />}
                                            >
                                                    <IconButton size="large" onClick={() => handleClk("facebook")}>
                                                    <BsFacebook style={{color:"#D9D0BD"}}  />
                                                    </IconButton>
                                                    <IconButton size="large" onClick={() => handleClk("line")}>
                                                        <BsLine style={{color:"#D9D0BD"}} />  
                                                    </IconButton>
                                                    <IconButton size="large" onClick={() => handleClk("ig")}>
                                                        <ImInstagram style={{color:"#D9D0BD"}}  />
                                                    </IconButton>
                                                    <IconButton size="large" onClick={() => handleClk("tiktok")}>
                                                        <FaTiktok style={{color:"#D9D0BD"}}  />
                                                    </IconButton>

                                        </Stack>
                                    </Grid>
                                    
                                  
                                
                                   
            </Grid>
        </Container>
    </Box>
</footer>
<footer style={{background:"#1f1f1f" , textAlign:"center" , color:'#fff'}}>
        <Typography variant="h6" sx={{p:1}}>Copy right Devphin 2024</Typography>
 </footer>
</>
  )
}

export default Footer