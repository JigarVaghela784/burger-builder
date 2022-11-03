import React,{useEffect} from "react";
import style from "./Modal.module.css";
// import OrderSummary from "../../Burger/OrderSummery/OrderSummary";
import BackDrop from "../BackDrop/BackDrop";
export default function Modal({
  show,
  modalClosed,
  children
}) {
// Component Did Update
  // useEffect(() => {
  //   console.log("[Modal] Update")
  // }, []);
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
        {/* <OrderSummary
          ingredients={ingredients}
          cancelPurchase={modalClosed}
          continuePurchase={continuePurchase}
        /> */}
      </div>
    </>
  );
}
