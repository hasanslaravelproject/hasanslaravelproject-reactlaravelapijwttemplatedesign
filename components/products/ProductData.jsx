import React,{useEffect, useState} from "react";
import "./style.css";
import { deleteProducts, getProducts } from "../../repo/productsRepo";
import { useHistory } from "react-router-dom";

import CircularProgres from "@material-ui/core/CircularProgress"
import Pagination from '@material-ui/lab/Pagination'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

const ProductData = () => {
    const history = useHistory()
    const [ productsData, setProductsData ] = useState([])
    const [loading, setLoading] = useState(false);
    const [deletedId, setDeletedId] = useState('');
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);

    const handlePaginationChange = (event, value) => {
        console.log(value)
        setPage(value);
        getProductsRecords()
    };

    const getProductsRecords = () => {
        console.log('getProductsRecords')
       getProducts(page,2,"")
        .then(res=> {
            console.log(res)
            setProductsData(res.data)
            setCount(res.totalRecords)
            
        });
    }
    useEffect(() => {
     // here please call api method here actually your method is different so i guiding you do that i wan
        getProductsRecords()
    }, [])

    const handleRowDelete = (oldData) => {
        setDeletedId(oldData.id)
        setLoading(true);
        deleteProducts(oldData.id)
            .then((res) => {
                const data = getProducts(0,6,"")
                .then(res=> {
                    console.log(res.data)
                    setProductsData(res.data)
                });
                setLoading(false);
                setDeletedId('')
            })
            .catch((error) => {
                setLoading(false);
                setDeletedId('')
            });
    };

    return (
        <div style ={cardsList}>
        {productsData.map(product => {
            return <Card style={card} >
            <CardActions justify={"flex-end"} alignContent={"flex-end"}>
                <Button size="small" color="primary" >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="100"
                            image={product.image ?
                                product.image
                                : 
                                "https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
                            }
                            title="Contemplative Reptile"
                        />
                        <CardContent
                            style={{ textOverflow: "ellipsis", width: "13rem" }}
                        >
                            {product.name}
                            <div style={buttonDiv} >
                                <Button 
                                color={"primary"} 
                                variant={"outlined"} 
                                className="btn btn-primary"
                                onClick = {() => {
                                    history.push({
                                        pathname: `/products/update/${product.id}`,
                                        user: product,
                                    });
                                }}>
                                    Edit
                                </Button>
                                <Button 
                                color={"secondary"} 
                                variant={"outlined"} 
                                className="btn btn-success"
                                onClick = { () => handleRowDelete(product)}
                                >
                                    {loading && deletedId === product.id ? <CircularProgres size={24} /> : "Delete" }
                                </Button>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Button>
            </CardActions>
        </Card>
        })}

        <Pagination count={count} page={page} onChange={handlePaginationChange} />


        </div>
    );
};
const buttonDiv = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    margin: '20px'
}
const cardsList = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
}
const card = {
    margin: '20px',
    maxWidth: '250px'
}
export default ProductData;
