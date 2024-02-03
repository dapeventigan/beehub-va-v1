import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const VaSetting = ({ data }) => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();

  const toggleClose = () => {
    setOpen(false);
    setFname(data.fname);
  };

  const [fname, setFname] = useState(data.fname);

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
    overflowY: "scroll",
  };

  return (
    <>
      <div onClick={handleOpen}>Account Settings</div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-aos="fade"
          data-aos-once="true"
        >
          <Box sx={style}>
            <div className="clientregisterinput__container">
              <input
                className="clientregisterinput__form"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="First name"
              />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default VaSetting;
