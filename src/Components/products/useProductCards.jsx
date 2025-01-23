import axios from 'axios';
import  { useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Bounce, toast } from 'react-toastify';
import axiosClient from '../../client/axiosInstance';
const useProductCards = () => {
    const [isLoadData, setIsLoadData] = useState(true);
    const [products, setProducts] = useState();
    const [catagoryArr, setCatagoryArr] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState([]);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [currentPage , setCurrentPage] = useState(1)
    const itemsPerPage = 10;
    const [productId, setProductId] = useState();
    const totalPages = Math.ceil(updatedProduct.length/ itemsPerPage);
    const handleOpen = (id) => {
      setOpen(true);
      setProductId(id)
    }
    const handleClose = () => setOpen(false);
    
    const filterProduct = (catagoryProduct) => {
      if(catagoryProduct === null){
        return products
      }
      const filterByCategory = products?.filter(
        (item) =>
          item.category === catagoryProduct.value
          
      );
      setUpdatedProduct(filterByCategory);
    };
    useEffect(() => {
      const productData = axiosClient
        .get("products")
        .then((data) => {        
 
          const productCatagory = data?.data.map((item) => {
            return {
              label: item.category,
              value: item.category,
            };
          });
          const uniqueData = productCatagory.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.value === item.value)  
          );
          setCatagoryArr(uniqueData);
          setProducts(data?.data);
          setUpdatedProduct(data?.data);
          setIsLoadData(false);
        });
    }, []);

    const deletProduct = async (id) =>{
      const deleteProductResp = await axiosClient.delete(`products/${id}`)
      
      if( deleteProductResp?.status === 200){
        const updatedProductList = updatedProduct.filter((item)=> item.id !== id)
        toast.success('🦄 Product deleted successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        setUpdatedProduct(updatedProductList)
      }
    }
  
    return {isLoadData,products,catagoryArr,updatedProduct,dispatch,currentPage,totalPages,filterProduct,useEffect,setCurrentPage,itemsPerPage,open, handleOpen, handleClose,productId,deletProduct}
}

export default useProductCards