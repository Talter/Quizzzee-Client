import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionSetOverview from "../../components/quizzy/questionSetOverview";
import { UserContext } from "../../context/UserContext";
import { Card, Col, message, Row, Select, Space } from "antd";

function QuizzzyDetail() {
  const navi = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState();
  const [reporter, setReporter] = useState();
  const [reported, setReported] = useState();
  const [quizzzies, setQuizzzies] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const { token, userId } = useContext(UserContext);

  const fetchReport = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/${id}`,
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
      if (data.status != "Not Checked") {
        data.done = true;
      }
      setReport(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUser = async (id, setData) => {
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
      setData({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.birthDate,
        favorite: data.favorites.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchQuizzzy = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/quizzzy/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuizzzies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openMessage = (type, content) => {
    messageApi.open({
      type,
      content,
    });
  };

  const handleResolve = async () => {
    if (report.done) {
      openMessage("warning", "This report has been resolved");
      return;
    }
    if (report.status === "Not Checked") {
      openMessage("error", "Please choose your action before continue");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(report),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to report");
      }
      openMessage("success", "Report resolved, redirect in 3...");
      setTimeout(() =>{
        navi("/admin/report");
      },3000)
    } catch (error) {
      console.error("Error reporting:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  useEffect(() => {
    if (report) {
      fetchUser(report.createdBy, setReporter);
      fetchQuizzzy(report.quizzzyId);
    } else {
      return;
    }
  }, [report]);

  useEffect(() => {
    if (quizzzies) {
      fetchUser(quizzzies.createdBy._id, setReported);
    } else {
      return;
    }
  }, [quizzzies]);
  return (
    <div>
      {contextHolder}
      <Row className="mt-12">
        <Col span={12} className="px-12">
          {" "}
          <Card title="Reporter">
            {reporter && (
              <div>
                <p>
                  Username:{" "}
                  {reporter.username ? reporter.username : "Not updated yet"}
                </p>
                <p>
                  First Name:{" "}
                  {reporter.firstName ? reporter.firstName : "Not updated yet"}
                </p>
                <p>
                  Last Name:{" "}
                  {reporter.lastName ? reporter.lastName : "Not updated yet"}
                </p>
                <p>
                  Email: {reporter.email ? reporter.email : "Not updated yet"}
                </p>
                <p>
                  Birth Date:{" "}
                  {reporter.birthDate ? reporter.birthDate : "Not updated yet"}
                </p>
                <p>Favorite: {reporter.favorite} Quizzzy</p>
              </div>
            )}
          </Card>
        </Col>
        <Col span={12} className="px-12">
          <Card title="Reported">
            {reported && (
              <div>
                <p>
                  Username:{" "}
                  {reported.username ? reported.username : "Not updated yet"}
                </p>
                <p>
                  First Name:{" "}
                  {reported.firstName ? reported.firstName : "Not updated yet"}
                </p>
                <p>
                  Last Name:{" "}
                  {reported.lastName ? reported.lastName : "Not updated yet"}
                </p>
                <p>
                  Email: {reported.email ? reported.email : "Not updated yet"}
                </p>
                <p>
                  Birth Date:{" "}
                  {reported.birthDate ? reported.birthDate : "Not updated yet"}
                </p>
                <p>Favorite: {reported.favorite} Quizzzy</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="mt-12">
        <Col span={24} className="px-12">
          {" "}
          <Card title="Reported Quizzzy">
            {quizzzies && !quizzzies.isPrivate && (
              <div>
                <p>Title: {quizzzies.title ? quizzzies.title : "Error"}</p>
                <p>
                  Description:{" "}
                  {quizzzies.description ? quizzzies.description : "Error"}
                </p>
                <p>
                  Tags:{" "}
                  {quizzzies.tags.length > 0
                    ? quizzzies.tags.map((tag, index) => (
                        <span>
                          {tag}
                          {index + 1 == quizzzies.tags.length ? "" : ", "}
                        </span>
                      ))
                    : "No tag"}
                </p>
                <p>
                  Total Quizz:{" "}
                  {quizzzies.quizzzes ? quizzzies.quizzzes.length : "Error"}
                </p>
                <p>
                  Create Date:{" "}
                  {quizzzies.createdAt
                    ? quizzzies.createdAt.slice(0, 10)
                    : "Error"}
                </p>
                <p>
                  Last Update Date:{" "}
                  {quizzzies.updatedAt
                    ? quizzzies.updatedAt.slice(0, 10)
                    : "Error"}
                </p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <p className="mt-12 ml-5 font-semibold text-lg">Quizzzes</p>
        <div className="px-12 py-6 grid grid-flow-row gap-10 ">
          {quizzzies &&
            quizzzies.quizzzes.map((quizzzy) => (
              <QuestionSetOverview quizzzy={quizzzy} key={quizzzy._id} />
            ))}
        </div>
      </Row>
      {report && report.done ? (
        <div className="text-center text-xl py-6 my-6 mx-48 rounded-lg border border-mainColor">Admin action: {report.status}</div>
      ) : (
        <div className="flex justify-center gap-10 my-12">
          <Space wrap>
            <Select
              value={report ? report.status : "Not Checked"}
              onChange={(e) => {
                setReport((prev) => ({ ...prev, status: e, resolvedBy: userId }));
              }}
              className="w-36 h-10 text-lg "
              options={[
                {
                  value: "Not Checked",
                  label: "Not Checked",
                  disabled: true
                },
                {
                  value: "Deny Report",
                  label: "Deny Report",
                },
                {
                  value: "Block User",
                  label: "Block User",
                },
                {
                  value: "Block Quizzzy",
                  label: "Block Quizzzy",
                },
              ]}
            />
          </Space>
          <button
            onClick={() => handleResolve()}
            className="w-24 h-10 bg-red-500 text-lg text-white font-semibold rounded-lg transform transition hover:scale-105 active:scale-90"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizzzyDetail;
