import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { editFileName, editFoderName } from "../../utils/currentFolderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditNameModal = ({
  openEditModal,
  setEditModal,
  selectedFolder,
  type,
}) => {
  const { id, "*": lpath } = useParams();
  const dispatcher = useDispatch();

  let currentSliceData = useSelector((store) =>
    id ? store.currentFolder.folders[id] : store.currentFolder
  );
  if (lpath) {
    // Remove trailing slash if present
    const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
    const folderPath = trimmedPath.split("/");

    for (const folderName of folderPath) {
      if (currentSliceData?.folders[folderName]) {
        currentSliceData = currentSliceData.folders[folderName];
      } else {
        // If any folder in lpath doesn't exist, break the loop
        currentSliceData = null;
        break;
      }
    }
  }

  const [inputValue, setInputValue] = useState("");
  const handleCancel = () => {
    setEditModal(false);
    setInputValue("");
  };
  const handleCreate = () => {
    if (type === "folder") {
      dispatcher(
        editFoderName({
          id: id,
          lpath: lpath,
          oName: selectedFolder,
          nName: inputValue,
        })
      );
    } else {
      dispatcher(
        editFileName({
          id: id,
          lpath: lpath,
          oName: selectedFolder,
          nName: inputValue,
        })
      );
    }
    setEditModal(false);
  };

  return (
    <Modal
      open={openEditModal}
      onCancel={handleCancel}
      className="CreateBoxModal"
      footer={[
        <Button
          key="create"
          type="primary"
          className="w-100"
          onClick={handleCreate}
          disabled={
            inputValue === "" ||
            currentSliceData?.folders?.hasOwnProperty(inputValue) ||
            currentSliceData?.files.includes(inputValue)
          }
        >
          Update
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <p className="text-center heading_text">Update Name</p>
        </Col>

        <Input
          //   status={currentSliceData?.names.includes(inputValue) ? "error" : null}
          status={
            currentSliceData?.folders?.hasOwnProperty(inputValue) ||
            currentSliceData?.files.includes(inputValue)
              ? "error"
              : null
          }
          value={inputValue}
          placeholder={`Enter new name`}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {currentSliceData.folders?.hasOwnProperty(inputValue) ||
        currentSliceData.files.includes(inputValue) ? (
          <p className="color-red">File/Folder name already exists!</p>
        ) : null}
      </Row>
    </Modal>
  );
};

export default EditNameModal;
