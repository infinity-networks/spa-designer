import { Card, Empty } from "@arco-design/web-react";
import { ComTreeSchema, RawMetaData } from "types";

interface Props {
  comTree: ComTreeSchema | null;
  setMetaData: (metaData: RawMetaData) => void;
}

const MaterialOutline = ({ comTree, setMetaData }: Props) => {
  return (
    <Card title="大纲树" bordered={false}>
      {comTree && Object.keys(comTree || {}).length > 0 ? <></> : <Empty />}
    </Card>
  );
};

export default MaterialOutline;
