import './App.css'
import ProductCard from './ProductCard'
function App() {
  return (
    <>
      <ProductCard  name="Samsung S9+" price={26000} 
        description="12.4-inch Android tablet with 8GB RAM, 128/256GB storage, and S Pen support."
        inStock={false}
      />

      <ProductCard name="Samsung Galaxy S24FE" price={29999} 
        description="Display: 6.7, Dynamic AMOLED 2X, 120Hz Adaptive Refresh Rate with Exynos processor."
        inStock={true}
      />

      <ProductCard name="iPhone 14" price={43000} 
        description="iPhone 14 features a 6.1-inch Super Retina XDR OLED display"
        inStock={false}
      />
    </>
  )
}
export default App

