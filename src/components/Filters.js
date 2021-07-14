import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {

  const {
    filters: {
      text,
      category,
      company,
      color,
      minPrice,
      price,
      maxPrice,
      isFreeShipping
    },
    updateFilters,
    clearFilters,
    allProducts
  } = useFilterContext();

  const uniqueCategories = getUniqueValues(allProducts, 'category'),
    uniqueCompanies = getUniqueValues(allProducts, 'company'),
    uniqueColors = getUniqueValues(allProducts, 'colors');
  // console.log('uniqueCategories:', uniqueCategories);
  // console.log('uniqueCompanies:', uniqueCompanies);
  // console.log('uniqueColors:', uniqueColors);

  return <Wrapper>
    <div className='content'>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* search input */}
        <div className='form-control'>
          <input
            type='text'
            name='text'
            placeholder='search'
            className='search-input'
            value={text}
            onChange={updateFilters}
          />
        </div>
        {/* end of search input */}
        {/* categories */}
          <h5>category</h5>
          <div>
            {uniqueCategories.map((c, index) => {
              return <button
                type='button'
                name='category'
                key={index}
                className={
                  /* compare two strings ignoring case but considering accent characters
                    (e.g. an 'a' with a line over it will not equal a regular 'a') */
                  category.localeCompare(c, 'en', {sensitivity: 'accent'}) ?
                    'active' : null
                }
                onClick={updateFilters}
              >
                {c}
              </button>
            })}
          </div>
        {/* end of categories */}
        {/* companies */}
        <div className='form-control'>
          <h5>company</h5>
          <select
            name='company'
            value={company}
            className='company'
            onChange={updateFilters}
          >
            {uniqueCompanies.map((c, index) => {
              return <option key={index} value={c}>
                {c}
              </option>;
            })}
          </select>
        </div>
        {/* end of companies */}
        {/* colors */}
        <div className='form-control'>
          <h5>colors</h5>
          <div className='colors'>
            {
              uniqueColors.map((c, index) => {

                if (c === 'all') {
                  return <button
                    key={index}
                    name='color'
                    onClick={updateFilters}
                    data-color='all'
                    className={`all-btn${color === ' all' ? 'active' : ''}`}
                  >
                    All
                  </button>
                }

                return <button
                  key={index}
                  name='color'
                  style={{background: c}}
                  className={`color-btn${c === color ? ' active' : ''}`}
                  onClick={updateFilters}
                  /* set the dataset property */
                  data-color={c}
                >
                  {/* add a check to this color button if it is selected */}
                  {c === color ? <FaCheck /> : null}
                </button>;
              })
            }
          </div>
        </div>
        {/* end of colors */}
        {/* price range */}
        <div className='form-control'>
          <h5>price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input
            type='range'
            name='price'
            onChange={updateFilters}
            min={minPrice}
            max={maxPrice}
            value={price}
          />
        </div>
        {/* end of price range */}
        {/* free shipping */}
        <div className='form-control shipping'>
          <label htmlFor='isFreeShipping'>free shipping</label>
          <input
            type='checkbox'
            name='isFreeShipping'
            id='isFreeShipping'
            onChange={updateFilters}
            checked={isFreeShipping}
            value={isFreeShipping}
          />
        </div>
        {/* end of free shipping */}
      </form>
      <button type='button' className='clear-btn' onClick={clearFilters}>
        clear filters
      </button>
    </div>
  </Wrapper>;
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
