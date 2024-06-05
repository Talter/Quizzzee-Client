import React, { useContext, useState } from "react";
import { Radio, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Space from "antd/es/space";
import { UserContext } from "../../context/UserContext";
import { LoadingOutlined } from "@ant-design/icons";

const Report = ({ setIsReport, quizzzyId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [reportBody, setReportBody] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { userId } = useContext(UserContext);

  const openMessage = () => {
    messageApi.open({
      type: "success",
      content: "Report submitted!",
    });
  };

  const handleReport = () => {
    setIsFetching(true);
    const reportData = {
      quizzzyId,
      reportBody,
      userId: userId ? userId : "Anonymous",
    };
    console.log(reportData);

    setTimeout(() => {
      setIsFetching(false);
      setIsReport(false);
    }, 2000);
    openMessage();
  };

  return (
    <div
      className="fixed w-screen h-screen top-0 bg-black bg-opacity-40"
      onClick={() => setIsReport(false)}
    >
      <div
        className="bg-white sm:w-2/4 lg:w-1/3 p-9 rounded-2xl fixed top-1/3 sm:left-1/4 lg:left-1/3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {contextHolder}
        <h1 className="font-bold text-xl">Report this Quizzzy?</h1>
        <div className="my-2">
          <TextArea
            onChange={(e) => setReportBody(e.target.value)}
            className="text-md"
            placeholder="Add context for the problem of this Quizzzy"
          />
        </div>

        <div>
          <h3>Or use our available message</h3>
          <Radio.Group
            onChange={(e) => {
              setReportBody(e.target.value);
            }}
          >
            <Space direction="vertical">
              <Radio value={"Offensive Content"}>Offensive content</Radio>
              <Radio value={"Non-related Content"}>Non-related content</Radio>
              <Radio value={"Scam message"}>Scam message</Radio>
              <Radio value={"Plagiarism content"}>Plagiarism content</Radio>
            </Space>
          </Radio.Group>
        </div>

        <br />
        <span className="float-end">
          <button
            className="p-3 bg-subColor hover:bg-subColorLight rounded text-white font-bold"
            onClick={handleReport}
            disabled={isFetching}
          >
            {isFetching && <LoadingOutlined />} Report
          </button>
          <button
            className="p-3 ml-7 bg-mainColor hover:bg-mainColorBold rounded text-white font-bold"
            onClick={() => setIsReport(false)}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
};

export default Report;
