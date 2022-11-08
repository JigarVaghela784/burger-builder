import React, { useState, useEffect } from "react";
import Modal from "../../Modal/Modal";
// import axios from "axios";
function WithErrorHandler({ error }) {
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    if (error) {
      setIsError(error);
    }
  }, [error]);


  const errorHandler = () => {
    // return error;
    setIsError(null)
  };
  console.log("isError", isError);
  console.log("error!!!!", error);
  return (
    <>
      <Modal show={isError} modalClosed={errorHandler}>
        {error ? error.message : null}
      </Modal>
    </>
  );
}

export default WithErrorHandler;
