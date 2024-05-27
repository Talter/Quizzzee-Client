import React from "react";
import { Card, Statistic, Row, Col, Divider, Avatar, Progress } from "antd";

// Fake data for demonstration
const fakeUserData = [
  { name: "John Doe", avatar: "J", count: 25 },
  { name: "Jane Smith", avatar: "J", count: 20 },
  { name: "Alice Johnson", avatar: "A", count: 18 },
];

const fakeQuizzData = [
  { name: "Quiz A", count: 10 },
  { name: "Quiz B", count: 8 },
  { name: "Quiz C", count: 6 },
];

const totalContributions = fakeUserData.reduce((acc, curr) => acc + curr.count, 0);

const MainPage = () => {
  // Calculate total new users and quizzes
  const totalNewUsers = fakeUserData.reduce((acc, curr) => acc + curr.count, 0);
  const totalNewQuizzes = fakeQuizzData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="p-6">
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="New Users Last Month"
              value={totalNewUsers}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="New Quizzes Last Month"
              value={totalNewQuizzes}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
      <Row className="mt-6 justify-center">
        <Col span={24}>
          <div className="w-2/3 mx-auto">
            <Card>
              <h3 className="mb-4 text-center">Top 3 Contributors</h3>
              {fakeUserData.map((user, index) => (
                <div key={index} className="mb-4 grid grid-cols-12 items-center">
                  <Avatar className="col-span-1">{user.avatar}</Avatar>
                  <span className="col-span-2 ml-4">{user.name}</span>
                  <span className="col-span-1 text-center">{user.count}</span>
                  <div className="col-span-8 flex items-center">
                    <Progress
                      className="w-full"
                      percent={(user.count / totalContributions) * 100}
                      size="small"
                      showInfo={false} // Hides the percentage
                    />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </Col>
      </Row>
      <Divider />
      {/* Additional content can be added here */}
    </div>
  );
};

export default MainPage;
