import React, { useState } from 'react'
import styled from 'styled-components'

/* images is initially undefined so assign it to an empty
  array if necessary in order to prevent an exception */
const ProductImages = ({images = []}) => {
  // console.log('images:', images);

  const [mainImgObj, setMainImg] = useState(images[0]);

  return <Wrapper>
    {/* use the optional chaining operator in cases mainImgObj is undefined */}
    <img
      src={mainImgObj?.url}
      alt='main'
      className='main'
    />

    <div className='gallery'>
      {images.map((imgObj, index) => {
        return <img
          key={index}
          src={imgObj.url}
          alt={imgObj.filename}
          onClick={() => {
            setMainImg(images[index]);
          }}
          /* add the active class if this image is currently selected */
          className={`${imgObj.url === mainImgObj.url ? 'active' : ''}`}
        />;
      })}
    </div>
  </Wrapper>;
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
