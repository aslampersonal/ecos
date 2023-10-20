import { useEffect, createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyContext = createContext();

export function useCont() {
    return useContext(MyContext);
  }
  
  export function ContProvider({ children }) {
    
    useEffect(() => {
        getData();
    }, []);
    
    const [prodData, setData] = useState([]);
    const [file, setFile] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartProds, setCartProds] = useState([]);
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);

    const states = {
        prodData,
        setData,
        file,
        setFile,
        cart, 
        setCart,
        cartProds,
        setCartProds,
        orders,
        setOrders,
        token, 
        setToken,
        user,
        getData, 
        setUser,
        getCart,
        getOrders,
    };

    async function getData() {
      await axios.get('http://localhost:3000/api/users/products')
      .then((response) => {
          setData(response.data);
          // localStorage.setItem("fullProducts", response.data);
          return response.data;
      })
      .catch((err) => {
          console.log("error: " + err);
      })
    }

    async function getCart() {
      
      const jwtToken = Cookies.get("jwtToken");
      setCart([]);
      if (jwtToken) {
        await axios.get("http://localhost:3000/api/users/cart",
        {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
        })
        .then((response) => {
          setCart(response.data.cart);
          const localCart = JSON.parse(localStorage.getItem("cart"));
          if (localCart) {
            let newc = response.data.cart;
            for(let i=0; i<localCart.length; i++) {
              newc = [...newc, localCart[i]];
            }
            setCart(newc);
          }

          const productData = localStorage.getItem("productData");
          if (productData) {
            let productList = [];
            let newCart = [...new Set(cart)];
            for (let i=0; i<newCart.length; i++) {
              const newpd = JSON.parse(productData).filter((prod) => prod._id == newCart[i]);
              productList.push(newpd[0]);
            }
            setCartProds(productList);
            localStorage.setItem("cartProducts", JSON.stringify(productList));
          }
        })
        .catch((error) => {
          console.log("Error getting cart details: ", error);
        }); 
      } else {
        const cart = JSON.parse(localStorage.getItem("cart"));
        setCart(cart);

        const productData = localStorage.getItem("productData");
        if (productData) {
          let productList = [];
          let newCart = [...new Set(cart)];
          for (let i=0; i<newCart.length; i++) {
            const newpd = JSON.parse(productData).filter((prod) => prod._id == newCart[i]);
            productList.push(newpd[0]);
          }
          setCartProds(productList);
          localStorage.setItem("cartProducts", JSON.stringify(productList));
        }
      }

    }

    async function getOrders() {
      
      const jwtToken = Cookies.get("jwtToken");
      await axios.get("http://localhost:3000/api/users/orders",
      {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
      })
      .then((response) => {
        setOrders(response.data.orders);
        localStorage.setItem("orders", JSON.stringify(response.data.orders));
      })
      .catch((error) => {
        console.log("Error getting cart details: ", error);
      });

    }
  
    return (
      <MyContext.Provider value={ states }>
        {children}
      </MyContext.Provider>
    );
  }
