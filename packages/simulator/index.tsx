import Frame from "react-frame-component";
import DndFrame from "./DndFrame";
import { CodeTreeSchema, ComRefSchema } from "types";

interface Props {
  comTree: CodeTreeSchema | null;
}

const initialContent = `

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
