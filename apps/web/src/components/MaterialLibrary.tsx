import { Card, Empty } from "@arco-design/web-react";
import { ComDepSchema, RawMetaData } from "types";

interface MaterialItemProps {}

const MaterialItem: React.FC<MaterialItemProps> = ({}) => {
  return <></>;
};

interface MaterialLibraryProps {
  comDep: ComDepSchema | null;
  setMetaData: (metaData: RawMetaData) => void;
}

const MaterialLibrary: React.FC<MaterialLibraryProps> = ({
  comDep,
  setMetaData,
}) => {
  return (
    <Card title="物料库" bordered={false}>
      {comDep && Object.keys(comDep || {}).length > 0 ? (
        <>
          {Object.keys(comDep || {}).map((key) => {
            return <div key={key}>{key}</div>;
          })}
        </>
      ) : (
        <Empty />
      )}
    </Card>
  );
};

export default MaterialLibrary;
