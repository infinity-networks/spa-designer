import { VueInReact } from "vuera";

interface Props {
  library: string;
  runtime: string;
  props: {
    [x: string]: any;
  };
  children: JSX.Element | null;
}

const VueRenderer = ({ library, runtime, props, children }: Props) => {
  return VueInReact();
};

export default VueRenderer;
