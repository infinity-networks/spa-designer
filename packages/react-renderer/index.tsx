import React, { forwardRef, LegacyRef, Ref } from "react";
import { useState, useCallback, useEffect } from "react";

interface Props {
  library: string; // UMD挂载点
  runtime: string; // 运行时代码
  ref: LegacyRef<HTMLElement | any>;
  props: any;
  children: JSX.Element | null;
}

const ReactRender = ({ library, runtime, ref, props, children }: Props) => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  const loadComponent = async () => {
    window.eval(`${runtime}`);
    const { default: component } = (window as any)[library];
    setComponent(() => component);
  };

  useEffect(() => {
    loadComponent();
  }, []);

  if (Component) {
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }

  return null;
};

export default forwardRef(ReactRender);
