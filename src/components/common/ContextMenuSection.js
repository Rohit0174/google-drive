import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteFile,
  deleteFolderName,
  editFoderName,
} from "../../utils/currentFolderSlice";
import { useParams } from "react-router-dom";
import EditNameModal from "./editNameModal";

const ContextMenuSection = ({
  left,
  top,
  dispatcher,
  selectedFolder,
  openEditModal,
  setEditModal,
  type,
}) => {
  const { id, "*": lpath } = useParams();

  if (!left) return;

  const handleActionButton = (type) => {
    if (type === "edit") {
      setEditModal(true);
    } else {
      if (type === "folder")
        dispatcher(deleteFolderName({ id, lpath, oName: selectedFolder }));
      else dispatcher(deleteFile({ id, lpath, oName: selectedFolder }));
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
