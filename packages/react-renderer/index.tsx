import { useState, useCallback, useEffect } from "react";

interface Props {
  library: string; // UMD挂载点
  runtime: string; // 运行时代码
  props: any;
  children: JSX.Element | null;
}

const ReactRender = ({ library, runtime, props, children }: Props) => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  const loadComponent = useCallback(async () => {
    window.eval(`${runtime}`);
    const { default: component } = (window as any)[library];
    setComponent(() => component);
  }, [setComponent]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  if (Component) {
    return <Component {...props}>{children}</Component>;
  }

  return null;
};

export default ReactRender;
