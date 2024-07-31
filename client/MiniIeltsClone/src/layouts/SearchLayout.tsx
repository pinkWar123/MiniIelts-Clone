import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";

export default function SearchLayout() {
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#333",
        }}
      >
        <p style={{ color: "white" }}>MiniIelts</p>
      </Header>
    </Layout>
  );
}
