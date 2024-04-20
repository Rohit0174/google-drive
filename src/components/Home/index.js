import { useState } from "react";
import AddingNewItemModal from "../common/addingNewItem";
import { Image } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addFileItem, addFolderItem } from "../../utils/currentFolderSlice";

const Home = () => {
  const dispatcher = useDispatch();
  const [openCreateNewModal, setOpenCreateNewModal] = useState(false);

  const currentSliceData = useSelector((store) => store.currentFolder);
  // console.log("selector", currentSliceData);

  const handleCreateNewModal = () => {
    setOpenCreateNewModal(true);
  };
  const handleAddItem = (value, name) => {
    if (value === "File") {
      dispatcher(addFileItem(name));
    } else {
      dispatcher(addFolderItem(name));
    }
  };

  return (
    <div className="p-100">
      <AddingNewItemModal
        openCreateNewModal={openCreateNewModal}
        setOpenCreateNewModal={setOpenCreateNewModal}
        onSubmit={handleAddItem}
      />
      <div className="d-flex">
        {currentSliceData?.files?.map((item) => {
          return (
            <div>
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
