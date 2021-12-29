import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import dateformat from "dateformat";
import EmployeeService from "../../../services/EmployeeService";
import EmployeeForm from "./EmployeeForm";

const EmployeeComponent = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    id,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const getEmployee = async () => {
    try {
      const response = await EmployeeService.getEmployee(id);
      if (response) {
        const { data } = response;
        console.log(data);
        const {
          personalInformation: {
            fullname,
            dob,
            mobileNo,
            email,
            gender,
            nationality,
          },
          healthInformation: { medicalCondition, isAllergic },
          familyInformation: {
            grandfatherName,
            grandmotherName,
            fatherName,
            motherName,
            spouseName,
          },
          temporaryAddressInformation: {
            country: tCountry,
            province: tProvince,
            district: tDistrict,
            municipality: tMunicipality,
            tole: tTole,
            ward: tWard,
          },
          permanentAddressInformation: {
            country: pCountry,
            province: pProvince,
            district: pDistrict,
            municipality: pMunicipality,
            tole: pTole,
            ward: pWard,
          },
        } = data;
        const newData = {
          fullname,
          dob: dateformat(dob, "yyyy-mm-dd"),
          mobileNo,
          email,
          gender,
          nationality,
          tCountry,
          tProvince,
          tDistrict,
          tMunicipality,
          tTole,
          tWard,
          pCountry,
          pProvince,
          pDistrict,
          pMunicipality,
          pTole,
          pWard,
          grandfatherName,
          grandmotherName,
          fatherName,
          motherName,
          spouseName,
          medicalCondition,
          isAllergic,
        };
        setEmployee(newData);
        setIsLoading(false);
        setIsError(false);
        console.log(data);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  };

  const action = async (e) => {
    e.preventDefault();
    const newEmployee = {
      id,
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
    await EmployeeService.updateEmployee(newEmployee, id);
    toast.success("Employee has been updated successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    getEmployee();
  }, []);

  if (isLoading) {
    return (
      <>
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border"
            role="status"
            style={{ width: "5rem", height: "5rem", borderWidth: ".7rem" }}
          >
            <span class="sr-only"></span>
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1>Error...</h1>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">Update Employee</h1>
      <div className="d-flex justify-content-end">
        <Link to="/viewEmployees" className="btn btn-success">
          Back to list
        </Link>
      </div>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        action={action}
        actionType="Update"
      />
    </>
  );
};

export default EmployeeComponent;
