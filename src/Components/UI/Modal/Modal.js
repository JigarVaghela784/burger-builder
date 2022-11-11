import React from "react";
import style from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
export default function Modal({
  show,
  modalClosed,
  children
}) {

  return (
    <>
      <BackDrop show={show} clicked={modalClosed} />
      <div
        className={style.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-110vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </div>
    </>
  );
}
