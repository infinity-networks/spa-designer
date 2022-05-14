interface Props {
  children?: JSX.Element | null;
}

const DndComponent = ({ children }: Props) => {
  return <>{children}</>;
};

export default DndComponent;
