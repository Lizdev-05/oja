import React, { useEffect, useState } from "react";
import style from "./ViewProduct.module.scss";
import { toast } from "react-toastify";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    // GEt data from database through https://firebase.google.com/docs/firestore/query-data/get-data
    try {
      const productsRef = collection(db, "products");
      const queryProduct = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(queryProduct, (querySnapshot) => {
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <div>ViewProducts</div>;
};

export default ViewProducts;
