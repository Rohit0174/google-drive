import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteFolderName,
  editFoderName,
} from "../../utils/currentFolderSlice";
import { useParams } from "react-router-dom";

const ContextMenuSection = ({ left, top, dispatcher }) => {
  const { id, "*": lpath } = useParams();

  if (!left) return;

  const handleActionButton = (type) => {
    if (type === "edit") {
      dispatcher(editFoderName({ id, lpath, oName: "C", nName: "Rohit" }));
    } else {
      dispatcher(deleteFolderName({ id, lpath, oName: "C" }));
    }
  };

  return (
    <>
      <div style={{ left, top }} className="contextMenuMainContainer">
        <div onClick={() => handleActionButton("edit")}>Edit name</div>
        <div onClick={() => handleActionButton("delete")}>Delete</div>
      </div>
    </>
  );
};

export default ContextMenuSection;
