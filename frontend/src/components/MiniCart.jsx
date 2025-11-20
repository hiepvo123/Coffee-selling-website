import PropTypes from 'prop-types'

function MiniCart({
  items,
  totalItems,
  totalPrice,
  onIncrement,
  onDecrement,
  onRemove,
  formatCurrency,
}) {
  return (
    <aside className="mini-cart" aria-label="Giỏ hàng">
      <div className="mini-cart__header">
        <div>
          <p className="mini-cart__title">Giỏ hàng</p>
          <p className="mini-cart__subtitle">{totalItems} sản phẩm</p>
        </div>
        <div className="mini-cart__total">{formatCurrency(totalPrice)}</div>
      </div>

      {items.length === 0 ? (
        <p className="mini-cart__empty">Chưa có sản phẩm nào. Chọn một món bạn thích!</p>
      ) : (
        <ul className="mini-cart__list">
          {items.map((item) => (
            <li key={item.id} className="mini-cart__item">
              <div>
                <p className="mini-cart__item-name">{item.name}</p>
                <p className="mini-cart__item-price">{item.displayPrice}</p>
              </div>
              <div className="mini-cart__actions">
                <div className="quantity-control" aria-label={`Chỉnh số lượng cho ${item.name}`}>
                  <button onClick={() => onDecrement(item.id)} aria-label="Giảm số lượng">
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrement(item.id)} aria-label="Tăng số lượng">
                    +
                  </button>
                </div>
                <button className="mini-cart__remove" onClick={() => onRemove(item.id)}>
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

MiniCart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      displayPrice: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
}

export default MiniCart
