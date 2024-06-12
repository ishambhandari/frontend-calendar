import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

function ErrorToast({ error }) {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
  };

  const toastStyle = {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    padding: "0 15px", // Adjust padding as needed
  };

  return (
    <>
      {showToast && (
        <Toast onClose={handleClose} show={showToast} style={toastStyle}>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}
    </>
  );
}

export default ErrorToast;
