# Homework 4

## Assignment Details

For this assignment, you will be adding new functionality to your Homework #3 project.
- Routing
- A product list and cart viewer
- Shared context for handling the user's cart
- Two additional API interactions (load products and save review)

READ EVERYTHING BEFORE YOU START

Watch this video for demonstration...

https://nimb.ws/43RpHD

### Requirements
#### Acceptance Criteria
- Given initial visit to the site
  - user is shown a list of products
- Given the list of products
  - when "Product Details" is clicked
    - user is redirected to the product details
  - when "Add to Cart" is clicked"
    - the product is added to the cart
    - user is redirected to their cart
- Given a product detail
  - the correct product is loaded based on the id in the URL 
  - when a review is added
    - the review is permanently saved
  - when "Add to Cart" is clicked
    - the product is added to the cart
    - user is redirected to their cart 
- Given the user's cart
  - each item in cart is displayed with quantity, product name, product price, and a line total
  - the total of all items in cart is displayed below item table
- Given any view of the store
  - when the site logo (name in header) is clicked
    - user is redirected back to the product list
#### File Structure
The highlighted files are being added with this assignment. Please do not deviate from this file structure.

![](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%204/store/screenshots/folder-structure2.png)

#### Models
Two new models are added with this assignment.

Cart
- items
- total

CartItem
- product
- quantity
- totalPrice

#### API

productsApi

Add the following methods to productsApi.

<table>
  <tr>
    <th>Function Name</th>
    <th>Passed Arguments</th>
    <th>Return Value</th>
    <th>Description</th>
    <th>API Endpoint</th>
  </tr>
  <tr>
    <td>getProducts</td>
    <td>N/A</td>
    <td>Promise&lt;Product[]></td>
    <td>Gets an array of products from the API</td>
    <td>products/</td>
  </tr>
  <tr>
    <td>addReview</td>
    <td>productId, review</td>
    <td>Promise&lt;Review></td>
    <td>Posts a review for an existing product to the API</td>
    <td>products/{productId}/reviews</td>
  </tr>
</table>

#### Routes

routes

Your project will need a route array configuration with the following routes:

<table>
  <tr>
    <th>Path</th>
    <th>Element</th>
  </tr>
  <tr>
    <td>/</td>
    <td>ProductList</td>
  </tr>
  <tr>
    <td>/products/[productId]*</td>
    <td>ProductDetails</td>
  </tr>
  <tr>
    <td>/cart</td>
    <td>MyCart</td>
  </tr>
</table>
<i>*- not actual syntax for route parameter</i>

#### Context
CartContext

CartContext will handle the user's cart and be shared across the application.

Use createContext hook to instantiate the context with an initial value of undefined.

CartContextProvider

Create a component to encapsulate the CartContext.Provider and manage the cart state.

This component can be placed in the same file as CartContext.

<table>
  <tr>
    <th>Usage</th>
    <td>Encapsulates the CartContext.Provider and manages state of the cart</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>App</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>children</td>
  </tr>
  <tr>
    <th>Context(s)</th>
    <td>None</td>
  </tr>
  <tr>
    <th>State</th>
    <td>
    - cart / setCart
      &emsp;- Initial value = { items: [], total: 0 }
    </td>
  </tr>
  <tr>
    <th>Effects</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Logic</th>
    <td>
      - Add the following method to handle cart updates. This will be exposed to the provider instead of setCart. <br>
      
    const addToCart = (product) => {
      let _cart = { ...cart };
      let existing = _cart.items.find(x => x.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice = existing.product.price * existing.quantity;
      } else {
        _cart.items.push({ product, quantity: 1, totalPrice: product.price });
      }

      _cart.total = _cart.items.map(x => x.totalPrice).reduce((x, y) => x + y);
      setCart(_cart);
    }
      
  </tr>
  <tr>
    <th>Returns</th>
    <td>
    
    <CartContext.Provider>
      //TODO: Set value prop of CartContext.Provider
      //TODO: Render children here
    </CardContext.Provider>
    
  </tr>
  <tr>
    <th>Notes</th>
    <td>
    - Value prop of CartContext.Provider should be given { cart, addToCart }. These will be used in various components. <br>
    - Bind children from props inside CardContext.Provider
    </td>
  </tr>
</table>

### New Components

For this assignment, your store will have the following new components.

ProductList
<table>
  <tr>
    <th>Usage</th>
    <td>Displays list of products in store</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>Router in App</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Context(s)</th>
    <td>CartContext</td>
  </tr>
  <tr>
    <th>State</th>
    <td>- products / setProducts</td>
  </tr>
  <tr>
    <th>Effects</th>
    <td>- On component's initial rendering, call getProducts in productsApi. When the promise is fulfilled, call setProducts with value returned.</td>
  </tr>
  <tr>
    <th>Returns</th>
    <td> 
    - Nav bar with static breadcrumb <br>
    - Bound list of products presented in cards <br>
      &emsp;- Product image <br>
      &emsp;- Name <br>
      &emsp;- Price (show in badge) <br>
      &emsp;- "Product Details" button <br>
      &emsp;- "Add to Cart" button
    </td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>
    - use the useContext hook to reference the CartContext <br>
    - In the Add to Cart onclick event, pass the product to addToCart located on cartContext before redirecting to the cart <br>
    - Use the Link component or the useNavigate hook to handle redirecting when the two buttons are clicked.
    </td>
  </tr>
</table>

MyCart
<table>
  <tr>
    <th>Usage</th>
    <td>Displays list of items in user's cart</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>Router in App</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Context(s)</th>
    <td>CartContext</td>
  </tr>
  <tr>
    <th>State</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Effects</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Returns</th>
    <td> 
    - Table displaying items in user's cart <br>
      &emsp;- Quantity <br>
      &emsp;- Name <br>
      &emsp;- Price <br>
      &emsp;- Line Total <br>
    - Total of all items in cart
    </td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>
    - Map over cartContext.cart.items to create table rows <br>
      &emsp;- Pay attention to the object structure of cart item <br>
      &emsp;  (i.e.: item.product.price, item.totalPrice, etc.)
    - Bind the cart total to cartContext.total <br>
    </td>
  </tr>
</table>

### Component Modifications

App
- Update the return value to the following and address TODO notes.

```
<CartContextProvider>
        <BrowserRouter>
            // TODO: Style header and make link navigate to Product List
          <header>Store</header>
            // TODO: Add Routes component here.
            // Inside of Routes, generate individual Route components by mapping over the route constant in routes.jsx.
            // Hint: Use the spread operator to copy all object properties to the mapped component. (i.e.: <Route {...x}></Route>)
        </BrowserRouter>
 </CartContextProvider>
 ```
 
ProductDetails
- Replace the hard-coded id passed to getProductById with the parameter located on the route.
  - Use the useParams hook to get the value.
- Use the useContext hook to add a reference to CartContext.
- Add 'Add to Cart' button and logic
  - Call addToCart on cartContext
  - Redirect to cart using Link component or useNavigate hook
- Update the logic for onReviewAdded to save the new review to the repository.
  - Call addReview in productsApi with product.id and the new review
  - When promise is fulfilled, append the new review to product...
    ```
           const _product = {...product};
            _product.reviews.push(x);
            setProduct(_product);
    ```
    
### Styling
Reference Bootstrap's [website](https://getbootstrap.com/) for duplicating the styles shown in screenshots and video. 

### Screen Shots
ProductList:
![](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%204/store/screenshots/ss1.png)

ProductDetails:
![](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%204/store/screenshots/ss2.png)

MyCart:
![](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%204/store/screenshots/ss3.png)
