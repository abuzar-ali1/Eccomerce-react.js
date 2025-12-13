import  { useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import axiosClient from '../../client/axiosInstance';
import { useNavigate } from "react-router-dom";

const useProductCards = () => {
    const [isLoadData, setIsLoadData] = useState(true);
    const [products, setProducts] = useState();
    const [catagoryArr, setCatagoryArr] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState([]);
    const dispatch = useDispatch()
    const [currentPage , setCurrentPage] = useState(1)
    const itemsPerPage = 10;
    const totalPages = Math.ceil(updatedProduct.length/ itemsPerPage);
 
    
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

  // Handle navigation to product details
  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    if (productId) {
      navigate(`/product-Details/${productId}`);
    }
  };
  
    return {isLoadData,products,catagoryArr,updatedProduct,dispatch,currentPage,totalPages,filterProduct,useEffect,setCurrentPage,itemsPerPage,handleViewDetails}
}

export default useProductCards