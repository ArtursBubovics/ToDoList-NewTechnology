import { Alert } from "@mui/material"

interface AlertProps {
    message: string,
    status: 'success' | 'info' | 'warning' | 'error'
  }

const Alerts: React.FC<AlertProps> = ({message, status}) => {
    return (
        <div style={{
            position: 'absolute',
            zIndex: 9999,
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 600,
          }}>
            <Alert variant="filled" severity={status}>
              {message}
            </Alert>
          </div>
    );
}

export default Alerts;