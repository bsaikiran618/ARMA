import { Edit, ShopTwoTone } from "@material-ui/icons";
import React, { useState } from "react";
import { InputField } from "../../../components/InputField/InputField";
import { useUser } from "../../../providers/user/UserProvider";
import { AnimatePresence, motion } from "framer-motion";
import axios from "../../../utils/axios";
import { Dialog } from "../../../components/Dialog/Dialog";

function FacultyProfile() {
  const [isEdit, setIsedit] = useState(false);
  const { faculty, setFaculty } = useUser();
  const [rollNumber, setrollNumber] = useState<string>(
    faculty?.rollNumber ?? " "
  );
  const [email, setEmail] = useState<string>(faculty?.email ?? " ");
  const [designation, setDesignation] = useState<string>(
    faculty?.designation ?? " "
  );
  const [phone, setPhone] = useState<string>(faculty?.phone ?? " ");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const save = async () => {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + "faculty/editProfile",
      { email: email, designation: designation, phone: phone }
    );
    const data = res.data;
    if (data.status === 1) {
      console.log(data.response);

      let role = data.response.role;
      data.response.role = {
        ADMIN: false,
        SAC: false,
        FO: false,
        FC: false,
        FACULTY: false,
      };
      console.log(role);

      role.forEach((element: any) => {
        data.response.role[element.name] = true;
      });

      setFaculty(data.response);
      setMessage("Details Updated");
    } else {
      setMessage(data.response);
    }
    setShow(true);
    setIsedit(false);
  };
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center m-auto">
        <p className="text-center item-center text-2xl font-semibold text-arma-blue">
          {faculty?.name}
          <AnimatePresence initial={false} exitBeforeEnter>
            {!isEdit && (
              <motion.span
                className="inline-block"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 360, opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.45 }}
              >
                <Edit
                  className="ml-3 text-black !text-xl cursor-pointer"
                  onClick={() => {
                    setIsedit(true);
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </p>
        <p className="text-black mt-4 mb-10 text-lg">Faculty</p>
        <div className="sm:w-[80%] md:w-max w-[90%]">
          <div className="flex flex-col gap-y-6 mb-6 w-full  md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="RollNumber"
              value={rollNumber}
              onChange={(e) => {
                setrollNumber(e.target.value);
              }}
              disabled={true}
            />

            <InputField
              className="mb-5"
              name="Email"
              value={email}
              disabled={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-6 mb-6 w-full md:flex-row sm:gap-x-8">
            <InputField
              className="mb-5"
              name="Designation"
              value={designation}
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
              disabled={!isEdit}
            />
            <InputField
              className="mb-5"
              name="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              disabled={!isEdit}
            />
          </div>
        </div>
        {isEdit && (
          <div className="flex gap-16">
            <button
              className="btn    bg-arma-title rounded-[8px] px-6 py-2 m-auto"
              onClick={() => {
                setEmail(faculty?.email ?? "");
                setDesignation(faculty?.designation ?? "");
                setPhone(faculty?.phone ?? "");
                setrollNumber(faculty?.rollNumber ?? "");
                setIsedit(false);
              }}
            >
              CANCEL
            </button>
            <button
              className="btn   bg-arma-title rounded-[8px] px-8 py-2 m-auto"
              onClick={save}
            >
              SAVE
            </button>
          </div>
        )}
      </div>

      <Dialog show={show} setShow={setShow} title={message} />
    </div>
  );
}

export { FacultyProfile };
