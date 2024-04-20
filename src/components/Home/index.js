import { useState } from "react";
import AddingNewItemModal from "../common/addingNewItem";
import { Image, message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  addFileFolderName,
  addFileItem,
  addFolderItem,
} from "../../utils/currentFolderSlice";
import FileAndFolderCards from "./fileAndFolderCards";
import { useParams } from "react-router-dom";

const Home = () => {
  const dispatcher = useDispatch();
  let { id, '*': lpath } = useParams();

  const [openCreateNewModal, setOpenCreateNewModal] = useState(false);



  const handleCreateNewModal = () => {
    setOpenCreateNewModal(true);
  };

  //Check if lpath is empty or not 
  //if empty then pass the id 
  //else pass the lpath last route
  console.log(lpath)

  const handleAddItem = (value, name) => {
    if (value === "File") {
      dispatcher(addFileItem({ name, id }));
    } else {
      dispatcher(addFolderItem({ name, id, lpath }));
    }
    dispatcher(addFileFolderName({ name, id }));
  };




  return (
    <div className="p-100">
      <AddingNewItemModal
        openCreateNewModal={openCreateNewModal}
        setOpenCreateNewModal={setOpenCreateNewModal}
        onSubmit={handleAddItem}
      />
      <div className="d-flex">
        <FileAndFolderCards />

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
