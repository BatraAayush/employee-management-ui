import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  showSingleEmployee,
  updateEmployee,
} from "../features/employeeDetailSlice";
import Loader from "../components/Loader";
import Popoup from "../components/Popoup";
import { useParams } from "react-router";
import { RxCross1 } from "react-icons/rx";
// import { updateEmployee } from "../../../employee-management-api/controllers/employee.controller";

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const { employee, loading } = useSelector((state) => state.employeeData);
  const [fileUploadLoader, setFileUploadLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [file, setFile] = useState(null);
  const [editImage, setEditImage] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(showSingleEmployee(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (employee && id) {
      setEmployeeData({
        name: employee.name,
        email: employee.email,
        mobileNo: employee.mobileNo,
        designation: employee.designation,
        gender: employee.gender,
        course: employee?.course?.split(","),
        image: employee.image,
      });
    }
  }, [employee, id]);

  const uploadImageOnCloudinary = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "employeeManagement");
    data.append("cloud_name", "dbzcsalbk");

    try {
      setFileUploadLoader(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbzcsalbk/image/upload",
        data
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Error uploading image to cloudinary: ", err);
    } finally {
      setFileUploadLoader(false);
    }
  };

  const validatePhoneNumber = (num) => {
    const numLength = num.toString().length;
    return numLength === 10;
  };

  const validateForm = () => {
    setErrorMessage("");
    if (!validatePhoneNumber(employeeData?.mobileNo)) {
      setErrorMessage("Mobile Number must contain 10 digits only");
      return false;
    } else if (!employeeData?.gender) {
      setErrorMessage("Please Select Gender");
      return false;
    } else if (employeeData?.course.length === 0) {
      setErrorMessage("Please Select Course");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const isValid = validateForm();
    if (isValid) {
      let uploadUrl = "";
      if (!editImage && id) {
        uploadUrl = employeeData?.image;
      } else {
        uploadUrl = await uploadImageOnCloudinary();
      }

      const newEmployeeData = {
        ...employeeData,
        image: uploadUrl,
        course: employeeData?.course.join(","),
      };
      try {
        if (id) {
          await dispatch(updateEmployee({ ...newEmployeeData, id })).unwrap();
        } else {
          await dispatch(createEmployee(newEmployeeData)).unwrap();
        }
        setShowPopup(true);
        setEmployeeData({
          name: "",
          email: "",
          mobileNo: "",
          designation: "",
          gender: "",
          course: [],
          image: null,
        });
        setFile(null);
      } catch (error) {
        setErrorMessage(error || "An error occurred");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    switch (type) {
      case "checkbox": {
        const updatedCourses = checked
          ? [...employeeData?.course, value]
          : employeeData?.course.filter((course) => course !== value);
        setEmployeeData({ ...employeeData, course: updatedCourses });
        break;
      }
      case "file": {
        setFile(e.target.files[0]);
        break;
      }
      default:
        setEmployeeData({ ...employeeData, [name]: value });
    }
  };
  return (
    <>
      <form
        onSubmit={submitForm}
        className="flex flex-col items-center mt-12 gap-8 border-4 border-gray-300 rounded-md w-[40%] m-auto p-8"
      >
        <div className="flex w-full justify-between">
          <label>Name</label>
          <input
            className="border border-black rounded-md px-2 py-1 w-[50%]"
            type="text"
            required
            onChange={handleChange}
            name="name"
            value={employeeData?.name}
          />
        </div>
        <div className="flex w-full justify-between">
          <label>Email</label>
          <input
            className="border border-black rounded-md px-2 py-1 w-[50%]"
            type="email"
            name="email"
            onChange={handleChange}
            value={employeeData?.email}
            required
          />
        </div>
        <div className="flex w-full justify-between">
          <label>Mobile No</label>
          <input
            className="border border-black rounded-md px-2 py-1 w-[50%]"
            type="number"
            name="mobileNo"
            onChange={handleChange}
            value={employeeData?.mobileNo}
            required
          />
        </div>
        <div className="flex w-full justify-between">
          <label>Designation</label>
          <select
            className="border border-black rounded-md px-2 py-1 w-[50%] cursor-pointer"
            onChange={handleChange}
            name="designation"
            value={employeeData?.designation}
            required
          >
            <option disabled value="">
              Select Designation
            </option>
            <option className="cursor-pointer" value="hr">
              HR
            </option>
            <option className="cursor-pointer" value="manager">
              Manager
            </option>
            <option className="cursor-pointer" value="sales">
              Sales
            </option>
          </select>
        </div>
        <div className="flex w-full justify-between">
          <label>Gender</label>
          <div className="w-[50%] flex justify-start gap-4 flex-wrap">
            <label className="cursor-pointer flex gap-2">
              <input
                type="radio"
                value="male"
                name="gender"
                className="cursor-pointer"
                onChange={handleChange}
                checked={employeeData?.gender === "male"}
              />
              Male
            </label>
            <label className="cursor-pointer flex gap-2">
              <input
                type="radio"
                value="female"
                name="gender"
                className="cursor-pointer"
                onChange={handleChange}
                checked={employeeData?.gender === "female"}
              />
              Female
            </label>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <label>Course</label>
          <div className="w-[50%] flex justify-start gap-4 flex-wrap">
            <label className="cursor-pointer flex gap-2">
              <input
                type="checkbox"
                value="mca"
                name="course"
                className="cursor-pointer"
                onChange={handleChange}
                checked={employeeData?.course?.includes("mca")}
              />
              MCA
            </label>
            <label className="cursor-pointer flex gap-2">
              <input
                type="checkbox"
                value="bca"
                name="course"
                className="cursor-pointer"
                onChange={handleChange}
                checked={employeeData?.course?.includes("bca")}
              />
              BCA
            </label>
            <label className="cursor-pointer flex gap-2">
              <input
                type="checkbox"
                value="bsc"
                name="course"
                className="cursor-pointer"
                onChange={handleChange}
                checked={employeeData?.course?.includes("bsc")}
              />
              BSC
            </label>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <label>Image Upload</label>
          {!editImage && id ? (
            <div className="w-[50%] flex gap-2">
              <img src={employeeData?.image} className="w-16 h-16" />
              <RxCross1
                className="cursor-pointer"
                onClick={() => setEditImage(true)}
              />
            </div>
          ) : (
            <input
              className="w-[50%]"
              accept=".jpg, .jpeg, .png"
              type="file"
              onChange={handleChange}
              required
            />
          )}
        </div>
        <p className="text-red-500">{errorMessage}</p>
        <button
          disabled={loading || fileUploadLoader}
          className="bg-black border rounded-md border-black text-white h-[2.5rem] w-[6rem] flex justify-center items-center"
        >
          {loading || fileUploadLoader ? (
            <Loader type="button" />
          ) : id ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </form>
      {showPopup && (
        <Popoup
          title={
            id
              ? "Employee Updated Successfully!!!"
              : `Employee Created Successfully!!!`
          }
          redirectTo={"/employee-list"}
        />
      )}
    </>
  );
};

export default CreateEmployee;
