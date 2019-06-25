import React from 'react';

let Modal = (props) => {

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='colorBlock' style={{ backgroundColor: props.color }}></div>
        <h2>{props.color}</h2>
        {/* <h2>hexidecimal: {props.color}</h2> */}
        <button onClick={() => {props.handleClose()}}>Close</button>
      </section>
    </div>
  );
};

export default Modal;