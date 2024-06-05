import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Col, Row, Card } from "antd";
import QuizzzyCard from "../../components/layout/quizzzyCard/QuizzzyCard";

function UserDetail() {
  const { id } = useParams();
  const [myQuizzzies, setMyQuizzzies] = useState([]);
  useEffect(() => {
    setMyQuizzzies([
      {
        _id: "0",
        title: "Skoobido",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consectetur libero. Nulla facilisi",
        createdBy: "Skoodido",
        updatedAt: "Sawconed",
      },
      {
        _id: "1",
        title: "Sawconed",
        description: "Sawconed",
        createdBy: "Sawconed",
        updatedAt: "Sawconed",
      },
    ]);
  });

  return (
    <div>
      <div className="flex justify-center">
        <Avatar size={160} icon={<UserOutlined />} />
      </div>
      <Row className="mt-12">
        <Col span={12} className="px-12">
          {" "}
          <Card title="User Information">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={12} className="px-12">
          {" "}
          <Card title="User Activites">
            <p>Join Date:</p>
            <p>Last Update Date:</p>
            <p>Total Quizzzy Created:</p>
            <p>. . .</p>
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
          <div className="bg-mainColorBold text-white text-lg px-12 py-6 rounded-lg">
            <div>Reported by: id</div>
            <div>Quizzzy id: id</div>
            <div>Issue: Reasons</div>
            <div>Report Date: Date</div>
            <div>Action: User Ban, Quizzzy Ban, Report Denied</div>
            <div>Report resolve date: Date</div>
          </div>
          <div className="bg-red-100">AA</div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
