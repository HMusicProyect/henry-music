import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export const ModalComponent = (
  {children, isModalOpen, setIsModalOpen}:
  {
    children: React.ReactNode, 
    isModalOpen: boolean, 
    setIsModalOpen: (val: boolean) => void
  }) => {

  const handleClose = () => setIsModalOpen(false);
    return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {children}
        </Typography>
      </Box>
    </Modal>
    )
}


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};