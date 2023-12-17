import React, { useEffect, useState } from "react";
import style from "./ViewProduct.module.scss";
import { toast } from "react-toastify";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={style.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No Product Found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product, index) => {
              const { id, name, imageURL, category, brand, price } = product;
              return (
                <tbody>
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={imageURL}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>

                    <td>{category}</td>
                    <td>{brand}</td>
                    <td>{`$${price}`}</td>
                    <td className={style.icons}>
                      <Link to={`/admin/add-product`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={18} color="red" />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
