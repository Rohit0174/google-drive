import { configureStore } from "@reduxjs/toolkit";
import currentFolderReducer from "./currentFolderSlice";

const appStore = configureStore({
  reducer: {
    currentFolder: currentFolderReducer,
  },
});
export default appStore;
