import { Rating } from "../common";

export const ReviewList = ({ reviews }) => {
    
    return <>
        <h4>Product Reviews <span className="text-secondary">({reviews.length})</span></h4>

        { reviews.length === 0 && <p className="bg-light p-3">Be the first to add a review!</p> }

        <ul className="px-0">
            {
                reviews.map((review, index) => {
                    return (<li key={index} className="list-group-item mb-3">
                        <ul className="list-group">
                            <li className="list-group-item bg-light">
                                <div className="row">
                                    <span className="">{<Rating value={review.rating}/>}</span>
                                </div>
                            </li>
                            <li className="list-group-item  bg-light">
                                <div className="row py-2">
                                    <div className="col-6 text-muted">
                                        <span>{review.userName}</span>
                                    </div>
                                    <div className="col-6 text-muted">
                                        <span className="float-end">{review.date}</span>
                                    </div>
                                </div>
                                <div className="row pb-2">
                                    <span>"{review.comment}"</span>
                                </div>
                            </li>
                        </ul>
                        
                        
                    </li>)}
                )
            }
        </ul>
    </>;
};