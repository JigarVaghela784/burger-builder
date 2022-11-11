import React, { useState, useEffect } from "react";
import Modal from "../../Modal/Modal";
function WithErrorHandler({ error }) {
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    if (error) {
      setIsError(error);
    }
  }, [error]);


  const errorHandler = () => {
        setIsError(null)
  };
  return (
    <>
      <Modal show={isError} modalClosed={errorHandler}>
        {error ? error.message : null}
      </Modal>
    </>
  );
}

export default WithErrorHandler;
