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
      const { name, id, lpath } = action.payload;
      if (!id) {
        state.files.push(name);
      } else {
        if (!state.folders[id]) {
          return;
        }
        if (!lpath) {
          if (!state.folders[id].files) {
            state.folders[id].files = [];
          }
          state.folders[id].files.push(name);
        } else {
          let currentFolder = state.folders[id];
          const folderPath = lpath.split("/");
          for (const folderName of folderPath) {
            if (!currentFolder.folders[folderName]) {
              // If the folder does not exist, create it
              currentFolder.folders[folderName] = {
                ...initialState,
                folders: {},
              };
            }
            currentFolder = currentFolder.folders[folderName];
          }
          if (!currentFolder.files) {
            currentFolder.files = [];
          }

          currentFolder.files.push(name);
        }
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
          const folderPath = lpath.split("/"); // Split the path to navigate through the nested folders
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
      const { name, id, lpath } = action.payload;
      if (!id) {
        state.names.push(name);
      } else {
        if (!state.folders[id]) {
          return;
        }
        if (!lpath) {
          if (!state.folders[id].names) {
            state.folders[id].names = [];
          }
          state.folders[id].names.push(name);
        } else {
          let currentFolder = state.folders[id];
          const folderPath = lpath.split("/");
          for (const folderName of folderPath) {
            if (!currentFolder.folders[folderName]) {
              // If the folder does not exist, create it
              currentFolder.folders[folderName] = {
                ...initialState,
                folders: {},
              };
            }
            currentFolder = currentFolder.folders[folderName];
          }
          if (!currentFolder.names) {
            currentFolder.names = [];
          }

          currentFolder.names.push(name);
        }
      }
    },
  },
});
export const { addFileItem, addFolderItem, addFileFolderName } =
  currentFolderSlice.actions;
export default currentFolderSlice.reducer;
