import Frame from "react-frame-component";
import DndBridge from "./DndBridge";
import { ComTreeSchema } from "types";
import Renderer from "renderer-core";

const initialContent = `
<!DOCTYPE html>
<html style="width: 100%;height: 100%;">
<head>
  <style>
    .frame-content {
      width:100%;
      height:100%
    }
  </style>
</head>
<body style="margin:0px;width:100%;height: 100%;">
</body>
</html>
`;

interface Props {
  comTree: ComTreeSchema | null;
}

const Simulator = ({ comTree }: Props) => {
  return (
    <Frame
      initialContent={initialContent}
      mountTarget="body"
      style={{ width: "100%", height: "100%", border: "0" }}
    >
      <DndBridge>
        <Renderer comTree={comTree} mode="edit"></Renderer>
      </DndBridge>
    </Frame>
  );
};

export default Simulator;
