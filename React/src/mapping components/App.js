import React from "react"
import Product from "./MappingComponents"
import productsData from "./vschoolProducts"

function App() {
    const productComponents = productsData.map(item => <Product key={item.id} product={item}/>)
    
    return (
        <div>
            {productComponents}
        </div>
    )
}

export default App