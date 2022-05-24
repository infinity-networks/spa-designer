import React, { useEffect, useState } from "react";
import "./App.less";
import { Layout, Menu, ResizeBox } from "@arco-design/web-react";
import MaterialLibrary from "./components/MaterialLibrary";
import MaterialOutline from "./components/MaterialOutline";
import data from "./data.json";
import { ComTreeSchema, RawMetaData } from "types";
import MaterialConfigurator from "./components/MaterialConfigurator";
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import Simulator from "simulator";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;
const Footer = Layout.Footer;
// scale
function App() {
  const [metaData, setMetaData] = useState<RawMetaData | any>(data);
  const [comTree, setComTree] = useState<ComTreeSchema | null>(null);
  const [activeMenu, setActiveMenu] = useState("0");

  const [nodes, setNodes, onNodesChange] = useNodesState(
    data?.comFlow?.nodes || []
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    data?.comFlow?.edges || []
  );

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const handleOutput = (id: string, sourceHandle: string, ...args: any[]) => {
    const nextNodes = metaData?.comFlow?.edges
      .filter(
        (item: any) => item.source === id && item?.sourceHandle === sourceHandle
      )
      .map((item: any) => item.target);
    // console.log('nextNodes', nextNodes);
    if (!nextNodes || nextNodes.length === 0) return;
    for (let i = 0; i < nextNodes.length; i++) {
      codeRunner(nextNodes[i], [...args]);
    }
  };

  const codeRunner = (id: string, inputValue: any) => {
    let node: any = metaData?.comFlow?.nodes.filter(
      (item: any) => item.id === id
    )[0];

    if (!node) return;
    // 构造 outputs, 并提供节点调用 handleOutput 的能力
    const outputs = node?.outputs?.reduce((outputs: any, outputId: string) => {
      return {
        ...outputs,
        [outputId]: new Proxy(new Function(), {
          apply() {
            handleOutput(id, outputId, arguments["2"]);
          },
        }),
      };
    }, {});
    const { runtime } = node?.data;
    new Function(inputValue, outputs, runtime)();
    // if (outputs) {
    //   Object.keys(outputs).forEach((outputId) => {
    //     outputs[outputId]("hello world");
    //   });
    // }
  };

  useEffect(() => {
    const { comDef, comRef, comLib } = metaData;
    if (!comDef || !comRef || !comLib) return;
    const comTree = {
      // body
      ...comDef["root"],
    };
    // comRef = { 1: {parentId: 'root'}}
    const filterChildren = (parentId: string) => {
      const children = Object.keys(comRef || {})
        .filter((key) => comRef[key].parentId === parentId) // 过滤出父节点下的所有子节点
        .filter((key) => comDef[key]); // 过滤出有定义的节点
      if (!children || children.length === 0) return []; // 没有子节点
      children.forEach((childKey: string) => {
        const child = comDef[childKey] || null; // 子节点定义
        if (!child) return; // 没有定义
        // props
        child.props = comDef["props"] || {};

        // inputs
        const inputs = child.inputs.reduce(
          (props: Record<string, any>, input: any) => {
            const { id, value } = input;
            return {
              ...props,
              id: value,
            };
          },
          {}
        );

        // outputs
        // {
        //  id: 'onClick',
        //  value: 'comFlow.nodes['id']'
        // }
        const outputs = child.outputs.reduce((outputs: any, output: any) => {
          const { id, value } = output;
          return {
            ...outputs,
            [id]: new Proxy(new Function(), {
              // 创建一个代理函数
              apply() {
                // 按钮触发的时候，调用代理函数
                handleOutput(value, "output0", arguments["2"]);
              },
            }),
          };
        }, {});

        // slots

        child.props = {
          ...child.props,
          ...inputs,
          ...outputs,
        };
        // children
        child.children = filterChildren(childKey);
      });
    };
    comTree.children = filterChildren("root") || [];
    setComTree(() => comTree);
  }, []);

  const renderSideNavBar = () => {
    return (
      <Menu onClickMenuItem={(key) => setActiveMenu(key)}>
        <Menu.Item key="0">大纲树</Menu.Item>
        <Menu.Item key="1">物料库</Menu.Item>
      </Menu>
    );
  };

  const renderSidePanel = () => {
    switch (activeMenu) {
      case "0":
        return <MaterialOutline comTree={comTree} setMetaData={setMetaData} />;
      case "1":
        return (
          <MaterialLibrary comDep={metaData.comDep} setMetaData={setMetaData} />
        );
    }
  };

  return (
    <ReactFlowProvider>
      <DndProvider backend={HTML5Backend}>
        <Layout className="main">
          <Header className="header"></Header>
          <Layout>
            <Sider className="navbar">{renderSideNavBar()}</Sider>
            <Sider className="sider">{renderSidePanel()}</Sider>
            <Layout>
              <Content>
                <ResizeBox.Split
                  direction="vertical"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  panes={[
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "-webkit-linear-gradient(top, transparent 7px, #CCCCCC 8px),-webkit-linear-gradient(left, transparent 7px, #CCCCCC 8px)",
                        backgroundSize: "8px 8px",
                      }}
                    >
                      <div style={{ width: "375px", height: "100%" }}>
                        <Simulator comTree={comTree} />
                      </div>
                    </div>,
                    <div style={{ height: "100%", minHeight: "48px" }}>
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                      >
                        <MiniMap />
                        <Controls />
                      </ReactFlow>
                    </div>,
                  ]}
                ></ResizeBox.Split>
              </Content>
              <Sider>
                <MaterialConfigurator
                  comDef={metaData.comDef}
                  setMetaData={setMetaData}
                />
              </Sider>
            </Layout>
          </Layout>
        </Layout>
      </DndProvider>
    </ReactFlowProvider>
  );
}

export default App;
