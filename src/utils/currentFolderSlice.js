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
          const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
          const folderPath = trimmedPath.split("/");
          for (const folderName of folderPath) {
            if (!currentFolder.folders[folderName]) {
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
    editFileName: (state, action) => {
      const { id, lpath, oName, nName } = action.payload;

      if (!id) {
        state.files.push(nName);
        // delete state.files(oName);
        const index = state.files.indexOf(oName);
        state.files.splice(index, 1);
      } else {
        if (!lpath) {
          let currentFolder = state.folders[id];
          currentFolder.files.push(nName);
          // delete currentFolder.files(oName);
          const index = currentFolder.files.indexOf(oName);
          currentFolder.files.splice(index, 1);
        } else {
          let currentFolder = state.folders[id];
          const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
          const folderPath = trimmedPath.split("/");
          for (const folderName of folderPath) {
            currentFolder = currentFolder.folders[folderName];
          }
          currentFolder.files.push(nName);
          const index = currentFolder.files.indexOf(oName);
          currentFolder.files.splice(index, 1);
        }
      }
    },
    deleteFile: (state, action) => {
      const { id, lpath, oName } = action.payload;

      if (!id) {
        const index = state.files.indexOf(oName);
        state.files.splice(index, 1);
      } else {
        if (!lpath) {
          let currentFolder = state.folders[id];

          const index = currentFolder.files.indexOf(oName);
          currentFolder.files.splice(index, 1);
        } else {
          let currentFolder = state.folders[id];
          const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
          const folderPath = trimmedPath.split("/");
          for (const folderName of folderPath) {
            currentFolder = currentFolder.folders[folderName];
          }
          const index = currentFolder.files.indexOf(oName);
          currentFolder.files.splice(index, 1);
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
          const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
          const folderPath = trimmedPath.split("/");
          //
          // V
          // HG
          // TF
          //Rohit

          for (const folderName of folderPath) {
            if (!currentFolder[folderName]) {
              currentFolder[folderName] = initialState;
            }

            currentFolder = currentFolder[folderName].folders;
          }

          currentFolder[name] = initialState;
        }
      }
    },

    editFoderName: (state, action) => {
      const { id, lpath, oName, nName } = action.payload;
      if (!id) {
        state.folders[nName] = state.folders[oName];
        delete state.folders[oName];
      } else {
        if (!lpath) {
          let currentFolder = state.folders[id].folders;
          currentFolder[nName] = currentFolder[oName];
          delete currentFolder[oName];
        } else {
          let currentFolder = state.folders[id].folders;
          const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
          const folderPath = trimmedPath.split("/");
          for (const folderName of folderPath) {
            currentFolder = currentFolder[folderName].folders;
          }
          currentFolder[nName] = currentFolder[oName];
          delete currentFolder[oName];
        }
      }
    },
    deleteFolderName: (state, action) => {
      const { id, lpath, oName } = action.payload;
      if (!id) {
        delete state.folders[oName];
      } else {
        if (!lpath) {
          let currentFolder = state.folders[id].folders;

          delete currentFolder[oName];
        } else {
          let currentFolder = state.folders[id].folders;
          const trimmedPath = lpath.endsWith("/") ? lpath.slice(0, -1) : lpath;
          const folderPath = trimmedPath.split("/");
          for (const folderName of folderPath) {
            currentFolder = currentFolder[folderName].folders;
          }

          delete currentFolder[oName];
        }
      }
    },
  },
});
export const {
  addFileItem,
  addFolderItem,

  editFoderName,
  deleteFolderName,
  editFileName,
  deleteFile,
} = currentFolderSlice.actions;
export default currentFolderSlice.reducer;
