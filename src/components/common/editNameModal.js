import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { editFileName, editFoderName } from "../../utils/currentFolderSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const EditNameModal = ({
  openEditModal,
  setEditModal,
  selectedFolder,
  type,
}) => {
  const { id, "*": lpath } = useParams();
  const dispatcher = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const handleCancel = () => {
    setEditModal(false);
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
        >
          Create
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <p className="text-center heading_text">Create New</p>
        </Col>

        <Input
          //   status={currentSliceData?.names.includes(inputValue) ? "error" : null}
          value={inputValue}
          //   placeholder={`Enter ${value} name`}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/* {currentSliceData?.names.includes(inputValue) ? (
          <p className="color-red">File/Folder name already exists!</p>
        ) : null} */}
      </Row>
    </Modal>
  );
};

export default EditNameModal;
