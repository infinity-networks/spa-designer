import Frame from "react-frame-component";
import DndFrame from "./DndFrame";
import { ComTreeSchema, ComRefSchema } from "types";

interface Props {
  comTree: ComTreeSchema | null;
}

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
  <body style="margin:0px;width:100%;height: 100%; background: #D9D9D9">
  </body>
  </html>
`;

const Simulator = ({ comTree }: Props) => {
  return (
    <Frame
      initialContent={initialContent}
      mountTarget="body"
      style={{ width: "100%", height: "100%", border: "0" }}
    >
      <DndFrame></DndFrame>
    </Frame>
  );
};

export default Simulator;
