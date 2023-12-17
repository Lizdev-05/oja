import React, { useState } from "react";
import style from "./AddProducts.module.scss";
import Card from "../../card/Card";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { toast } from "react-toastify";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Eletronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    description: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    //Monitoring and uploading image with Monitor Upload Progress from firebase
    //Create a storage on Firebase and changes the ruke to suit your usecase :https://console.firebase.google.com/u/0/project/market-1c239/storage/market-1c239.appspot.com/files

    //Storing file
    const storageRef = ref(storage, `Ọjà/${Date.now()} ${file}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //Upload Progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully...");
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={style.product}>
      <h1>Add New Product</h1>
      <Card cardClass={style.card}>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor=""> Product name:</label>
          <input
            type="text"
            placeholder="Product name"
            required
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />

          <label htmlFor="">Product Image</label>
          <Card cardClass={style.group}>
            {uploadProgress === 0 ? null : (
              <div className={style.progress}>
                <div
                  className={style["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress}%`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              placeholder="Product image"
              value={product.image}
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              name="imageUrl"
              disabled
              required
              placeholder="Image url"
              value={product.imageURL}
            />
          </Card>

          <label htmlFor=""> Product Price:</label>
          <input
            type="number"
            placeholder="Product price"
            required
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
          />

          <label>Product Category:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <label htmlFor=""> Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product brand"
            required
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
          />
          <label htmlFor=""> Product Description:</label>
          <textarea
            name="description"
            required
            value={product.description}
            onChange={(e) => handleInputChange(e)}
            cols="30"
            rows="10"
          ></textarea>
          <button className="--btn --btn-primary">Save Product</button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
