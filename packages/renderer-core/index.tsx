import DndComponent from "./DndComponent";

interface Props {
  comTree: any;
}

const Renderer = ({ comTree }: Props) => {
  const renderComTree = (children: any[], parentId: string) => {
    return <DndComponent></DndComponent>;
  };

  return (
    <>
      {comTree ? (
        <DndComponent>
          {renderComTree(comTree?.children || [], "root")}
        </DndComponent>
      ) : null}
    </>
  );
};

export default Renderer;
