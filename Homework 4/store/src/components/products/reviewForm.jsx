import { useState } from "react";
import { TextField, SelectField, TextAreaField } from "../common";
import { ProductReview } from "../../models";
import { Rating } from "../common";

export const ReviewForm = ( {onReviewAdded} ) => {
    const options = [
        {value: 1, label: '1 stars'},
        {value: 2, label: '2 stars'},
        {value: 3, label: '3 stars'},
        {value: 4, label: '4 stars'},
        {value: 5, label: '5 stars'}
    ];

    const [ userName, setUserName ] = useState('');
    const [ rating, setRating ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ ratingOptions ] = useState(options);

    return <>
        <ul className="list-group">
            <li className="list-group-item bg-secondary py-0">
                <div className="row text-light">
                    <h4 className="pt-2">Add Review</h4>
                </div>
            </li>
            <li className="list-group-item">
                <div className="row">
                    <div className="col-8">
                    <TextField label="Your Name"
                                value={userName}
                                setValue={setUserName}/>
                    </div>
                    <div className="col-2">
                    <SelectField label="Rating"
                                value={rating}
                                setValue={setRating}
                                options={ratingOptions}
                                optionValueKey={"value"}
                                optionLabelKey={"label"}/>
                    </div>
                    <div className="col-1 mt-4">
                        <Rating value={rating}/>
                    </div>
                </div>
                
                <div className="row">
                    <div className="mt-2">
                    <TextAreaField label="Comment"
                                value={comment}
                                setValue={setComment}/>
                    </div>
                </div>

                <button type="button"
                        className="btn btn-primary"
                        onClick={ () => {
                            onReviewAdded(new ProductReview( {userName, rating, comment, date: new Date().toDateString()} ));
                            setUserName('');
                            setRating('');
                            setComment('');
                        }}>
                    Submit
                </button>
            </li>
        </ul>
    </>;

};