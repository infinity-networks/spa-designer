import { Card, Empty } from "@arco-design/web-react";
import { useReactFlow, useStoreApi } from "react-flow-renderer";
import { ComDefSchema, RawMetaData } from "types";

interface Props {
  comDef: ComDefSchema;
  setMetaData: (metaData: RawMetaData) => void;
}

const MaterialConfigurator = ({ comDef, setMetaData }: Props) => {
  const store = useStoreApi();
  const { setNodes } = useReactFlow();
  return (
    <Card title="属性配置器" bordered={false}>
      {comDef && Object.keys(comDef || {}).length > 0 ? <></> : <Empty />}
    </Card>
  );
};

export default MaterialConfigurator;
