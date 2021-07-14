import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

  const {filteredProducts, isGridView} = useFilterContext();

  if (filteredProducts.length < 1) {
    /* remove the capitalize text transform for this message */
    return <h5 style={{textTransform: 'none'}}>
      Sorry, no products matched your search...
    </h5>
  }

  if (!isGridView) {
    return <ListView products={filteredProducts}>

    </ListView>
  }

  return <GridView products={filteredProducts}>
    Product List
  </GridView>
};

export default ProductList
