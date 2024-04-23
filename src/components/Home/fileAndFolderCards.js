import { Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ContextMenuSection from "../common/ContextMenuSection.js";

const FileAndFolderCards = ({ left, setLeft, top, setTop, dispatcher }) => {
  const { id, "*": lpath } = useParams();

  const [openContextMenu, setOpenContextMenu] = useState(false);
  let currentSliceData = useSelector((store) => store.currentFolder);
  let data = currentSliceData?.folders[id];

  //if lpath
  //go into all the folder till the lpath empty
  // Navigate into all the folders until lpath is empty
  if (lpath) {
    const folderPath = lpath.split("/");
    for (const folderName of folderPath) {
      if (data?.folders[folderName]) {
        data = data.folders[folderName];
      } else {
        // If any folder in lpath doesn't exist, break the loop
        data = null;
        break;
      }
    }
  }

  currentSliceData = data ? data : currentSliceData;

  const navigate = useNavigate();

  const handleFolderClick = (item) => {
    if (!id) navigate(`/${item}`);
    else {
      if (!lpath) {
        navigate(`/${id}/${item}`);
      } else {
        navigate(`/${id}/${lpath}/${item}`);
      }
    }
  };
  const handleContextMenu = (e) => {
    e.preventDefault();
    console.log("eee", e.clientX, e.clientY);
    setLeft(e.clientX + 20);
    setTop(e.clientY + 20);
    setOpenContextMenu(true);
  };
  return (
    <div className="d-flex" onClick={() => setLeft(null)}>
      {openContextMenu && (
        <ContextMenuSection left={left} top={top} dispatcher={dispatcher} />
      )}
      {currentSliceData?.files?.map((item, index) => {
        return (
          <div
            className="px-20"
            key={index}
            onContextMenu={(e) => {
              handleContextMenu(e);
            }}
          >
            <Image
              preview={false}
              height={100}
              width={100}
              src="/Assets/icons/file.png"
            />
            <p className="text-center">{item}</p>
          </div>
        );
      })}
      {Object.keys(currentSliceData?.folders).map((folder, index) => (
        <div key={index}>
          <div
            className="px-20 cursor_pointer"
            key={index}
            onClick={() => handleFolderClick(folder)}
            onContextMenu={(e) => {
              handleContextMenu(e);
            }}
          >
            <Image
              preview={false}
              height={100}
              width={100}
              src="/Assets/icons/folder.png"
            />
            <p className="text-center">{folder}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileAndFolderCards;
