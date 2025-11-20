import espresso from '../assets/espresso.svg'
import latte from '../assets/latte.svg'
import coldBrew from '../assets/cold-brew.svg'
import beans from '../assets/beans.svg'

export const products = [
  {
    id: 'espresso',
    name: 'Espresso Signature',
    price: 65000,
    displayPrice: '65.000đ',
    description: 'Shot espresso đậm đà, cân bằng giữa crema mịn và hương cacao.',
    image: espresso,
    tag: 'Best Seller',
  },
  {
    id: 'latte',
    name: 'Latte Caramel',
    price: 72000,
    displayPrice: '72.000đ',
    description: 'Sữa tươi đánh bọt mịn, caramel ngọt dịu, hương vị êm ái.',
    image: latte,
    tag: 'New',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew Cam Sấy',
    price: 68000,
    displayPrice: '68.000đ',
    description: 'Ủ lạnh 18 giờ với vỏ cam sấy, hậu vị tươi mát kéo dài.',
    image: coldBrew,
    tag: 'Chill',
  },
  {
    id: 'beans',
    name: 'Hạt rang Medium',
    price: 320000,
    displayPrice: '320.000đ/kg',
    description: 'Blend Arabica & Robusta rang medium, ngọt hạt dẻ, ít đắng.',
    image: beans,
    tag: 'Whole Bean',
  },
]
