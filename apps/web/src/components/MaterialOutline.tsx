import { Card, Empty } from "@arco-design/web-react";
import { ComTreeSchema, RawMetaData } from "types";

interface MaterialOutlineProps {
  comTree: ComTreeSchema | null;
  setMetaData: (metaData: RawMetaData) => void;
}

const MaterialOutline: React.FC<MaterialOutlineProps> = ({
  comTree,
  setMetaData,
}) => {
  return (
    <Card title="大纲树" bordered={false}>
      {comTree && Object.keys(comTree || {}).length > 0 ? <></> : <Empty />}
    </Card>
  );
};

export default MaterialOutline;
