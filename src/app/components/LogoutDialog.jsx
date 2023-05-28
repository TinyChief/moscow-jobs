import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function LogoutDialog({ open, handleClose, handleConfirm }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
        <DialogContent>{/* Optional content goes here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Отменить</Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Выйти
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
