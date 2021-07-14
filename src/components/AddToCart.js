import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({product}) => {

  const {
    id,
    stock,
    colors
  } = product;
  // console.log('colors:', colors);

  const {addToCart} = useCartContext();

  const [chosenColor, setChosenColor] = useState(colors[0]);

  const [amount, setAmount] = useState(1);

  const increaseCart = () => {
    setAmount((prevAmt) => {
      return Math.min(prevAmt + 1, stock);
    });
  };

  const decreaseCart = () => {
    setAmount((prevAmt) => {
      return Math.max(prevAmt - 1, 1);
    });
  };

  return <Wrapper>
    <div className='colors'>
      <span> colors : </span>
      <div>
        {
          colors.map((color, index) => {
            return <button
              key={index}

              /* add the active class if this color is the chosen color */
              className={
                `color-btn ${chosenColor === color ? 'active' : ''}`
              }

              /* give each button its unique color */
              style={{background: color}}

              onClick={() => {
                setChosenColor(color);
              }}
            >
              {/* add a check mark over the chosen color */}
              {chosenColor === color ? <FaCheck /> : null}
            </button>
          })
        }
      </div>
    </div>
    <div className='btn-container'>
      <AmountButtons
        amount={amount}
        increaseCart={increaseCart}
        decreaseCart={decreaseCart}
      />
      <Link
        to='/cart'
        className='btn'
        onClick={() => {
          addToCart(id, chosenColor, amount, product);
        }}
      >
        Add to Cart
      </Link>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
