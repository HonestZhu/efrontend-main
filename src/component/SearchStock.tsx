import { Col, Row, Input } from "antd";

import { useState } from "react";

const { Search } = Input;

interface SearchStockProps {
  onSearch: (keyword: string, field: string) => void;
}

const SearchStock: React.FC<SearchStockProps> = ({ onSearch }) => {
  const [nameKeyword, setNameKeyword] = useState("");
  const [codeKeyword, setCodeKeyword] = useState("");

  const handleNameSearch = () => {
    onSearch(nameKeyword, "name");
  };

  const handleCodeSearch = () => {
    onSearch(codeKeyword, "code");
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameKeyword(value);
    onSearch(value, "name");
  };

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodeKeyword(value);
    onSearch(value, "code");
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <div className="search-stock-name">
          <Search
            placeholder="please enter stock-name"
            allowClear
            enterButton="search"
            style={{ width: "100%", marginBottom: 25}}
            onSearch={handleNameSearch}
            onChange={handleNameInputChange}
          />
        </div>
      </Col>
      <Col span={12}>
        <div className="search-stock-code">
          <Search
            placeholder="please enter stock-code"
            allowClear
            enterButton="serch"
            style={{ width: "100%", marginBottom: 25 ,  marginRight:50}}
            onSearch={handleCodeSearch}
            onChange={handleCodeInputChange}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SearchStock;
