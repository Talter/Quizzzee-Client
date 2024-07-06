import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Col, Row, Card } from "antd";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";
import { UserContext } from "../../context/UserContext";

function UserDetail() {
  const { id } = useParams();
  const [myQuizzzies, setMyQuizzzies] = useState([]);
  const { token } = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const [userInformation, setUserInformation] = useState({});
  const [userActivites, setUserActivities] = useState({});
  const [reports, setReports] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
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
        setUserInformation({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          birthDate: data.birthDate,
          favorite: data.favorites.length,
        });
        setUserActivities((prev) => ({
          ...prev,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }));
        setAvatar(data.image);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    } else return;
    console.log(id);
  }, [id, avatar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}/my_quizzzy`,
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
        setMyQuizzzies(data);
        setUserActivities((prev) => ({
          ...prev,
          totalQuizzzy: data.length
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id)
        fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/report?createdBy=${id}`,
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id) {
      fetchData();
    } else return;
  }, [id]);

  return (
    <div>
      <div className="flex justify-center">
        {avatar ? (
          <Avatar size={160} src={avatar} />
        ) : (
          <Avatar size={160} icon={<UserOutlined />} />
        )}
      </div>
      <Row className="mt-12">
        <Col span={12} className="px-12">
          {" "}
          <Card title="User Information">
            {userInformation && (
              <div>
                <p>
                  Username:{" "}
                  {userInformation.username
                    ? userInformation.username
                    : "Not updated yet"}
                </p>
                <p>
                  First Name:{" "}
                  {userInformation.firstName
                    ? userInformation.firstName
                    : "Not updated yet"}
                </p>
                <p>
                  Last Name:{" "}
                  {userInformation.lastName
                    ? userInformation.lastName
                    : "Not updated yet"}
                </p>
                <p>
                  Email:{" "}
                  {userInformation.email
                    ? userInformation.email
                    : "Not updated yet"}
                </p>
                <p>
                  Birth Date:{" "}
                  {userInformation.birthDate
                    ? userInformation.birthDate
                    : "Not updated yet"}
                </p>
                <p>Favorite: {userInformation.favorite} Quizzzy</p>
              </div>
            )}
          </Card>
        </Col>
        <Col span={12} className="px-12">
          {" "}
          <Card title="User Activites">
            {userActivites && (
              <div>
                <p>
                  Join Date:{" "}
                  {userActivites.createdAt
                    ? userActivites.createdAt
                    : "Not updated yet"}
                </p>
                <p>
                  Last Update Date:{" "}
                  {userActivites.updatedAt
                    ? userActivites.updatedAt
                    : "Not updated yet"}
                </p>
                <p>
                  Total Quizzzy Created:{" "}
                  {userActivites.totalQuizzzy
                    ? userActivites.totalQuizzzy
                    : "Not updated yet"}
                </p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <div>
        <div className="mt-12 text-2xl mx-6 font-semibold">
          All quizzzy made by user
        </div>
        <section className="mx-5 mt-10 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-16">
          {myQuizzzies.map((mq) => (
            <QuizzzyCard key={mq.id} quizzzy={mq} />
          ))}
        </section>
      </div>
      <div>
        <div className="mt-12 text-2xl mx-6 font-semibold">Reports</div>
        <div className="grid grid-cols-2 grid-flow-row gap-16 px-16 mt-8">
        { reports && reports.map((report) => (
            <div className="bg-mainColorBold text-white text-lg px-12 py-6 rounded-lg">
            <div>Quizzzy id: {report.quizzzyId}</div>
            <div>Issue: Reasons {report.message}</div>
            <div>Report Date: {report.createdAt.slice(0,10)}</div>
            <div>Action: {report.status}</div>
            <div>Report resolve date: {report.status != "Not Checked" ? report.updatedAt.slice(0,10): "Admin has not checked yet"}</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
