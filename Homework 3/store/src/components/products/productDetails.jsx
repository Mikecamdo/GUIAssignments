import { render } from "@testing-library/react";
import { useState, useEffect } from "react";
import { getProductById } from "../../api/productsApi";
import { ProductReview } from "../../models";
import { ReviewForm } from "./reviewForm";
import { ReviewList } from "./reviewList";

export const ProductDetails = () => {

    const [ product, setProduct ] = useState(undefined);

    useEffect(() => {
        getProductById(1).then(x => setProduct(x));
    }, []);

    const addReview = delta => setProduct({ ...product, ...delta });

    if(!product) {
        return <>Loading...</>;
    }

    return <>
        <div className="container">
            <div className="row bg-light mb-2">
            <nav aria-label="breadcrumb" className="p-2">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="" className="text-primary text-decoration-none">Tasty snacks</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Jif Peanut Butter, 40 ounce</li>
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

            <ReviewList reviews={product.reviews} />
            <ReviewForm onReviewAdded={ review => addReview({ reviews: [...product.reviews, review]})}  />
        </div>
    </>;
};