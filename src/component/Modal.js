import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = ({open , setOpen}) => {

    
   const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{textAlign:"center"}}>
                กรุณารอสักครู่ ระบบกำลังดำเนินการ
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{textAlign:"center"}}>

               ..............................
         
        </DialogContentText>
      </DialogContent>
     
    </Dialog>
  </>
  )
}

export default Modal