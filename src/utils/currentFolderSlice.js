import { createSlice } from "@reduxjs/toolkit";

const currentFolderSlice = createSlice({
  name: "root",
  initialState: {
    parentId: null,
    key: null,
    files: [],
    folders: [],
  },
  reducers: {
    addFileItem: (state, action) => {
      state.files.push(action.payload);
    },
    addFolderItem: (state, action) => {
      state.folders.push(action.payload);
    },
  },
});
export const { addFileItem, addFolderItem } = currentFolderSlice.actions;
export default currentFolderSlice.reducer;
