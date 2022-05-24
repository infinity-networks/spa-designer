import React, {
  useState,
  useCallback,
  useEffect,
  Suspense,
  useMemo,
} from "react";
import * as Antd from "antd";

const packages = {
  react: React,
  antd: Antd,
} as Record<string, any>;

const getParsedModule = (code: string) => {
  let module = {
    exports: {},
  };
  const require = (name: string) => {
    return packages[name];
  };
  Function("require, exports, module", code)(require, module.exports, module);
  return module;
};

const fetchComponent = async (url: string) => {
  const text = await fetch(url).then((a) => {
    if (!a.ok) {
      throw new Error("Network response was not ok");
    }
    return a.text();
  });
  const module = getParsedModule(text);
  return { default: module.exports };
};

interface ReactRenderProps {
  library: string; // UMD挂载点
  runtime: string; // 运行时代码
  props: any;
  children: JSX.Element | null;
}

const ReactRender: React.FC<ReactRenderProps> = ({
  runtime,
  props,
  children,
}) => {
  const Component = useMemo(() => {
    return React.lazy(async () => fetchComponent(runtime) as any);
  }, [name]);

  return (
    <Suspense
      fallback={
        <div
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <span style={{ fontSize: 50 }}>Loading...</span>
        </div>
      }
    >
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};

export default ReactRender;
