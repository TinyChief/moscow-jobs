import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function LogoutDialog({ open, handleClose, handleConfirm }) {
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleConfirm = () => {
  //   // Handle logout here
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Вы уверены, что хотите выйти?</DialogTitle>
        <DialogContent>{/* Optional content goes here */}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Отменить</Button>
          <Button onClick={handleConfirm} variant="outlined" color="error">
            Выйти
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
