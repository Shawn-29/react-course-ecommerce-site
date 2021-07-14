/* URL for this function:
localhost:8888/.netlify/functions/create-payment-intent
*/

/* dotenv is a package to allow us to access the variables
    in the .env file in the process.env object */
require('dotenv').config();

/* connect to Stripe with our secret API key */
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {

    // console.log('event:', event);
    // console.log('context:', context);

    /* if this function is called without a body, meaning data wasn't sent with this
        request, simply return to avoid an error (this issue can occur by accessing the
        above URL directly, which would be through a GET request),  */
    if (!event.body) {
        return {
            statusCode: 200,
            body: 'Create Payment Intent'
        };
    }

    const {
        cart,
        shippingFee,
        totalAmount
    } = JSON.parse(event.body);

    // console.log('cart:', cart);
    // console.log('shippingFee:', shippingFee);
    // console.log('totalAmount:', totalAmount);

    try {
        /* process the order transaction through Stripe */
        const paymentIntent = await stripe.paymentIntents.create({
            amount: shippingFee + totalAmount,
            currency: 'usd'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({clientSecret: paymentIntent.client_secret})
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({msg: error.message})
        };
    }
};