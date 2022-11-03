import React from "react";
import Modal from "../../Modal/Modal";
// import axios from "axios";
function WithErrorHandler({error,errorHandler}) {
  
  return (
    <>
      <Modal show={error.error} modalClosed={errorHandler}>
        {/* {console.log("error", error)} */}
        {error.error ? error?.error?.message : null}
      </Modal>
    </>
  );
}

export default WithErrorHandler;
