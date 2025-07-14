// pages/Result.jsx
import React, { useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setFile } from "../store/reducers/imageSlice";
import convertImageAPI from "../store/actions/image_actions";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const Result = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { file, convertedImage } = useSelector((state) => state.image);
  const [loading,setLoading]= useState(false);
  const [isVaild,setIsVaild]= useState(false);
  const originalImageUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );
  const handleRemoveBG =()=>{
    try {
      setLoading(true)
      dispatch(convertImageAPI()).then((v)=>{
      setLoading(false)
    })
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleDownload = () => {
    if (!convertedImage) return;
  
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .replace(/\..+/, "");
  
    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `background_removed_${timestamp}.png`; // Example: background_removed_2025-07-13_15-30-20.png
    link.click();
  };
  

  const formik = useFormik({
    initialValues: { image: null },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required("Please select an image")
        .test(
          "fileType",
          "Unsupported format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      setIsVaild(true);
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gray-100 px-4 py-10 flex justify-center items-center">
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-7xl">
          {/* Original Image + Upload */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl flex-1 text-center">
            <h2 className="text-2xl font-bold mb-4">Original Image</h2>

            {originalImageUrl ? (
              <img
                src={originalImageUrl}
                alt="Original"
                className="w-1/2 rounded-lg shadow mb-4"
              />
            ) : (
              <p className="text-gray-400 italic mb-4">No image selected.</p>
            )}

            <form onSubmit={formik.handleSubmit}>
              <input
                type="file"
                ref={inputRef}
                name="image"
                accept="image/*"
                className="hidden "
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  formik.setFieldValue("image", file);
                  formik.setTouched({ image: true });
                  setIsVaild(false);
                  dispatch(setFile(file));
                }}
              />

              <div className="flex flex-col gap-4 items-center">
                <button
                  type="button"
                  onClick={() => inputRef.current.click()}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Choose Image
                </button>
                {formik.errors.image && formik.touched.image && (
                <p className="text-red-500 mt-2">{formik.errors.image}</p>
              )}
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  {isVaild ? "✓ Upload Image":"Upload Image"}
                </button>

                {file && (
                  <button
                    type="button"
                    onClick={handleRemoveBG}
                    className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 cursor-pointer"
                  >
                    {loading ? "Waite...":"Convert Image"}
                  </button>
                )}
              </div>

              
            </form>
          </div>

          {/* Converted Image + Download */}
          {convertedImage && (
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl flex-1 text-center">
              <h2 className="text-2xl font-bold mb-4">Background Removed</h2>
              <img
                src={convertedImage}
                alt="Converted"
                className="w-1/2 rounded-lg shadow mb-6"
              />
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Result;
