import { useMemo, useState } from 'react'
import './App.css'
import MiniCart from './components/MiniCart'
import ProductList from './components/ProductList'
import { products } from './data/products'

function App() {
  const [cartItems, setCartItems] = useState([])

  const formatCurrency = (value) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const incrementItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const decrementItem = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const cartSummary = useMemo(
    () => ({
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    [cartItems]
  )

  const benefits = [
    {
      title: 'Nguồn hạt tuyển chọn',
      description: 'Hợp tác cùng nông hộ Đà Lạt và Đắk Lắk, rang thủ công mỗi tuần để giữ trọn hương vị.',
    },
    {
      title: 'Pha chế tỉ mỉ',
      description: 'Barista cân chỉnh tỷ lệ chuẩn, đảm bảo từng ly đồng đều về vị và độ tươi mới.',
    },
    {
      title: 'Giao hàng nhanh',
      description: 'Đóng gói giữ nhiệt, giao nội thành 30 phút; hỗ trợ đặt lịch cho văn phòng.',
    },
  ]

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__content">
          <p className="badge">Cà phê rang tươi mỗi ngày</p>
          <h1>Thưởng thức mùi hương cà phê bạn yêu thích</h1>
          <p className="hero__subtitle">
            Menu lựa chọn từ espresso đậm đà, latte êm ái tới cold brew tươi mát. Đặt ly cà phê
            chuẩn gu và nhận ngay trong tích tắc.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary">Đặt hàng ngay</button>
            <button className="btn btn--ghost">Xem menu</button>
          </div>
          <div className="hero__stats">
            <div>
              <strong>4.9/5</strong>
              <span>Đánh giá từ 2K+ khách hàng</span>
            </div>
            <div>
              <strong>15+</strong>
              <span>Cửa hàng giao nhanh</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Hạt rang tươi mới</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__badge">Made with love</div>
          <div className="hero__image" aria-hidden="true"></div>
          <div className="hero__note">Giao nóng tận nơi • Cold brew giữ lạnh 4 tiếng</div>
        </div>
      </header>

      <section className="section">
        <div className="section__header">
          <p className="badge">Sản phẩm nổi bật</p>
          <div>
            <h2>Hương vị dành cho mọi khoảnh khắc</h2>
            <p className="section__subtitle">
              Chọn nhanh những món bán chạy nhất, từ ly cà phê sáng sảng khoái đến túi hạt rang mang về.
            </p>
          </div>
          <div className="section__cart-summary" aria-label="Tóm tắt giỏ hàng">
            <span>{cartSummary.totalItems} món</span>
            <strong>{formatCurrency(cartSummary.totalPrice)}</strong>
          </div>
        </div>
        <div className="product-layout">
          <ProductList items={products} onAddToCart={addToCart} />
          <MiniCart
            items={cartItems}
            totalItems={cartSummary.totalItems}
            totalPrice={cartSummary.totalPrice}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
            formatCurrency={formatCurrency}
          />
        </div>
      </section>

      <section className="section benefits">
        <div className="section__header">
          <p className="badge">Lý do chọn chúng tôi</p>
          <h2>Một ly ngon bắt đầu từ những chi tiết nhỏ</h2>
        </div>
        <div className="benefits__grid">
          {benefits.map((item) => (
            <div key={item.title} className="benefit-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="badge badge--light">Ưu đãi hôm nay</p>
          <h2>Sẵn sàng cho ly cà phê tiếp theo?</h2>
          <p className="cta__text">
            Giảm 15% cho đơn đầu tiên, miễn phí topping bọt sữa hoặc shot espresso thêm.
          </p>
        </div>
        <div className="cta__actions">
          <button className="btn btn--primary">Nhận ưu đãi</button>
          <button className="btn btn--ghost btn--light">Liên hệ tư vấn</button>
        </div>
      </section>
    </div>
  )
}

export default App
