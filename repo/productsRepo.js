import api from "../api/axios";

//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
// will you you help me about these 3 paremters pageNo 

const getProducts = async (pageNo, pageSize, search) => {
    let res;
    if (search.length === 0) {
        res = await getAllProducts(pageNo + 1, pageSize);
    } else {
        try {
           
            res = await searchProducts(pageNo + 1, pageSize, search);
        } catch (err) {
            return {
                data: [],
                total: 0,
            };
        }
    }
    if (res) {
        return res.data;
    } else {
        return {
            data: [],
            total: 0,
        };
    }
};

const addProducts = (data) => {
    return api.post(`/products`, data);
};
const updateProducts = (id, data) => {
    return api.put(`/products/${id}`, data);
};
const getAllProducts = (page, paginator) => {
    return api.get(`/products/?page=${page}&paginator=${paginator}`);
};
const getOneProducts = (id) => {
    return api.get(`/products/${id}`);
};
const searchProducts = (page, paginator, searchKey) => {
    return api.get(
        `/products/search/${searchKey}/?page=${page}&paginator=${paginator}`
    );
};
const deleteProducts = (id) => {
    return api.delete(`/products/${id}`);
};
export {
    getProducts,
    addProducts,
    updateProducts,
    getAllProducts,
    getOneProducts,
    searchProducts,
    deleteProducts,
};
