import axios from "axios";

const baseEndpoint = "https://api.johnlawrimore.com/store/products";
const baseConfig = {
    headers: {
        "Authorization": "MDoherty"
    }
};

export const getProductById = (productId) => new Promise((resolve, reject) => {
    axios.get(`${baseEndpoint}/${productId}`, baseConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getProducts = () => new Promise ((resolve, reject) => {
    axios.get(`${baseEndpoint}`, baseConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const addReview = (productId, review) => new Promise ((resolve, reject) => {
    axios.post(`${baseEndpoint}/${productId}/reviews`, review, baseConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});