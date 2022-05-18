import { useEffect, useState } from "react";
import {
  ComDefSchema,
  ComDepSchema,
  ComLibSchema,
  ComRefSchema,
  ComTreeSchema,
} from "types";
import Simulator from "simulator";
import data from "./data.json";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [comDef, setComDef] = useState<ComDefSchema>(data.comDef as any);
  const [comRef, setComRef] = useState<ComRefSchema>(data.comRef as any);
  const [comLib, setComLib] = useState<ComLibSchema>(data.comLib as any);
  const [comDep, setComDep] = useState<ComDepSchema>(data.comDep as any);

  const [comTree, setComTree] = useState<ComTreeSchema | null>(null);

  useEffect(() => {
    const comTree = { ...comDef["root"] } as ComTreeSchema;
    const filterChildren = (parentId: string) => {
      if (!comDef || !comRef || !comLib) return;
      const children = Object.keys(comRef)
        .filter((key) => comRef[key].parentId === parentId)
        .map((key) => ({ ...comRef[key], ...comDef[key], id: key }));
      children.forEach((item) => {
        // console.log("item", item.type, comLib[item.type]);
        const props =
          comLib[item.type] && (comLib[item.type] as any)?.props
            ? { ...(comLib[item.type] as any).props }
            : {};
        console.log("props", props, item.name, item.id, comDef[item.id].props);
        item.props = {
          ...props,
          ...comDef[item.id]?.props,
        };
        item.type = (comLib[item.type] as any)?.runtime;
        item.children = filterChildren(item.id);
      });

      return children.sort((a: any, b: any) => a?.sort - b?.sort);
    };
    comTree.children = filterChildren("root") || [];
    console.log("comTree", comTree);
    setComTree(comTree);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Simulator comTree={comTree} />
    </DndProvider>
  );
}

export default App;
