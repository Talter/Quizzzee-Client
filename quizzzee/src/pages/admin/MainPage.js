import React, { useContext, useEffect, useState } from "react";
import { Card, Statistic, Row, Col, Divider } from "antd";
import { UserContext } from "../../context/UserContext";

const MainPage = () => {
  const { token } = useContext(UserContext);
  const [length1, setLength1] = useState(0);
  const [length2, setLength2] = useState(0);
  const [length3, setLength3] = useState(0);
  useEffect(() => {
    const fetchData = async (link, lazy) => {
      try {
        const response = await fetch(link, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        lazy(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/users`, setLength1);
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/quizzzy`, setLength2);
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/report`, setLength3);

  }, []);
  return (
    <div className="p-6">
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total users"
              value={length1}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Quizzzies"
              value={length2}
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
              <Statistic
                title="Unchecked reports"
                value={length3}
                precision={0}
                valueStyle={{ color: "#d61c44" }}
              />
            </Card>
          </div>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default MainPage;
