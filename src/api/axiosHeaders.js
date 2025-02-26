import axios from "axios";
import { useSelector } from "react-redux";
import { useHeaders } from "./headers";

const BASE_URL = 'http://localhost:8000/api/v1';

// const accessToken = useSelector((state) => state.data.accessToken);

export default axios.create({
    baseURL: BASE_URL,
    credentials:true
});
