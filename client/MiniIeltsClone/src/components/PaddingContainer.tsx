interface PaddingContainerProps {
  children: React.ReactElement | React.ReactElement[];
  padding?: number;
}

const PaddingContainer: React.FC<PaddingContainerProps> = ({
  children,
  padding = 10,
}) => {
  return (
    <div
      style={{
        padding: `${padding}px`,
        border: "1px solid #eee",
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default PaddingContainer;
