/* TODO: style me! */
export default function ItemCard({ name, img, stock, price, add, checkingOut, amount }) {
    return (
        (amount > 0 || !checkingOut) && (
            <article className={checkingOut ? "cardOut" : "card"}>
        <div className="img-wrapper">
            <img src={img} alt={name} />
        </div>
        <div className="content">
        <h2 className="plant-name">{name}</h2>
        <p className="price">Unit Price: ${price}</p>
        {
            checkingOut && (
                <p className="price">Quanity: x{amount}</p>

            )
        }



        {
            checkingOut && (
                <h2 className = "plant-name">Item Total: ${price * amount}</h2>

            )
        }
        {
            !checkingOut && (
            <button onClick={() => add(name)} className={stock <= 0 ? 'disabled' : '' } style = {{cursor: 'pointer'}}>Add to Cart</button>
            )
        }
        </div>
    </article>
        )
    )
    
}