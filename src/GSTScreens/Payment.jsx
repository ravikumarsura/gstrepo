// import React, { useState } from "react";
// import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Card, CardContent, Box, Grid } from "@mui/material";
// import { motion } from "framer-motion";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import "./GSTScreens.css";

// const Payment = () => {
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

//   // Form validation schema using Yup
//   const validationSchema = Yup.object({
//     cardNumber: Yup.string()
//       .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
//       .required("Card number is required"),
//     cardHolderName: Yup.string().required("Cardholder name is required"),
//     expiryDate: Yup.string().matches(
//       /^(0[1-9]|1[0-2])\/\d{2}$/,
//       "Expiry date must be in MM/YY format"
//     ),
//     cvv: Yup.string()
//       .matches(/^[0-9]{3}$/, "CVV must be 3 digits")
//       .required("CVV is required"),
//     walletNumber: Yup.string().when("paymentMethod", {
//       is: "wallet",
//       then: Yup.string().required("Wallet number is required"),
//     }),
//   });

//   const formik = useFormik({
//     initialValues: {
//       cardNumber: "",
//       cardHolderName: "",
//       expiryDate: "",
//       cvv: "",
//       walletNumber: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       setIsPaymentSuccess(true);
//     },
//   });

//   const handlePaymentMethodChange = (event) => {
//     setPaymentMethod(event.target.value);
//   };

//   return (
//     <motion.div
//       className="payment-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <Box sx={{ padding: 3 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 <h3>Select Payment Method</h3>
//                 <FormControl component="fieldset">
//                   <FormLabel component="legend">Payment Method</FormLabel>
//                   <RadioGroup
//                     value={paymentMethod}
//                     onChange={handlePaymentMethodChange}
//                     row
//                   >
//                     <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
//                     <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
//                     <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
//                     <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
//                   </RadioGroup>
//                 </FormControl>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Card>
//               <CardContent>
//                 {paymentMethod === "card" && (
//                   <form onSubmit={formik.handleSubmit}>
//                     <TextField
//                       fullWidth
//                       label="Card Number"
//                       variant="outlined"
//                       margin="normal"
//                       value={formik.values.cardNumber}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       name="cardNumber"
//                       error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
//                       helperText={formik.touched.cardNumber && formik.errors.cardNumber}
//                     />
//                     <TextField
//                       fullWidth
//                       label="Cardholder Name"
//                       variant="outlined"
//                       margin="normal"
//                       value={formik.values.cardHolderName}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       name="cardHolderName"
//                       error={formik.touched.cardHolderName && Boolean(formik.errors.cardHolderName)}
//                       helperText={formik.touched.cardHolderName && formik.errors.cardHolderName}
//                     />
//                     <Grid container spacing={2}>
//                       <Grid item xs={6}>
//                         <TextField
//                           fullWidth
//                           label="Expiry Date (MM/YY)"
//                           variant="outlined"
//                           margin="normal"
//                           value={formik.values.expiryDate}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           name="expiryDate"
//                           error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
//                           helperText={formik.touched.expiryDate && formik.errors.expiryDate}
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <TextField
//                           fullWidth
//                           label="CVV"
//                           variant="outlined"
//                           margin="normal"
//                           value={formik.values.cvv}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                           name="cvv"
//                           error={formik.touched.cvv && Boolean(formik.errors.cvv)}
//                           helperText={formik.touched.cvv && formik.errors.cvv}
//                         />
//                       </Grid>
//                     </Grid>
//                     <Button variant="contained" color="primary" type="submit">
//                       Pay Now
//                     </Button>
//                   </form>
//                 )}

//                 {paymentMethod === "wallet" && (
//                   <form onSubmit={formik.handleSubmit}>
//                     <TextField
//                       fullWidth
//                       label="Wallet Number"
//                       variant="outlined"
//                       margin="normal"
//                       value={formik.values.walletNumber}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       name="walletNumber"
//                       error={formik.touched.walletNumber && Boolean(formik.errors.walletNumber)}
//                       helperText={formik.touched.walletNumber && formik.errors.walletNumber}
//                     />
//                     <Button variant="contained" color="primary" type="submit">
//                       Pay Now
//                     </Button>
//                   </form>
//                 )}

//                 {paymentMethod === "cod" && (
//                   <div>
//                     <h4>Cash on Delivery Selected</h4>
//                     <p>Your payment will be collected when the order is delivered to your address.</p>
//                     <Button variant="contained" color="primary" onClick={() => setIsPaymentSuccess(true)}>
//                       Confirm COD
//                     </Button>
//                   </div>
//                 )}

//                 {paymentMethod === "netbanking" && (
//                   <div>
//                     <h4>Net Banking Selected</h4>
//                     <p>Select your bank and proceed with the payment.</p>
//                     <Button variant="contained" color="primary" onClick={() => setIsPaymentSuccess(true)}>
//                       Proceed with Net Banking
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Payment Success */}
//         {isPaymentSuccess && (
//           <motion.div
//             className="payment-success"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <h3>Payment Successful!</h3>
//             <p>Your payment has been processed successfully. Thank you for your purchase!</p>
//             <Button variant="contained" color="success" onClick={() => setIsPaymentSuccess(false)}>
//               Go Back
//             </Button>
//           </motion.div>
//         )}
//       </Box>
//     </motion.div>
//   );
// };

// export default Payment;

import React, { useEffect, useState } from 'react';

function Payment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.reddit.com/r/reactjs.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.data.children); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to determine styles based on screen width
  const getResponsiveStyles = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      // Mobile styles
      return {
        container: { padding: '10px' },
        post: { margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' },
        title: { fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' },
        meta: { fontSize: '12px', color: '#555' },
        thumbnail: { width: '100%', height: 'auto', marginTop: '10px' },
      };
    } else {
      // Desktop styles
      return {
        container: { padding: '20px' },
        post: { margin: '15px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' },
        title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
        meta: { fontSize: '14px', color: '#555' },
        thumbnail: { width: '150px', height: 'auto', marginTop: '10px' },
      };
    }
  };

  const styles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Reddit Posts</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((post, index) => (
          <li key={index} style={styles.post}>
            <h2 style={styles.title}>{post.data.title}</h2>
            <p style={styles.meta}>Subreddit: {post.data.subreddit}</p>
            <p style={styles.meta}>Upvotes: {post.data.ups}</p>
            <a
              href={post.data.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}
            >
              {post.data.url}
            </a>
            {post.data.thumbnail && post.data.thumbnail !== 'self' && (
              <img src={post.data.thumbnail} alt={post.data.title} style={styles.thumbnail} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payment;

