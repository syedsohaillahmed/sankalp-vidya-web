import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
    bar vhart
    </>
  );
};

export default BarChart;
