import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import Loader from "./Loader";

const BuyerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ["get-buyer-products", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const productList = data?.data?.productList;
  const totalPage = data?.data?.totalPage;

  if (isPending) {
    return <Loader />;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          marginBottom: "2rem",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color="secondary"
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
