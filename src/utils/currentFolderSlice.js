import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentId: null,
  key: null,
  files: [],
  folders: {},
  names: [],
};
const currentFolderSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addFileItem: (state, action) => {
      const { name, id } = action.payload;
      if (!id) state.files.push(name);
      else {
        state.folders[id].files.push(name);
      }
    },
    addFolderItem: (state, action) => {
      const { name, id } = action.payload;
      if (!id) state.folders[name] = initialState;
      else {
        const folderState = state.folders[id];
        folderState.folders[name] = initialState;
      }
    },

    addFileFolderName: (state, action) => {
      const { name, id } = action.payload;
      if (!id) state.names.push(name);
      else {
        state.folders[id].names.push(name);
      }
    },
  },
});
export const { addFileItem, addFolderItem, addFileFolderName } =
  currentFolderSlice.actions;
export default currentFolderSlice.reducer;
