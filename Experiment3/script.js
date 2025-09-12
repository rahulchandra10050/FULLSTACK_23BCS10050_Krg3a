
const products = [
  { name: "Smartphone", category: "electronics" },
  { name: "Laptop", category: "electronics" },
  { name: "T-Shirt", category: "clothing" },
  { name: "Jeans", category: "clothing" },
  { name: "Headphones", category: "electronics" },
];

const container = document.getElementById("products-container");
const filter = document.getElementById("filter");
function renderProducts(items) {
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.textContent = product.name;
    container.appendChild(div);
  });
}

filter.addEventListener("change", () => {
  const selected = filter.value;
  if (selected === "all") {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === selected);
    renderProducts(filtered);
  }
});
renderProducts(products);
