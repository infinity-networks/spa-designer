import { Card, Empty } from "@arco-design/web-react";
import { ComDepSchema, RawMetaData } from "types";

interface Props {
  comDep: ComDepSchema | null;
  setMetaData: (metaData: RawMetaData) => void;
}

const SourceItem = () => {};

const MaterialLibrary = ({ comDep, setMetaData }: Props) => {
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
