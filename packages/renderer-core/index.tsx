import { ComTreeSchema, ComNodeSchema, SimulatorMode } from "types";
import ReactRenderer from "react-renderer";
import React from "react";
interface Props {
  comTree: ComTreeSchema | null;
  mode: SimulatorMode;
}

const Renderer = ({ comTree }: Props) => {
  const renderComTree = (
    children: ComNodeSchema[],
    parentId: string
  ): JSX.Element => {
    return (
      <>
        {children.map((item) => (
          <ReactRenderer
            library={item.library}
            runtime={item.runtime}
            props={item.props}
          >
            {renderComTree(item.children || [], item.id)}
          </ReactRenderer>
        )) || null}
      </>
    );
  };

  return (
    <>
      {comTree ? (
        <>
          {React.createElement(
            "div",
            { ...comTree.props },
            renderComTree(comTree?.children || [], "root")
          )}
        </>
      ) : null}
    </>
  );
};

export default Renderer;
