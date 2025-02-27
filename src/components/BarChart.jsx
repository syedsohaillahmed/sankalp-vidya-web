import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import CustomTable from "../SamplePages/CustomTable";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const headers = ['Name', 'Age', 'Email'];
  const data = [
    { name: 'John Doe', age: 25, email: 'john@example.com' },
    { name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    { name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
    { name: 'Bob Brown', age: 35, email: 'bob@example.com' },
    { name: 'Charlie Davis', age: 22, email: 'charlie@example.com' },
    { name: 'Eva Green', age: 27, email: 'eva@example.com' },
  ];

  return (
    <>
    <CustomTable headers={headers} data={data} title="User Details" />
    </>
  );
};

export default BarChart;
