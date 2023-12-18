import React, { useEffect, useState } from "react";
import style from "./ViewProduct.module.scss";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      //Delete doc
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);

      // Delete the file i.e file
      deleteObject(storageRef);
      toast.success("Product deleted successfully...");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // USe Notiflix to confirm delete : https://www.npmjs.com/package/notiflix
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Are you sure you want to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete canceled");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",

        // etc...
      }
    );
  };
  return (
    <>
      {isLoading && <Loader />}
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
            <tbody>
              {products.map((product, index) => {
                const { id, name, imageURL, category, brand, price } = product;
                return (
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
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
