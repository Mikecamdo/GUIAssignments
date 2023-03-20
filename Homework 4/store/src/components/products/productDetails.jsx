import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productsApi";
import { ReviewForm } from "./reviewForm";
import { ReviewList } from "./reviewList";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { addReview } from "../../api/productsApi";

export const ProductDetails = () => {
    const context = useContext(CartContext);
    
    const [ product, setProduct ] = useState(undefined);

    const params = useParams();
    useEffect(() => {
        getProductById(params.productId).then(x => setProduct(x));
    }, []);

    if(!product) {
        return <>Loading...</>;
    }

    return <>
        <div className="container">
            <div className="row bg-light mb-2">
                <nav aria-label="breadcrumb" className="p-2">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="/" className="text-primary text-decoration-none">Tasty snacks</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                    </ol>
                </nav>
            </div>


            <div className="row bg-light py-5">
                <div className="col-3 p-0 img-fluid">
                    <img src={product.imageUrl} className="img-fluid"></img>
                </div>
                <div className="col-8 p-0">
                    <p className="display-3 mb-0"><span className="">{product.name}</span></p>
                    <p className="fs-3"><span className="badge bg-primary">${product.price}</span></p>
                    <p className="fs-5">{product.description}</p>
                </div>
            </div>
            <div className="row bg-light">
                <span className="text-end p-5">
                    <Link to="/cart">
                        <button type="button" className="btn btn-warning" onClick={
                            () => context.addToCart(product) 
                        }>Add to Cart
                        </button>
                    </Link>
                </span>
            </div>


            <ReviewList reviews={product.reviews} />
            <ReviewForm onReviewAdded={
                review => {
                    addReview(product.id, review).then(x => {
                        const _product = {...product};
                        _product.reviews.push(x);
                        setProduct(_product);
                    });

                }
            } />
            
        </div>
    </>;
};