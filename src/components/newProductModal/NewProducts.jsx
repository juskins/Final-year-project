import "./NewProducts.scss";
import { useReducer, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { reducer } from "./reducer";
import { useDarkModeContext } from "../../context/darkModeContext";
import { baseUrl } from "../../context/constants";
import Axios from 'axios';
import axios from "axios";
import Notify from "../notify";

const ProductModal = ({
  open,
  onClose,
  productToEdit,
  productToDelete,
  addProduct,
  editProduct,
  handleCloseModal,
}) => {

  const initialState = {};
  const [state, productDispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const { allProducts, dispatch } = useDarkModeContext();
  const [notify, setNotify] = useState({ open: false, varient: "filled", severity: "", message: "" });

  useEffect(() => {
    if (!productToEdit) {
      productDispatch({
        type: "LOAD_DATA",
        payload: {
          id: new Date().getTime().toLocaleString(),
          name: "",
          batch: "",
          expiry: "",
          quantity: "",
          price: "",
          productionDate: "",
        },
      });
    } else productDispatch({ type: "LOAD_DATA", payload: productToEdit });
  }, [productToEdit]);

  const [requestData, setRequestData] = useState({});
  useEffect(() => {
    setRequestData({
      product_name: state.product_name,
      batch_number: state.batch_number,
      expiry_date: state.expiry_date,
      quantity: state.quantity,
      price: state.price,
      production_date: state.production_date,
    });
  }, [state]);

  console.log(allProducts);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = `${baseUrl}/${productToEdit ? 'update_' : ''}product/${user.uid}/${productToEdit ? state.id : ''}`;
      const headers = {
        'Content-Type': 'application/json',
      };
      console.log(requestData);
      const axiosMethod = productToEdit ? 'patch' : 'post';
      const response = await Axios[axiosMethod](apiUrl, requestData, { headers });
      console.log('API Response:', response.data);
      setLoading(false);
      if (axiosMethod === 'post') {
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: [...allProducts, ...response.data.data] });
      } else if (axiosMethod === 'patch') {
        const NotUpdated = allProducts.filter((product) => product.id !== state.id);
        const updateAllProducts = [...NotUpdated, response.data.updateProduct];
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: updateAllProducts });
      }

      if (response.status === 201 || response.status === 200) {
        setNotify((notify) => ({
          ...notify,
          open: true,
          severity: "success",
          message: response?.data.message
        }));
        handleCloseModal();
      } else {
        setLoading(false);
        setNotify((notify) => ({
          ...notify,
          open: true,
          severity: "error",
          message: response?.error || response?.message
        }));
      }
    } catch (err) {
      console.error('API Request Error:', err);
      setLoading(false);
      setNotify((notify) => ({
        ...notify,
        open: true,
        severity: "error",
        message: err?.response?.data.error || err?.response?.data.message
      }));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    const DELETEURL = `${baseUrl}/delete_product/${user.id}/${productToDelete.id}`;
    setLoading(true);
    try {
      const response = await axios.delete(DELETEURL);
      console.log(response);
      const NotUpdated = allProducts.filter((product) => product.id !== productToDelete.id);
      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: NotUpdated });
      handleCloseModal();
      setNotify((notify) => ({
        ...notify,
        open: true,
        severity: "success",
        message: "Product Deleted"
      }));
    } catch (err) {
      console.log(err);
      setNotify((notify) => ({
        ...notify,
        open: true,
        severity: "error",
        message: err?.response?.data.error || err?.response?.data.message
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notify
        open={notify.open}
        severity={notify?.severity}
        autoHideDuration={3000}
        onClose={() => setNotify({ ...notify, open: false })}
      >
        {notify.message}
      </Notify>
      <Dialog open={open} onClose={onClose}>
        {!productToDelete ?
          <>
            <DialogTitle style={{ fontWeight: "bold" }}>
              {productToEdit ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSave}>
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      label="Product Name"
                      fullWidth
                      value={state?.product_name}
                      onChange={(e) =>
                        productDispatch({
                          type: "UPDATE_FIELD",
                          field: "product_name",
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      label="Batch Number"
                      type="text"
                      fullWidth
                      value={state?.batch_number}
                      onChange={(e) =>
                        productDispatch({
                          type: "UPDATE_FIELD",
                          field: "batch_number",
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      label="Expiry date"
                      type="date"
                      fullWidth
                      value={state?.expiry_date}
                      onChange={(e) =>
                        productDispatch({
                          type: "UPDATE_FIELD",
                          field: "expiry_date",
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Quantity"
                      required
                      type="number"
                      min={0}
                      fullWidth
                      value={state?.quantity}
                      onChange={(e) =>
                        productDispatch({
                          type: "UPDATE_FIELD",
                          field: "quantity",
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Price"
                      type="number"
                      fullWidth
                      required
                      value={state?.datprice}
                      onChange={(e) =>
                        productDispatch({
                          type: "UPDATE_FIELD",
                          field: "price",
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  {/* Repeat similar code for other input fields */}
                  <Grid item xs={6}>
                    <TextField
                      label="Production Date"
                      fullWidth
                      type='Date'
                      required
                      value={state?.production_date}
                      onChange={(e) =>
                        productDispatch({
                          type: "UPDATE_FIELD",
                          field: "production_date",
                          value: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
                <button
                  disabled={loading} onClick={handleSave} type="submit" className={`btn bg-[#131a4e] hover:bg-[#131a4ecc]  ${loading ? "bg-gray-200" : ""}`}>
                  {loading ? <><CircularProgress size={20} sx={{ color:"#fffff"}} /> <small> Saving...</small></> : "Save"}
                </button>
              </form>
            </DialogContent>
          </> :
          <>
            <DialogTitle style={{ fontWeight: "bold" }}>
              Delete Product
            </DialogTitle>

            <DialogContent>
              <form onSubmit={handleDelete}>
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={6}>
                    <TextField
                    
                      label="Product Name"
                      fullWidth
                      value={productToDelete?.product_name}
                      readOnly
                      focused={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                    
                      label="Batch Number"
                      type="number"
                      fullWidth
                      value={productToDelete?.batch_number}
                      readOnly
                      focused={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                     
                      label="Expiry date"
                      type="date"
                      fullWidth
                      value={productToDelete?.expiry_date}
                      readOnly
                      focused={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Quantity"
                  
                      type="number"
                      min={0}
                      value={productToDelete?.quantity}
                      fullWidth
                      readOnly
                      focused={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Price"
                      type="number"
                      fullWidth
                  
                      readOnly
                      value={productToDelete?.price}
                      focused={true}
                    />
                  </Grid>
                  {/* Repeat similar code for other input fields */}
                  <Grid item xs={6}>
                    <TextField
                      label="Production Date"
                      fullWidth
                      type='Date'
                      
                      value={productToDelete?.production_date}
                      readOnly
                      focused={true}
                    />
                  </Grid>
                </Grid>
                <button onClick={handleDelete}
                  disabled={loading} type="submit" className={` w-full
                   bg-red-700 text-white hover:bg-red-400 text-center py-3 ${loading ? "bg-gray-20 hover:bg-gray-200" : ""}`}>
                  {loading ? <><CircularProgress size={20} sx={{ color:"#fffff"}} /> <small className="text-white"> Deleting...</small></> : <p>Delete Product</p>}
                </button>
              </form>
            </DialogContent>
          </>
        }
      </Dialog>
    </>
  );
};

export default ProductModal;
