import { useSelector } from "react-redux";

export const useHeaders = () => {
  const accessToken = useSelector((state) => state.data.accessToken);

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken || ""}`
  };
};
