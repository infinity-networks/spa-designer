import { useContext, useEffect } from "react";
import { DndContext } from "react-dnd";
import Frame, { FrameContext } from "react-frame-component";

interface Props {
  children?: JSX.Element;
}

const DndFrame = ({ children }: Props): JSX.Element => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    (dragDropManager?.getBackend() as any).addEventListeners(window);
  }, []);

  return <>{children || null}</>;
};

export default DndFrame;
