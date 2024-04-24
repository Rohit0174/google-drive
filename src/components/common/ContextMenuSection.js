import React from "react";
import { useDispatch } from "react-redux";
import { deleteFile, deleteFolderName } from "../../utils/currentFolderSlice";
import { useParams } from "react-router-dom";

const ContextMenuSection = ({
  left,
  top,
  selectedFolder,
  openEditModal,
  setEditModal,
  type,
}) => {
  const { id, "*": lpath } = useParams();
  const dispatcher = useDispatch();

  if (!left) return;

  const handleActionButton = (clickType) => {
    if (clickType === "edit") {
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
