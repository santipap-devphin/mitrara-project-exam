import React ,{useContext}from 'react';
import DataContext from '../context/DataContext';
import {Container ,Stack , Typography , Grid , Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const BookingInformation = () => {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#252531",
          color: "#DFB163",
          fontSize: 18,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 16,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const {listBooking} = useContext(DataContext);

      const clkPrint = () => {


        window.print()
        

      }
       

       

  return (<Box>
               
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12} sx={{mt:5,mb:5}}>

                    <Container>
                        <Stack textAlign="left">
                            <Typography variant='h4' sx={{mb:5}}>รายละเอียดการจองของลูกค้า</Typography>
                        </Stack>
                      
                        <Stack textAlign="left" spacing={2}>
                           
                             <Typography variant='h5' sx={{pb:2}}>หมายเลขการจองของลูกค้า : {listBooking.bookingID}</Typography>
                             <Typography variant='p' sx={{mb:1, color:"red"}}>***หากลูกค้าไม่ได้รับอีเมล์ กรุณาพิมพ์ เอกสาร </Typography>
                             <Button variant="contained" color="secondary" size='small' sx={{maxWidth:100}} onClick={clkPrint}>พิมพ์เอกสาร</Button>
                            <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell className='font-kanit-light' align="left" colSpan={2}>
                                            ข้อมูลการจอง
                                            </StyledTableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    ชื่อลูกค้า
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.nameguest}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    อีเมล์ติดต่อ
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.emailguest}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    เบอร์โทร
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.telguest}</StyledTableCell>
                                           </StyledTableRow>
                                        
                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    ชื่อโรงแรม
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.hotelName}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    จังหวัด
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.location}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    รูปแบบห้อง
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.roomnametype}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    จำนวนคืนที่พัก
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.night} คืน</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    ราคาห้องพัก
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.hprice} * {listBooking.night} = {listBooking.sumroom} </StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    ภาษี Vat
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.vat}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    ราคารวมภาษี
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.totalbook}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                    วัน (เช็คอิน)
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.checkin}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                วัน (เช็คเอ๊าท์)
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{listBooking.checkout}</StyledTableCell>
                                           </StyledTableRow>
                                           <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                 ช่องทางชำระเงิน
                                                </StyledTableCell>
                                              
                                                <StyledTableCell align="center">{listBooking.payment.paymentName}</StyledTableCell>
                                           </StyledTableRow>
                                            {
                                                listBooking.payment.paymentID === 2 ? 
                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row" sx={{maxWidth:250}}>
                                                     รายละเอียดชำระ
                                                    </StyledTableCell>
                                                   
                                                    <StyledTableCell align="center">
                                                        {listBooking.payment.paymentDetail[0].bankname} <br />
                                                         หมายเลขบัญชี  {listBooking.payment.paymentDetail[0].bankno}  <br />
                                                         <img src="../../images/qrcode-exam.png" style={{width:"10%"}} alt="qrcode" />
                                                        </StyledTableCell>
                                                </StyledTableRow>
                                                
                                                :null
                                            }
                                          
                                        
                                        </TableBody>
                                    </Table>
                             </TableContainer>
                        </Stack>
                        <Typography variant='h6' sx={{color:"red"}}>*** หมายเหตุ กรุณาตรวจสอบรายการให้ถูกต้อง</Typography>
                    </Container>
                 
                </Grid>

                    
                </Grid>
              
             </Box>
  )
}

export default BookingInformation