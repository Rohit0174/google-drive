import { useState } from "react";
import AddingNewItemModal from "../common/addingNewItem";
import { Image } from "antd";

import { useDispatch } from "react-redux";
import { addFileItem, addFolderItem } from "../../utils/currentFolderSlice";
import FileAndFolderCards from "./fileAndFolderCards";
import { useParams } from "react-router-dom";
import BreadCrumb from "../common/BreadCrumb";

const Home = () => {
  const dispatcher = useDispatch();
  let { id, "*": lpath } = useParams();

  const [openCreateNewModal, setOpenCreateNewModal] = useState(false);
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);

  const handleCreateNewModal = () => {
    setOpenCreateNewModal(true);
  };

  const handleAddItem = (value, name) => {
    if (value === "File") {
      dispatcher(addFileItem({ name, id, lpath }));
    } else {
      dispatcher(addFolderItem({ name, id, lpath }));
    }
  };

  return (
    <div className="p-100" onClick={() => setLeft(null)}>
      <BreadCrumb />
      <AddingNewItemModal
        openCreateNewModal={openCreateNewModal}
        setOpenCreateNewModal={setOpenCreateNewModal}
        onSubmit={handleAddItem}
      />
      <div className="d-flex add_icon_folders_files_div">
        <FileAndFolderCards
          left={left}
          setLeft={setLeft}
          top={top}
          setTop={setTop}
          dispatcher={dispatcher}
        />

        <Image
          onClick={handleCreateNewModal}
          className="cursor_pointer"
          alt="add_new_img"
          src="/Assets/icons/add_new_button.png"
          preview={false}
        />
      </div>
    </div>
  );
};
export default Home;
