import { useEffect, useState } from "react"

function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("")

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    fetchProducts()

  }, [])

  const fetchProducts = async () => {

    try {

      setLoading(true)

      const response = await fetch(
        "https://fakestoreapi.com/products"
      )

      const data = await response.json()

      setProducts(data)

    }

    // eslint-disable-next-line no-unused-vars
    catch(error) {

      setError("Something went wrong")

    }

    finally {

      setLoading(false)

    }

  }

  let filteredProducts = [...products]

  if(category !== "all") {

    filteredProducts = filteredProducts.filter((product) => {

      return product.category === category

    })

  }

  if(sort === "lowToHigh") {

    filteredProducts.sort((a, b) => {

      return a.price - b.price

    })

  }

  if(sort === "highToLow") {

    filteredProducts.sort((a, b) => {

      return b.price - a.price

    })

  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        E-Commerce Store
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="px-4 py-3 rounded-lg border"
        >

          <option value="all">All Categories</option>

          <option value="electronics">Electronics</option>

          <option value="jewelery">Jewelery</option>

          <option value="men's clothing">Men's Clothing</option>

          <option value="women's clothing">Women's Clothing</option>

        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="px-4 py-3 rounded-lg border"
        >

          <option value="">
            Sort By
          </option>

          <option value="lowToHigh">
            Price: Low to High
          </option>

          <option value="highToLow">
            Price: High to Low
          </option>

        </select>

      </div>

      {
        loading && (
          <h2 className="text-center text-2xl">
            Loading...
          </h2>
        )
      }

      {
        error && (
          <h2 className="text-center text-red-500 text-2xl">
            {error}
          </h2>
        )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {
          filteredProducts.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:scale-105 transition duration-300"
            >

              <img
                src={product.image}
                alt={product.title}
                className="h-52 w-full object-contain"
              />

              <h2 className="font-bold text-lg mt-4 line-clamp-2">
                {product.title}
              </h2>

              <p className="text-gray-500 mt-2 capitalize">
                {product.category}
              </p>

              <div className="flex justify-between items-center mt-4">

                <h3 className="text-2xl font-bold text-green-600">
                  ${product.price}
                </h3>

                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                  Add
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default App