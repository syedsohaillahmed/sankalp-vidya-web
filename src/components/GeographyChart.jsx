import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
    geography chart
    </>
  );
};

export default GeographyChart;
