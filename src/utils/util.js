import moment from "moment";

export const formatDate = (date, format) => {
  return moment(date).format(format);
};


// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Header from "../../components/Header";
// import MainCard from "../../components/cards/MainCard";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import useFetch from "../../hooks/useFetch";
// import { getUserDetailsByIdUC } from "../../api/svUrlConstructs";

// const UserDetailPage = () => {
//   const { id } = useParams();
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const accessToken = useSelector((state) => state.data.accessToken);
//   const { control, handleSubmit, reset, setValue } = useForm({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       contact: "",
//       gender: "",
//       avatar: "", // Avatar URL
//     },
//   });
//   const { fetchData, response } = useFetch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarPreview, setAvatarPreview] = useState("");

//   useEffect(() => {
//     if (id && accessToken) {
//       fetchData(getUserDetailsByIdUC(id), "GET", null, accessToken);
//     }
//   }, [id, accessToken]);

//   useEffect(() => {
//     if (response?.statuscode === 200) {
//       reset({
//         fullName: response.data.userDetails.fullName,
//         email: response.data.userDetails.email,
//         contact: response.data.userDetails.phoneNo,
//         gender: response.data.userDetails.gender,
//         avatar: response.data.userDetails.avatar || "", // Set avatar
//       });
//       setAvatarPreview(response.data.userDetails.avatar || "");
//     }
//   }, [response, reset]);

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result);
//         setValue("avatar", reader.result); // Save in RHF
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const onSubmit = (data) => {
//     console.log("Updated Data:", data);
//     setIsEditing(false);
//   };

//   return (
//     <Box m="20px">
//       <Header title="User Detail Page" subtitle="Manage User Profile Page" />
//       <MainCard
//         title="Profile"
//         secondary={
//           <Box mb="20px">
//             {!isEditing ? (
//               <Button color="secondary" variant="contained" onClick={() => setIsEditing(true)}>
//                 Edit
//               </Button>
//             ) : (
//               <Button color="secondary" variant="contained" onClick={() => setIsEditing(false)}>
//                 Cancel
//               </Button>
//             )}
//           </Box>
//         }
//       >
//         {/* Avatar Section */}
//         <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
//           <Avatar src={avatarPreview} sx={{ width: 100, height: 100, mb: 1 }} />
//           {isEditing && (
//             <IconButton color="primary" component="label">
//               <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
//               <PhotoCamera />
//             </IconButton>
//           )}
//         </Box>

//         {/* User Details Form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box display="grid" gap="20px" gridTemplateColumns="repeat(4, 1fr)">
//             <Controller
//               name="fullName"
//               control={control}
//               rules={{ required: "Full Name is required" }}
//               render={({ field }) => (
//                 <TextField {...field} fullWidth label="Full Name" variant="filled" sx={{ gridColumn: "span 2" }} disabled={!isEditing} />
//               )}
//             />
//             <Controller
//               name="email"
//               control={control}
//               rules={{ required: "Email is required" }}
//               render={({ field }) => (
//                 <TextField {...field} fullWidth label="Email" variant="filled" sx={{ gridColumn: "span 2" }} disabled={!isEditing} />
//               )}
//             />
//             <Controller
//               name="contact"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} fullWidth label="Contact Number" variant="filled" sx={{ gridColumn: "span 2" }} disabled={!isEditing} />
//               )}
//             />
//             <Controller
//               name="gender"
//               control={control}
//               render={({ field }) => (
//                 <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
//                   <InputLabel>Gender</InputLabel>
//                   <Select {...field} disabled={!isEditing}>
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                   </Select>
//                 </FormControl>
//               )}
//             />
//           </Box>
//           {isEditing && (
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Save Changes
//               </Button>
//             </Box>
//           )}
//         </form>
//       </MainCard>
//     </Box>
//   );
// };

// export default UserDetailPage;

