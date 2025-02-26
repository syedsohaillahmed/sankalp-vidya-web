import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    line chart
    </>
  );
};

export default LineChart;
