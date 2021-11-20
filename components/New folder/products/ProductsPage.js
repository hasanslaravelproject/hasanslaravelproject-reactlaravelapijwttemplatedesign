import PageTemplate from "../templates/Template";
import ProductsTable from "./ProductsTable";
import React from "react";

const ProductsPage = (props) => {
    return(
    <PageTemplate title="Products List">
        <ProductsTable/>
    </PageTemplate>)
}
export default ProductsPage;
