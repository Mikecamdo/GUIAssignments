# Homework 3

## Assignment Details

For this assignment, you will be creating a product review page with React that dynamically displays product information loaded from an API, a list of reviews, and a form to add a new review (as shown above).

Watch this [video](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%203/store/screenshots/hw3_video.webm) for demonstration.

As always, I recommend reading all assignment instructions before getting started. Make sure to follow the instructions carefully. Points will be deducted for variations from what is outlined below.

For implementation, you will want to rely heavily on the recent examples completed in class that have been posted in Canvas, along with the associated lectures. Unless otherwise stated here, everything you need for this assignment can be found there.

This assignment will have virtual help sessions. Watch the discussion board for assignment Q&A's and virtual help session signup.

![](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%203/store/screenshots/prod-details-screen.png)

### Getting started
#### Setup
You will want to begin by starting a new project using the create-react-app tool called "store".

Don't forget to remove unneeded content from the boilerplate.
- Clear App component HTML
- Delete app.css and its import statement
- Get rid of logo.svg and its import statement
#### Styling
For styling on this assignment, you will need to install Bootstrap.

  npm install @popperjs/core --save 

  npm install bootstrap --save

Inside your index.js, you will need to add these imports...

import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

Reference Bootstrap's [website](https://getbootstrap.com/) for duplicating the styles shown in screenshot and video. 

You should need little to no CSS for this assignment beyond Bootstrap (other than the CSS provided for you below).

#### API Interaction
For API interaction, you will need to install Axios.

  npm install axios --save
  
### Acceptance Criteria
- Given a product...
  - product details (name, image, description and price) are loaded from the API and    displayed with list of reviews and a form to add a review.
  - when no reviews exist...
    - the "Be the first to review" message is shown.
    - review count shows 0.
  - when one or more reviews exist...
    - each review is shown in the list with rating, user name, date and comment,
    - correct review count is shown,
    - "Be the first to review" message is hidden.
  - when user selects a rating from the rating drop-down...
    - the selected rating is shown in stars next to the filed.
  - when user enters review and clicks submit...
    - the new review is shown in the list.
    - the form is cleared.
    
### Implementation
#### File Structure
Do not deviate from the following file structure. Remember to use the .jsx file extension for all components and leverage barrel files for module loading.
![](https://github.com/Mikecamdo/GUIAssignments/blob/main/Homework%203/store/screenshots/folder-structure-3.png)

#### Models
For this assignment, you will be working with two models. While we will not be instantiating either as part of this assignment, its always a good idea to define your Data Transfer Objects (DTOs).

Product
- id
- name
- description
- price
- imageUrl
- reviews

ProductReview
- userName
- rating
- comment
- date

#### API

productsApi

productsApi.js will contain functions that perform CRUD operations against an API. For this, you will need to import Axios into this file.

Define the following constants. They should not be exported.

| Constant Name |	Value |
| ------------- | ----- |
| baseEndpoint |	https://api.johnlawrimore.com/store/products |
| headers	| { <br> &emsp;"Authorization" : "xxx" <br> } <br> IMPORTANT:  Replace xxx with your first initial and last name as it is listed in canvas. If your name does not match, you will not receive data back from the API! |

Build out the following function:

| Function Name	| Passed Arguments | Return Value |	Description |	API Endpoint |
| ------------- | ---------------- | ------------ | ----------- | ------------ |
| getProductById | productId | Promise&lt;Product> |	Gets product from API by ID |	store/products/{productId} |

We will be adding more functions here in the next assignment.

#### Components
For HW3, your store will have the following components in addition to the App component. All components must be function components and must be in their own file.

productDetails
<table>
  <tr>
    <th>Usage</th>
    <td>Displays product details of a product loaded from the API</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>app</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>None</td>
  </tr>
  <tr>
    <th>State</th>
    <td>- product / setProduct</td>
  </tr>
  <tr>
    <th>Effects</th>
    <td>- On component's initial rendering, call getProductById (located in productsApi.js) and pass it a hard-coded ID of 1. We will make this value dynamic in the next assignment. When the promise is fulfilled, call setProduct with value returned.</td>
  </tr>
  <tr>
    <th>Contents</th>
    <td>- Navigation bar with static breadcrumb (this does not need to work) <br>
    - Bound elements to display the product details (presented in jumbotron) <br>
      &emsp;- Product image (shown to left of text) <br>
      &emsp;- Name <br>
      &emsp;- Price (show in badge) <br>
      &emsp;- Description <br>
    - reviewList component <br>
    - reviewForm component</td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>- You will need to bind the src attribute of the image to product.imageUrl <br>
    - You will need a method to handle when a new review is added by reviewForm. This method will clone product, add the productReview that was passed in to product.reviews, and call product's setter with the clone.
    <br>
    - When you reload your page, any reviews you added will disappear. This is expected since we are not saving them back to the API. This will be addressed in the next assignment.
    </td>
  </tr>
</table>

reviewList
<table>
  <tr>
    <th>Usage</th>
    <td>Displays a list of user reviews</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>productDetails</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>- reviews</td>
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
    <th>Contents</th>
    <td>- "Product Reviews" header with review count in parenthesis <br>
    - "Be the first to add a review!" message shown ONLY when there are no reviews <br>
    - Card for EACH review in reviews <br>
    &emsp;- Header with rating component <br>
    &emsp;- User name <br>
    &emsp;- Date (displayed to far right of User name) <br>
    &emsp;- Comment</td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>- Don't forget the key attribute on your repeating element. Since we have not assigned an id to productReview (this will happen in the next assignment), you will need to use index as your key. We did an example of this in class. <br>
    - Don't forget your logic to display the "Be the first to Review" message when no reviews exist on the product (product.reviews.length === 0). To dynamically show or hide an element, use the { someCondition && &lt;Element /> } convention.</td>
  </tr>
</table>

reviewForm
<table>
  <tr>
    <th>Usage</th>
    <td>Form for leaving a new user review</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>productDetails</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>- onReviewAdded</td>
  </tr>
  <tr>
    <th>State</th>
    <td>- userName / setUserName <br>
    - rating / setRating <br>
    - comment / setComment <br>
    - ratingOptions (no setter is needed if you provide the initial value to useState())</td>
  </tr>
  <tr>
    <th>Effects</th>
    <td>None</td>
  </tr>
  <tr>
    <th>Contents</th>
    <td>- "Add Review" header <br>
    - Form fields for leaving review <br>
    - &emsp;Your name (textField component) <br>
    - &emsp;Rating (select component with rating component next to it bound) <br>
    - &emsp;Comment (textArea component) <br>
    - Submit button</td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>- Don't forget your button's type attribute! <br>
    - When submit is clicked, invoke onReviewAdded with { userName, rating, comment, date: new Date().toDateString() } and clear the form <br>
    - ratingOptions is needed to bind the options prop on your SelectField. It can be initialized with the following array. <br>
    [ <br>
     &emsp;{ value: 1, label: '1 stars' }, <br>
     &emsp;{ value: 2, label: '2 stars' }, <br>
     &emsp;{ value: 3, label: '3 stars' }, <br>
     &emsp;{ value: 4, label: '4 stars' }, <br>
     &emsp;{ value: 5, label: '5 stars' } <br>
    ] 
    </td>
  </tr>
</table>

rating
<table>
  <tr>
    <th>Usage</th>
    <td>Depicts a rating value in the form of stars (1-5)</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>
    - reviewList (show in header of each review) <br>
    - reviewForm (shown next to the select)</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>- value</td>
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
    <th>Contents</th>
    <td>
    &lt;span className="stars"> <br>
      &ensp;{ <br>
        &emsp;[1,2,3,4,5].map(x => (&lt;i key={x} className={(x > +value ? 'empty-star' : 'full-star')}>&lt;/i>)) <br>
      &ensp;} <br>
    &lt;/span> <br>
    (the plus sign ensures that value is evaluated as a number)
    </td>
  </tr>
  <tr>
    <th>CSS</th>
    <td>
    
    .stars {
      font-size: 1.5rem;
      font-style: normal;
      position: relative;
      top: -.1em;
    }
    
    .stars i {
      font-style: normal;
    }
    
    .full-star:after {
      content: "\2605";
    }
    
    .empty-star:after {
      content: "\2606";
    }
    
    
    
  </tr>
  <tr>
    <th>Notes</th>
    <td>- Note that Rating has a jsx and css. Don't forget to import your CSS at the top of your jsx file </td>
  </tr>
</table>
	
textField
<table>
  <tr>
    <th>Usage</th>
    <td>Depicts a text input with label</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>- reviewForm</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>
    - label <br>
    - value <br>
    - setValue
    </td>
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
    <th>Notes</th>
    <td>This can be borrowed from the class exercise</td>
  </tr>
</table>
	
selectField
<table>
  <tr>
    <th>Usage</th>
    <td>Depicts a select with label</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>- reviewForm</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>
    - label <br>
    - value <br>
    - setValue <br>
    - options <br>
    - optionValueKey <br>
    - optionLabelKey
    </td>
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
    <th>Notes</th>
    <td>This can be borrowed from the class exercise</td>
  </tr>
</table>

textAreaField
<table>
  <tr>
    <th>Usage</th>
    <td>Depicts a text area with label</td>
  </tr>
  <tr>
    <th>Location(s) Used</th>
    <td>- reviewForm</td>
  </tr>
  <tr>
    <th>Props</th>
    <td>
    - label <br>
    - value <br>
    - setValue
    </td>
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
    <th>Notes</th>
    <td>Use textField and selectField as your example</td>
  </tr>
</table>
	
### General Hints
- Don't forget HTML variances like className and htmlFor
- Keep your Chrome Dev Tools open!
- Leverage the React Developer Tools (Component Tab)
