import { Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const FileAndFolderCards = ({ data }) => {
  const { id } = useParams();
  const [openContextMenu, setOpenContextMenu] = useState(false);
  let currentSliceData = useSelector((store) => store.currentFolder);
  currentSliceData = data ? data : currentSliceData;
  const navigate = useNavigate();

  const handleFolderClick = (item) => {
    if (!id) navigate(`/${item}`);
    else navigate(`/${id}/${item}`);
  };
  return (
    <div className="d-flex">
      {openContextMenu}
      {currentSliceData?.files?.map((item, index) => {
        return (
          <div className="px-20" key={index}>
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
              e.preventDefault();
              setOpenContextMenu(true);
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
