import { useState } from "react";
import { Card, Input, Divider, Select } from "antd";
import "./../css/searchgroup.css";

const { Search } = Input;
const { Option } = Select;

const SearchGroup = () => {
  const [loading, setLoging] = useState(false);
  const onSearch = (value) => {
    setLoging(true);
    console.log(value);
    setTimeout(() => {
      setLoging(false);
    }, 3000);
  };
  const children = []
  const props = ["Plumber", "Caretaker", "Carpenter", "Cobbler", "Electrician", "Gardener", "Mechanic", "Roofer", "Tiler"];
  for (let i = 0; i < props.length; i++){
    children.push(<Option key={i.toString(36) + i}>{props[i]}</Option>);
  }

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
      <Divider />
      <h4>Filters:</h4>
      <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Or select profi"
      maxTagCount='responsive'
    >
      {children}
    </Select>
    </Card>
  );
};

export default SearchGroup;
