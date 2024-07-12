import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/Typeproduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  Body,
  Header,
  MenuIcon,
  WrapperTypeProduct,
  Container,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/slider/slider5.webp";
import slider2 from "../../assets/slider/slider2.webp";
import slider3 from "../../assets/slider/slider3.webp";
import slider4 from "../../assets/slider/slider4.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import Loading from "../../components/LoadingComponent/Loading";
import { Popover } from "antd";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [typeProducts, setTypeProducts] = useState([]);

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const { isLoading, data: products, isPreviousData } = useQuery(
    ["products", limit, searchDebounce],
    fetchProductAll,
    { retry: 3, retryDelay: 1000, keepPreviousData: true }
  );

  const contentCategory = (
    <WrapperTypeProduct>
      {typeProducts.map((item) => (
        <TypeProduct name={item} key={item} />
      ))}
    </WrapperTypeProduct>
  );

  return (
    <Loading isLoading={isLoading || loading}>
      <Body>
        <Header>
          <Popover content={contentCategory} trigger="click" placement="bottom">
            <MenuIcon />
          </Popover>
        </Header>
        <SliderComponent
          style={{ width: "100%", height: "800px" }}
          arrImages={[slider2, slider1, slider3, slider4]}
        />
        <Container>
          <h1>NHỮNG SẢN PHẨM TẠI CỬA HÀNG</h1>
          <WrapperProducts>
            {products?.data?.map((product) => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id}
              />
            ))}
          </WrapperProducts>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <WrapperButtonMore
              textbutton={isPreviousData ? "Load more..." : "Xem Thêm"}
              type="outline"
              styleButton={{
                width: "240px",
                height: "38px",
                borderRadius: "4px",
                borderColor:
                  products?.total === products?.data?.length ? "#f5f5f5" : "#9255FD",
                color: products?.total === products?.data?.length ? "#f5f5f5" : "#9255FD",
                pointerEvents:
                  products?.total === products?.data?.length ? "none" : "auto",
              }}
              disabled={
                products?.total === products?.data?.length || products?.totalPage === 1
              }
              onClick={() => setLimit((prev) => prev + 5)}
            />
          </div>
        </Container>
      </Body>
    </Loading>
  );
};

export default HomePage;
