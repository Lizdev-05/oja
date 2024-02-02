import React, { useState } from "react";
import styles from "./Pagination.module.scss";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  //Limit the number of pages shown in pagination
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  //Limit the number of products shown in each page
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //For loop to populate the pageNumbers array with the number of pages
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Paginate the products
  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <ul className={styles.pagination}>
      <li>prev</li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li key={number} onClick={() => paginate(number)}>
              {number}
            </li>
          );
        }
      })}

      <li>next</li>
      <p>
        <b>Page {currentPage}</b>
        {` of `}
        <b>{totalPages}</b>
      </p>
    </ul>
  );
};
