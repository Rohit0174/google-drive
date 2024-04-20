import { Button, Col, Input, Modal, Radio, Row } from "antd";
import React, { useState } from "react";

const AddingNewItemModal = ({
  openCreateNewModal,
  setOpenCreateNewModal,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const plainOptions = ["File", "Folder"];
  const [value, setValue] = useState("File");

  const handleCreate = () => {
    onSubmit(value, inputValue);
    setInputValue("");
    setOpenCreateNewModal(false);
  };

  const handleCancel = () => {
    setOpenCreateNewModal(false);
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
          value={inputValue}
          placeholder={`Enter ${value} name`}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Row>
    </Modal>
  );
};

export default AddingNewItemModal;
