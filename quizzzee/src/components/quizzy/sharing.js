import { CopyFilled } from "@ant-design/icons";
import { message } from "antd";

const Sharing = ({ setIsSharing, url }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div
      className="fixed w-screen h-screen top-0 bg-black bg-opacity-40"
      onClick={() => setIsSharing(false)}
    >
      <div className="bg-mainColor sm:w-2/4 lg:w-1/3 p-9 rounded-2xl fixed top-1/3 sm:left-1/4 lg:left-1/3 shadow-2xl">
        {contextHolder}
        <input
          className="mb-7 bg-white rounded p-3 w-full"
          value={url}
          readOnly
        />

        <br />
        <span className="float-end">
          <button
            onClick={(event) => {
              navigator.clipboard.writeText(url);
              messageApi.open({
                type: "success",
                content: "URL copied to clipboard!",
              });
              event.stopPropagation();
            }}
            className="p-3 bg-subColor hover:bg-subColorLight rounded text-white font-bold"
          >
            <CopyFilled /> Copy URl
          </button>
          <button
            onClick={() => setIsSharing(false)}
            className="p-3 ml-7 bg-mainColor hover:bg-mainColorBold rounded text-white font-bold"
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
};

export default Sharing;
