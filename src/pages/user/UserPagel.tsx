// import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
// import { useState } from 'react';
// import { Typography, Box, Paper, Button, Checkbox } from '@mui/material';
// import { KittySvg } from '@/components/UI/KittySvg';
// import FirstNameField from '../../components/UI/profileFields/FirstNameField';
// import { LastNameField } from '@/components/UI/profileFields/LastNameField';
// import EmailField from '../../components/UI/profileFields/EmailField';
// import { DateField } from '@/components/UI/profileFields/DateField';
// import { AddressForm } from '@/components/UI/AddressForm';
// import { type CustomerDraft, type BaseAddress } from '@commercetools/platform-sdk';
// import { UpdateLastName, UpdateFirstName } from '@/store/slices/customerSlice';
// import EditIcon from '@mui/icons-material/Edit';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// const styleButton = {
//   marginLeft: '50px',
//   fontSize: '10px',
//   fontWeight: 'bold',
//   padding: '2px 5px',
//   with: '500px',
//   hight: '30px',
// };
// const styleEditIcon = { marginLeft: '10px', marginBottom: '5px' };

// export const UserPage: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const customer = useAppSelector((state) => state.customers.customer);
//   //console.log(customer);

//   const [editFirstName, setEditFirstName] = useState(false);
//   const [editLastName, setEditLastName] = useState(false);

//   const [data, setData] = useState({} as CustomerDraft);

  // const getAddress = (address: BaseAddress) => {
  //   console.log(address);
  // };

//   const handleSave = () => {
//     //отправка данных на сервер
//     console.log('');
//   };

//   const staticField = {
//     marginTop: '5px',
//     fontSize: '20px',
//   };

//   const editField = { marginTop: '5px', fontSize: '20px', textAlign: 'start' };

//   const boxStyle = {
//     padding: '0px',
//     display: 'flex',
//     alignItems: 'center',
//     alignContent: 'center',
//     justifyContent: 'center',
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           ...boxStyle,
//           flexDirection: 'row',
//           '@media (max-width: 400px)': {
//             flexDirection: 'column',
//           },
//         }}
//       >
//         <Box>
//           <KittySvg />
//         </Box>
//         <Box style={boxStyle}>
//           <Typography
//             variant="h3"
//             sx={{
//               marginLeft: '20px',
//               '@media (max-width: 500px)': {
//                 fontSize: '30px',
//                 textAlign: 'center',
//               },
//             }}
//           >
//             User Dashboard
//           </Typography>
//         </Box>
//       </Box>

//       <Box style={{ ...boxStyle, padding: '60px' }}>
//         <Paper
//           elevation={6}
//           style={{ padding: '20px', background: '#FFF0F5', width: '900px' }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               marginBottom: '20px',
//             }}
//           >
//             Profile information
//           </Typography>

//           {/* <>
//             <EmailField
//               data={customer}
//               setData={handleSave}
//             />
//             <DateField
//               data={customer}
//               setData={handleSave}
//             />
//             <Typography variant="subtitle1">Billing Addresses:</Typography>
//             <AddressForm
//               address="Billing"
//               getAddress={getAddress}
//               id={customer.addresses.length + 1}
//             />
//           </> */}

//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'flex-start',
//               '@media (max-width: 400px)': {
//                 flexDirection: 'column',
//               },
//             }}
//           >
//             {!editFirstName ? (
//                <>
//             <Typography
//               sx={editField}
//               variant="subtitle1"
//             >
//               <span style={{ fontWeight: 'bold' }}>First name: </span>
//             </Typography>
//               {customer.firstName}
//             <Checkbox
//                 {...label}
//                 icon={
//                   <EditIcon
//                     fontSize="small"
//                     color="primary"
//                     sx={styleEditIcon}
//                   />
//                 }
//                 checkedIcon={<EditIcon />}
//                 checked={editLastName}
//                 onChange={() => setEditFirstName(!editFirstName)}
//               />
//               </>

//             ) : (
//                 <>
//                   <FirstNameField
//                     data={customer}
//                     setData={setData}
//                   />
//                   <Button
//                     style={{ width: '200px', height: '30px', marginBottom: '5px' }}
//                     sx={styleButton}
//                     variant="contained"
//                     onClick={() => {
//                       data.firstName &&
//                         void dispatch(
//                           UpdateFirstName({
//                             id: customer.id,
//                             firstName: data.firstName,
//                             version: customer.version,
//                           })
//                         );
//                       setEditFirstName(false);
//                     }}
//                   >
//                     update first name
//                   </Button>
//                 </>
//             )}
//  </Box>

// <Box
//               sx={{
//                 ...boxStyle,
//                 flexDirection: 'row',
//                 '@media (max-width: 400px)': {
//                   flexDirection: 'column',
//                 },
//               }}
//             >

//               {!editLastName && (
//                 <>
//                 <Typography
//                   sx={editField}
//                   variant="subtitle1"
//                 >
//                   <span style={{ fontWeight: 'bold' }}>Last name: </span>
//                 </Typography>
//                 <Checkbox
//                   {...label}
//                   icon={
//                     <EditIcon
//                       fontSize="small"
//                       color="primary"
//                       sx={styleEditIcon}
//                     />
//                   }
//                   checkedIcon={<EditIcon />}
//                   checked={editLastName}
//                   onChange={() => setEditLastName(!editLastName)}
//                 />
//                 </>
//               ) :(

// <>
//                   <LastNameField
//                     data={customer}
//                     setData={setData}
//                   />
//                   <Button
//                     style={{ width: '200px', height: '30px', marginBottom: '5px' }}
//                     sx={styleButton}
//                     variant="contained"
//                     onClick={() => {
//                       data.lastName &&
//                         void dispatch(
//                           UpdateLastName({
//                             id: customer.id,
//                             lastName: data.lastName,
//                             version: customer.version,
//                           })
//                         );
//                       setEditLastName(false);
//                     }}
//                   >
//                     update last name
//                   </Button>
//                 </>
//               )}
//             </Box>

//             <Typography
//               sx={editField}
//               variant="subtitle1"
//             >
//               <span style={{ fontWeight: 'bold' }}>Birth date: </span>
//               {customer.dateOfBirth}
//             </Typography>
//             <Typography
//               sx={staticField}
//               variant="subtitle1"
//             >
//               <span style={{ fontWeight: 'bold' }}>Email: </span> {customer.email}
//             </Typography>

//             {/* //billingadress */}
//             {/* {customer.billingAddressIds !== undefined && customer.billingAddressIds.length > 0 ? (
//               <Box>
//                 <Typography
//                   sx={staticField}
//                   variant="h5"
//                 >
//                   <span style={{ fontWeight: 'bold' }}>Billing addresses:</span>
//                 </Typography>
//                 {customer.billingAddressIds.map((billingAddressId) => {
//                   const billingAddress = customer.addresses.find(
//                     (address) => address.id === billingAddressId
//                   );
//                   if (billingAddress) {
//                     return (
//                       <Box
//                         key={billingAddress.id}
//                         mt={2}
//                         sx={{
//                           textAlign: 'left',
//                         }}
//                       >
//                         {Object.entries(billingAddress)
//                           .slice(1)
//                           .map((row, index) => (
//                             <Typography
//                               key={index}
//                               variant="subtitle1"
//                             >
//                               {row[0]}: {row[1]}
//                             </Typography>
//                           ))}
//                       </Box>
//                     );
//                   }
//                   return null;
//                 })}
//               </Box>
//             ) : null} */}

//             {/* //shippingadress */}
//             {/* {customer.shippingAddressIds !== undefined && customer.shippingAddressIds.length > 0 ? (
//               <Box>
//                 <Typography
//                   sx={staticField}
//                   variant="h5"
//                 >
//                   <span style={{ fontWeight: 'bold' }}>Shipping addresses:</span>
//                 </Typography>
//                 {customer.shippingAddressIds.map((shippingAddressId) => {
//                   const shippingAddress = customer.addresses.find(
//                     (address) => address.id === shippingAddressId
//                   );
//                   if (shippingAddress) {
//                     return (
//                       <Box
//                         key={shippingAddress.id}
//                         mt={2}
//                       >
//                         {Object.entries(shippingAddress)
//                           .slice(1)
//                           .map((row, index) => (
//                             <Typography
//                               key={index}
//                               variant="subtitle1"
//                               sx={{
//                                 textAlign: 'left',
//                               }}
//                             >
//                               {row[0]}: {row[1]}
//                             </Typography>
//                           ))}
//                       </Box>
//                     );
//                   }
//                   return null;
//                 })}
//               </Box>
//             ) : null} */}

//           </Box>

//           />
// </>
// )
// }

