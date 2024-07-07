import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import { UserContext } from "../../context/UserContext";

function UserDetail() {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [admin, setAdmin] = useState();
  const [reports, setReports] = useState();
  const [reportCounter, setReportCounter] = useState(2);
  const [messageApi, contextHolder] = message.useMessage();
  const reportFiltered = reports ? reports.slice(0, reportCounter) : [];

  const openMessage = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admins/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAdmin(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAdminActivities = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admins/${id}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSetActive = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admins/${
          admin.isActive ? "block" : "unblock"
        }/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (admin.isActive) {
        openMessage("success", "Ban user successfully!");
      } else {
        openMessage("success", "Unban user successfully!");
      }
      fetchAdminInfo();
    } catch (error) {
      openMessage("error", "Error handle user's availability!");
    }
  };

  useEffect(() => {
    if (id) {
      fetchAdminInfo();
      fetchAdminActivities();
    }
    return;
  }, [id]);

  return (
    <div>
      {contextHolder}
      <div className="flex justify-center">
        <Avatar size={160} icon={<UserOutlined />} />
      </div>
      <div className="mt-2 text-2xl mx-6 font-semibold text-center">
        {admin && admin.username}
      </div>
      <div>
        <div className="mt-12 text-2xl mx-6 font-semibold">Reports</div>
        <div className="grid grid-cols-2 grid-flow-row gap-16 px-16 mt-8">
          {reports &&
            reportFiltered.map((report) => (
              <div className="bg-mainColorBold text-white text-lg px-12 py-6 rounded-lg">
                <div>Quizzzy id: {report.quizzzyId}</div>
                <div>Reasons: {report.message}</div>
                <div>Report Date: {report.createdAt.slice(0, 10)}</div>
                <div>Action: {report.status}</div>
                <div>
                  Report resolve date:{" "}
                  {report.status != "Not Checked"
                    ? report.updatedAt.slice(0, 10)
                    : "Admin has not checked yet"}
                </div>
              </div>
            ))}
          {reports && reportCounter < reports.length && (
            <div className="text-center col-span-2 text-xl ">
              <span
                className="hover:cursor-pointer px-2 py-2 bg-mainColorBold text-white rounded-lg"
                onClick={() =>
                  setReportCounter((reportCounter) => reportCounter + 2)
                }
              >
                See {reports.length - reportCounter} more
              </span>
            </div>
          )}
        </div>
      </div>
      {admin && (
        <div className="mt-12 text-2xl mx-6 font-semibold">
          <span>Availability: </span>
          <button
            onClick={() => handleSetActive()}
            className={
              "py-2 px-4 text-white rounded-lg " +
              (admin.isActive ? "bg-green-400" : "bg-red-500")
            }
          >
            {admin.isActive ? "Active" : "Banned"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
