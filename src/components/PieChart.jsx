import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
    pie chart
    </>
  );
};

export default PieChart;
