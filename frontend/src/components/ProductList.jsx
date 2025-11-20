import PropTypes from 'prop-types'
import ProductCard from './ProductCard'

function ProductList({ items, onAddToCart }) {
  return (
    <div className="products">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      displayPrice: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductList
