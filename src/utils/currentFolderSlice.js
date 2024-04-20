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
      const { name, id, lpath } = action.payload;
      if (!id) state.folders[name] = initialState;
      else {
        if (!lpath) {
          const folderState = state.folders[id];
          folderState.folders[name] = initialState;
        } else {
          let currentFolder = state.folders[id].folders;
          //A
          const folderPath = lpath.split('/'); // Split the path to navigate through the nested folders
          // 
          // V
          // HG
          // TF
          //Rohit

          // Traverse through the folder hierarchy
          for (const folderName of folderPath) {
            if (!currentFolder[folderName]) {
              // If the folder does not exist, create it
              currentFolder[folderName] = initialState;
            }
            // Move to the next level of nested folders
            currentFolder = currentFolder[folderName].folders;
          }

          // Add the new folder to the appropriate level
          currentFolder[name] = initialState;

        }
      }
    },

    addFileFolderName: (state, action) => {
      const { name, id } = action.payload;
      if (!id) state.names.push(name);
      else {
        state.folders[id].names.push(name);
      }
    },

    gonestedPath: (state, action) => {
      const { id, lpath } = action.payload;
      let currentFolder = state.folders[id].folders;
      const folderPath = lpath.split('/'); // Split the path to navigate through the nested folders
      // Traverse through the folder hierarchy
      for (const folderName of folderPath) {
        if (!currentFolder[folderName]) {
          // If the folder does not exist, create it
          currentFolder[folderName] = initialState;
        }
        // Move to the next level of nested folders
        currentFolder = currentFolder[folderName].folders;
      }   
  }
},
});
export const { addFileItem, addFolderItem, addFileFolderName } =
  currentFolderSlice.actions;
export default currentFolderSlice.reducer;
