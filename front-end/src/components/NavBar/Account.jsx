import React from "react";
import { useSelector } from "react-redux";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Identicon from "../Identicon";

const Account = ({ disconnect }) => {
  const wallet = useSelector((state) => state.userData.value);

  return (
    <div className="account">
      <div className="account-box">
        <Identicon account={wallet.account} />
        <div className="account-info">
          <p>Rupam</p>
          <small>{wallet.account.slice(0, 15)}...</small>
        </div>
      </div>
      <div className="account-menu">
        {/* <div className="account-menu-item">
          <FaUserAlt color="white" />
          <a href={`#`}>Dashboard</a>
        </div>
        <div className="account-menu-item">
          <FaUserEdit color="white" />
          <a href="#">Edit Profile</a>
        </div> */}
        <div className="account-menu-item" onClick={disconnect}>
          <MdLogout color="white" />
          <a href="#">Disconnect</a>
        </div>
      </div>
    </div>
  );
};

export default Account;
