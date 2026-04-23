// import { useEffect, useState } from "react";

// function App() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const API = import.meta.env.VITE_API_URL;

//     fetch(`${API}/api/products`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         setProducts(data);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>Products</h1>

//       {products.map((item) => (
//         <div key={item._id}>
//           <h3>{item.name}</h3>
//           <p>₹{item.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;