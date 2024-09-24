import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, showEmployee } from "../features/employeeDetailSlice";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employeeData);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showEmployee());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const deleteEmployeeHandler = (id) => {
    dispatch(deleteEmployee(id));
  };

  const filterByName = (e) => {
    const searchedName = e.target.value.toLowerCase();
    let newEmployees = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchedName)
    );
    console.log(newEmployees);
    setFilteredEmployees(newEmployees);
  };

  const handleEdit = (id) => {
    console.log("edit post: ", id);
    navigate(`/create-employee/${id}`);
  };

  if (loading) {
    return (
      <h1>
        <Loader type="page" />
      </h1>
    );
  }
  return (
    <>
      {filteredEmployees && (
        <>
          <div className="flex justify-between m-4 items-center">
            <button
              onClick={() => navigate("/create-employee")}
              className="bg-black border-2 border-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
            >
              Create Employee
            </button>
            <p>Employees Count: {filteredEmployees.length}</p>
            <input
              className="border-2 border-black p-2 rounded-md"
              type="text"
              placeholder="Search Name"
              onChange={filterByName}
            />
          </div>
          {filteredEmployees.length === 0 ? (
            <div className="mt-12 text-xl text-center">No Employees</div>
          ) : (
            <table className="m-4 mt-8">
              <thead>
                <tr>
                  <th className=" border border-black py-1 px-2 w-[5%] text-center">
                    Sno
                  </th>
                  <th className=" border border-black py-1 px-2 w-[5%]">
                    Profile
                  </th>
                  <th className=" border border-black py-1 px-2 w-[10%]">
                    Name
                  </th>
                  <th className=" border border-black py-1 px-2 w-[20%]">
                    Email
                  </th>
                  <th className=" border border-black py-1 px-2 w-[15%]">
                    Mobile No
                  </th>
                  <th className=" border border-black py-1 px-2 w-[10%]">
                    Designation
                  </th>
                  <th className=" border border-black py-1 px-2 w-[5%]">
                    Gender
                  </th>
                  <th className=" border border-black py-1 px-2 w-[10%]">
                    Course
                  </th>
                  <th className=" border border-black py-1 px-2 w-[10%]">
                    Create Date
                  </th>
                  <th className=" border border-black py-1 px-2 w-[10%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, id) => (
                  <tr key={emp?._id}>
                    {console.log(emp)}
                    <td className="border border-black py-1 px-2 text-center">
                      {id + 1}
                    </td>
                    <td className="border border-black py-1 px-1 text-center">
                      <img src={emp?.image} className="w-full h-full" />
                    </td>
                    <td className="border border-black py-1 px-2 text-center capitalize">
                      {emp?.name}
                    </td>
                    <td className="border border-black py-1 px-2 text-center">
                      {emp?.email}
                    </td>
                    <td className="border border-black py-1 px-2 text-center">
                      {emp?.mobileNo}
                    </td>
                    <td className="border border-black py-1 px-2 text-center capitalize">
                      {emp?.designation}
                    </td>
                    <td className="border border-black py-1 px-2 text-center">
                      {emp?.gender}
                    </td>
                    <td className="border border-black py-1 px-2 text-center uppercase">
                      {emp?.course}
                    </td>
                    <td className="border border-black py-1 px-2 text-center">
                      {emp?.createDate}
                    </td>
                    <td className="border border-black py-2 px-2 text-center">
                      <div className="flex flex-wrap justify-center items-center gap-4">
                        <button
                          className="text-green-800"
                          onClick={() => handleEdit(emp?._id)}
                        >
                          <MdEdit className="w-6 h-6" />
                        </button>
                        <button
                          className="text-red-800"
                          onClick={() => deleteEmployeeHandler(emp?._id)}
                        >
                          <MdDelete className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
};

export default EmployeeList;
