import React from "react";

const ToastPopup = ({ show = false, content }: { show: boolean, content: string | React.ReactElement }) => {
  return (
    <React.Fragment>
      <div className="toastPopup" style={{ display: show ? 'block' : 'none', zIndex: 101 }}>
        <p className="title">{content}</p>
      </div>
    </React.Fragment>
  );
};

export default ToastPopup;
