import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const ErrorContext = createContext({
  setError: () => {},
});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const handleClose = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
      <Dialog sx={{ fontSize: 14 }} open={Boolean(error)} onClose={handleClose}>
        <DialogTitle>{error && error.title || 'Ошибка'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{error ? error.message : error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </ErrorContext.Provider>
  );
};
