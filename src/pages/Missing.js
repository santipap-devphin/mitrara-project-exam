import React from 'react';
import MainWeb from '../component/MainWeb';
import HomePage from '../component/HomePage';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Missing() {

  const btnBack = () => {

    window.location = "/";

  }

  return (<MainWeb>
            <HomePage page="ไม่พบหน้าที่ท่านต้องการ" vals="mission"  />
             <Container>
                    <Box sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:2 , pl:2}}>
                            <Typography variant='h4' sx={{textAlign:'left'}}>ไม่พบหน้าที่ท่านต้องการ</Typography>
                            <Button variant="contained" onClick={btnBack} color="error" sx={{mt:2 , mb:2 , pl:2}}>กลับหน้าหลัก</Button>
                     </Box>
             </Container>
        </MainWeb>
  )
}

export default Missing