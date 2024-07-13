import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ModalPayment = ({children ,open , setOpen}) => {

      const handleClose = (e , reason) => {
        if (reason !== 'backdropClick') {
          setOpen(false)
        }

           
      };

      
  return ( <>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            
            fullWidth
            >
            <DialogTitle sx={{textAlign:"left"}}>
                        ช่องทางชำระเงิน
            </DialogTitle>
            <DialogContent>
            

                  {children}
                
             
            </DialogContent>
            
        </Dialog>
    </>
  )
}

export default ModalPayment