import PropTypes from 'prop-types'

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <span className="product-card__tag">{product.tag}</span>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <div className="product-card__header">
          <h3>{product.name}</h3>
          <span className="product-card__price">{product.displayPrice}</span>
        </div>
        <p className="product-card__description">{product.description}</p>
        <button className="btn btn--link" onClick={() => onAddToCart(product)}>
          Thêm vào giỏ
        </button>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    displayPrice: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductCard
