import { Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContextMenuSection from "../common/ContextMenuSection.js";
import EditNameModal from "../common/editNameModal.js";

const FileAndFolderCards = ({ left, setLeft, top, setTop }) => {
  const { id, "*": lpath } = useParams();
  const { pathname } = useLocation();

  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [openEditModal, setEditModal] = useState(false);
  const [type, setType] = useState("file");
  let currentSliceData = useSelector((store) => store.currentFolder);
  let data = currentSliceData?.folders[id];

  if (lpath) {
    // Remove trailing slash if present
    const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
    const folderPath = trimmedPath.split("/");

    for (const folderName of folderPath) {
      if (data?.folders[folderName]) {
        data = data.folders[folderName];
      } else {
        data = null;
        break;
      }
    }
  }

  currentSliceData = data ? data : currentSliceData;

  const navigate = useNavigate();
  const hasTrailingSlash = pathname.endsWith("/");

  const handleFolderClick = (item) => {
    if (!id) navigate(`/${item}`);
    else {
      if (!lpath) {
        navigate(`/${id}/${item}`);
      } else {
        if (hasTrailingSlash) {
          navigate(`/${id}/${lpath}${item}`);
        } else {
          navigate(`/${id}/${lpath}/${item}`);
        }
      }
    }
  };
  const handleContextMenu = (e, folder, type) => {
    e.preventDefault();
    setType(type);
    setSelectedFolder(folder);
    setLeft(e.clientX + 20);
    setTop(e.clientY + 20);
    setOpenContextMenu(true);
  };
  return (
    <div className="d-flex">
      <div style={{ width: "100wv" }} onClick={() => setLeft(null)} />
      <EditNameModal
        openEditModal={openEditModal}
        setEditModal={setEditModal}
        selectedFolder={selectedFolder}
        type={type}
      />
      {openContextMenu && (
        <ContextMenuSection
          left={left}
          top={top}
          selectedFolder={selectedFolder}
          openEditModal={openEditModal}
          setEditModal={setEditModal}
          type={type}
        />
      )}

      {currentSliceData?.files?.map((item, index) => {
        return (
          <div
            className="px-20"
            key={index}
            onContextMenu={(e) => {
              handleContextMenu(e, item, "file");
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
              handleContextMenu(e, folder, "folder");
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
