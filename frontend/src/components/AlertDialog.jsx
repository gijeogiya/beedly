import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./Button";
import { Box } from "grommet";
export const AlertDialog = ({
  open,
  handleClose,
  handleAction,
  title,
  desc,
  cancel,
  accept,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>

      <Box direction="row" justify="center">
        <Button SmallBlack onClick={handleClose}>
          {cancel}
        </Button>
        {accept && (
          <Button SmallRed onClick={handleAction} autoFocus>
            {accept}
          </Button>
        )}
      </Box>
    </Dialog>
  );
};
