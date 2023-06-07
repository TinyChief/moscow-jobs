import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

export default function ApplicationDeleteDialog({
  open,
  handleClose,
  handleConfirm,
  name,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{maxWidth: "400px"}}>{`Вы уверены, что хотите удалить стажировку \"${name}\"?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Отменить
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Да, удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
