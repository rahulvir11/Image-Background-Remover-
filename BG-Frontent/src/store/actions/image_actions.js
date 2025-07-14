import API from "../../api/axios";
import { setConvertImageAPI } from "../reducers/imageSlice";

export const convertImageAPI = () => async (dispatch, getState) => {
  try {
    const file = getState().image.file;
    
    if (!file) {
      console.error("No file found in state.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await API.post("/remove-bg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(setConvertImageAPI(response.data.resultImage));
  } catch (error) {
    console.error("Error while converting image:", error);
  }
};

export default convertImageAPI;
