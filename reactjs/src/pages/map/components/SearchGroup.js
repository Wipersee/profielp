import { useState } from "react";
import { Card, Input, Space } from "antd";
import "./../css/searchgroup.css";

const { Search } = Input;

const SearchGroup = () => {
  const [loading, setLoging] = useState(false);
  const onSearch = (value) => {
    setLoging(true);
    console.log(value);
    setTimeout(() => {
      setLoging(false);
    }, 3000);
  };

  return (
    <Card className="main-card-search">
      <h2>Profielp</h2>
      <Search
        placeholder="Search for master"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        loading={loading}
      />
    </Card>
  );
};

export default SearchGroup;
