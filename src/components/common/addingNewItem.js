import { Button, Col, Input, Modal, Radio, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AddingNewItemModal = ({
  openCreateNewModal,
  setOpenCreateNewModal,
  onSubmit,
}) => {
  const { id } = useParams();
  const [inputValue, setInputValue] = useState("");

  const plainOptions = ["File", "Folder"];
  const [value, setValue] = useState("File");
  const currentSliceData = useSelector((store) =>
    id ? store.currentFolder.folders[id] : store.currentFolder
  );
  const checkName = (name) => {
    console.log("name", name, currentSliceData);
  };
  const handleCreate = () => {
    onSubmit(value, inputValue);
    setInputValue("");
    setOpenCreateNewModal(false);
  };

  const handleCancel = () => {
    setOpenCreateNewModal(false);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    checkName(e.target.value);
  };

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <Modal
      open={openCreateNewModal}
      onCancel={handleCancel}
      className="CreateBoxModal"
      footer={[
        <Button
          key="create"
          type="primary"
          className="w-100"
          onClick={handleCreate}
          disabled={
            currentSliceData.folders?.hasOwnProperty(inputValue) ||
            currentSliceData.files.includes(inputValue)
          }
        >
          Create
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <p className="text-center heading_text">Create New</p>
        </Col>
        <Col xs={24} className="d-flex justify-center radio_button_section">
          <Radio.Group
            optionType="button"
            options={plainOptions}
            onChange={onChange}
            value={value}
          />
        </Col>
        <Input
          status={
            currentSliceData.folders?.hasOwnProperty(inputValue) ||
            currentSliceData.files.includes(inputValue)
              ? "error"
              : null
          }
          value={inputValue}
          placeholder={`Enter ${value} name`}
          onChange={(e) => handleInputChange(e)}
        />
        {currentSliceData.folders?.hasOwnProperty(inputValue) ||
        currentSliceData.files.includes(inputValue) ? (
          <p className="color-red">File/Folder name already exists!</p>
        ) : null}
      </Row>
    </Modal>
  );
};

export default AddingNewItemModal;
