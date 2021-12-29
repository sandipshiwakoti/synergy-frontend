import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import EmployeeService from "../../../services/EmployeeService";
import EmployeeForm from "./EmployeeForm";

const EmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    fullname: "",
    dob: "",
    mobileNo: "",
    email: "",
    gender: "",
    nationality: "",
    tCountry: "",
    tProvince: "",
    tDistrict: "",
    tMunicipality: "",
    tTole: "",
    tWard: "",
    pCountry: "",
    pProvince: "",
    pDistrict: "",
    pMunicipality: "",
    pTole: "",
    pWard: "",
    grandfatherName: "",
    grandmotherName: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    medicalCondition: "",
    isAllergic: "",
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const action = async (e) => {
    e.preventDefault();
    const newEmployee = {
      personalInformation: {
        fullname: employee.fullname,
        dob: employee.dob,
        mobileNo: employee.mobileNo,
        email: employee.email,
        gender: employee.gender,
        nationality: employee.nationality,
      },
      familyInformation: {
        grandfatherName: employee.grandfatherName,
        grandmotherName: employee.grandmotherName,
        fatherName: employee.fatherName,
        motherName: employee.motherName,
        spouseName: employee.spouseName,
      },
      healthInformation: {
        medicalCondition: employee.medicalCondition,
        isAllergic: employee.isAllergic,
      },
      permanentAddressInformation: {
        country: employee.pCountry,
        province: employee.pProvince,
        district: employee.pDistrict,
        municipality: employee.pMunicipality,
        tole: employee.pTole,
        ward: employee.pWard,
      },
      temporaryAddressInformation: {
        country: employee.tCountry,
        province: employee.tProvince,
        district: employee.tDistrict,
        municipality: employee.tMunicipality,
        tole: employee.tTole,
        ward: employee.tWard,
      },
    };
    try {
      const data = await EmployeeService.addEmployee(newEmployee);
      if (data) {
        toast.success("Employee has been added successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Employee cannot be added!", {
          position: "top-center",
        });
      }
    } catch (Err) {
      toast.error("Employee cannot be added!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <h1 className="page-title">Create Employee</h1>
      <div className="d-flex justify-content-end">
        <Link to="/viewEmployees" className="btn btn-success">
          Back to list
        </Link>
      </div>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        action={action}
        actionType="Create"
      />
    </>
  );
};

export default EmployeeComponent;
