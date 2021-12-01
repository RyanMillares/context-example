import Head from 'next/head'
import ItemCard from '../components/ItemCard'
import { useUser } from '../context/UserContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/dist/client/link'

export default function Checkout() {
 
  const router = useRouter()
  const { user, setUser } = useUser()
  const [cartItems, setCart] = useState([])
  let itemList =  [
    { 
      name: 'Snake Plant', 
      img: 'https://res.cloudinary.com/social-upload-prod-media-cld/image/upload/shopify/1/0207/8508/products/SnakePlant_3.jpg?v=1589545105',
      quantity: 0,
      price: 60
    },
    { 
      name: 'Fiddle Leaf Fig', 
      img: 'https://dy1yydbfzm05w.cloudfront.net/media/catalog/product/cache/39b52c4cabb46819553175347e38b212/f/l/flowerbx-plants-product-fiddle-leaf-fig-tall-1000px-2.jpg',
      quantity: 0,
      price: 85
    },
    { 
      name: 'Pothos', 
      img: 'https://pyxis.nymag.com/v1/imgs/db8/d42/9f4f96e410a2e722d730577f90aff42ac2-2-sill-pothos-1.rsquare.w700.jpg',
      quantity: 0,
      price: 20
    },
    { 
      name: 'Monstera', 
      img: 'https://cdn.shopify.com/s/files/1/2622/8410/products/bloomr-usa-plants-beige-potted-monstera-plant-luxury-artificial-flowers-luxury-artificial-plants-luxury-artificial-trees-silk-orchids-wholesale-artificial-flowers-6988821004377_2024x2024.jpg?v=1557203026',
      quantity: 0,
      price: 120
    }
  ]
  const evaluateQuants = () => {
    console.log('test1')

    user.cart.map((plant) => {
      itemList.map((item) => {
        if(plant.name == item.name) {
          item.quantity += 1
        }
      })
    })
    setCart(itemList)
  }
  
  const getTotalPrice = () => {
    let total = 0
     user.cart.map((plant) => {
       total += plant.price
       
     })
     return total
  }
  useEffect(() => {
    if(cartItems.length == 0) {
      evaluateQuants()
    }
    console.log(cartItems)
  })

  return (
    <div>
      <Head>
        <title>Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <button type = "button" style = {{cursor: 'pointer', marginBottom: '15px', fontWeight: 'bold', color: 'white', fontSize: '20px', padding: '5px 10px 5px 10px', borderStyle: 'solid', borderColor: '#116644', backgroundColor: 'teal', borderRadius: '4px'}}onClick = {() => {
          
          router.push("/")
        }}>Back to Shopping</button>
        <h1 className="white">{user.name}, let's checkout!</h1>
        <p className="white">You have {user.cart.length} items in your cart.</p>
        <div>
          {
            /* TODO: Style the checkout page so the cart maps through
              * to a component for each item in the cart
            */
           cartItems != null && (
            cartItems.map((plant) => {
              return (
                <ItemCard
                  name={plant.name}
                  img={plant.img}
                  price={plant.price}
                  checkingOut={true}
                  amount = {plant.quantity}
                />
              )
            })
           ) 
            
          }
        </div>
        <button type = "button" style = {{cursor: 'pointer', marginTop: '15px', fontWeight: 'bold', color: 'white', fontSize: '20px', padding: '5px 10px 5px 10px', borderStyle: 'solid', borderColor: '#116644', backgroundColor: 'teal', borderRadius: '4px'}}onClick = {() => {
          alert("Drained $" + getTotalPrice() + " from your bank account. Thanks for shopping!")
          setCart([])
          user.cart = []
          router.push("/")
        }}>Checkout</button>
      </main>
       <p className="total">Total: ${getTotalPrice()}</p>
    </div>
  )
}