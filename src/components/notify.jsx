import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Notify = ({open, onClose, children, severity, autoHideDuration}) => {
  return (
    <Snackbar 
      open={open}
      onClose={onClose}
      
      autoHideDuration={ autoHideDuration||3000}
      anchorOrigin={{vertical:'top', horizontal: 'center'}}
    >
      <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default Notify;