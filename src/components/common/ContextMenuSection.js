import React, { useState } from "react";

const ContextMenuSection = ({ left, top }) => {
  if (!left) return;

  return (
    <>
      <div style={{ left, top }} className="contextMenuMainContainer">
        <div>Edit</div>
        <div>Delete</div>
      </div>
    </>
  );
};

export default ContextMenuSection;
