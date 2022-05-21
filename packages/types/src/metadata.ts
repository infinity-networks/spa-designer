import { CSSProperties } from "react";

export interface ComDefSchema {
  name: string;
  type: string;
  library?: string;
  props: {
    [x: string]: any;
    style?: CSSProperties;
  };
  style?: CSSProperties;
  sort?: number;
  inputs?: any[];
  outputs?: any[];
  children?: any[];
}

export interface ComRefSchema {
  id: string;
  parentId: string;
}

export interface ComLibSchema {
  name: string;
  type: string;
  schema?: string;
  library?: string;
  props?: {
    [x: string]: any;
    style?: CSSProperties;
  };
  inputs?: any[];
  outputs?: any[];
}

interface FlowNode {
  id: string; // nanoid(10)
  type: string; // 节点类型
  data: {
    [x: string]: any;
    title: string;
    runtime?: string;
  };
  position: { x: number, y: number },
}

export interface ComFlowSchema {
  nodes: FlowNode[];
  edges: [];
  paths: [];
}

export interface ComDepSchema {
  fileId: number;
  env: "DEV" | "TEST" | "PRT" | "PROD"
  version: number;
}

export interface CodeTreeSchema extends ComLibSchema {
  children: ComRefSchema[];
}

export interface RawMetaData {
  focused: string;
  comDef: Record<string, ComDefSchema>; // nanoid(12)
  comRef: Record<string, ComRefSchema>;
  comLib: Record<string, ComLibSchema>;
  comFlow: ComFlowSchema;
  comDep: Record<string, ComDepSchema>;
}

interface ComNodeSchema {
  id: string;
  parentId: string;
  name: string;
  type: string;
  library?: string;
  props: {
    [x: string]: any;
    style?: CSSProperties;
  };
  sort?: number;
  inputs?: any[];
  outputs?: any[];
  children: ComNodeSchema[] | [];
}

export interface ComTreeSchema {
  id: string;
  name: string;
  type: string;
  props: {
    [x: string]: any;
    style?: CSSProperties;
  };
  children?: ComNodeSchema[];
}