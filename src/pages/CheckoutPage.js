import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {

  const {cart} = useCartContext();

  return <main>
    {/* title prop is for displaying the current page in the bread crumb */}
    <PageHero title='checkout' />
    {/* use the "page" CSS class to take up the remainder of the page
      between the PageHero and Footer components */}
    <Wrapper className='page'>
      {
        cart.length < 1 ?
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/products' className='btn'>
            Fill It
          </Link>
        </div> :
        <StripeCheckout />
      }
    </Wrapper>
  </main>
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  .empty {
    text-align: center;
  }
`;

export default CheckoutPage
