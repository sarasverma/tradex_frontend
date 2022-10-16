import { SpeedDial, SpeedDialAction } from "@mui/material";
import React, { useState } from "react";
import { ImUser } from "react-icons/im";
import { RiFileListLine } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logOut } from "../../../states/actions/userAction";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <RiFileListLine />, name: "Orders", func: orders },
    { icon: <ImUser />, name: "Profile", func: account },
    { icon: <BiLogOut />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdSpaceDashboard />,
      name: "DashBoard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logOut());
    alert.success("Logout successfully !");
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        icon={
          user.avatar.url ? (
            <img
              className="speedDialIcon"
              src={user.avatar.url}
              alt="Profile"
            />
          ) : (
            <ImUser />
          )
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
