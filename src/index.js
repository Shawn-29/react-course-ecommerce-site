import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
    /* integrate Auth0 with a React app by wrapping the
      root component in a Auth0Provider component */
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        /*
            cacheLocation by default is 'memory'; a problem occurs with this option
            if the user is logged in and then goes to an invalid page; the user,
            despite still being logged in, will be unable to reach the main app
            and have to click the login button again
        */
        cacheLocation='localstorage'
        /*
            the origin property returns the URL of where the current page
            originated from; for example, the origin for the URL
            "https://www.udemy.com/course/react-tutorial-and-projects-course/learn/lecture/21055066"
            is "https://www.udemy.com"
        */
        redirectUri={window.location.origin}
    >
        <UserProvider>
            <ProductsProvider>
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>,
    document.getElementById('root')
);