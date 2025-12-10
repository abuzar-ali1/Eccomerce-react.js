import { useState,useEffect } from "react";
import axiosClient from "../client/axiosInstance";

const useGetProductDetails = (product_id) => {
  const [isLoadData, setIsLoadData] = useState(true);
  const [product, setProduct] = useState();
  useEffect(() => {
    const productData = axiosClient
      .get(`products/${product_id}`)
      .then((data) => {
        setProduct(data?.data);
        setIsLoadData(false);
      });
  }, [product_id]);
  return {isLoadData,product};
};

export default useGetProductDetails;
