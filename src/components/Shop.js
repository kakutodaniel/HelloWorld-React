import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Shop() {
    useEffect(() => {
        fetchItems();

    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const items = await data.json();

        console.log(items);

        setItems(items.drinks);

    };



    return (
        <div>
            {

                items.map(item => (
                    <h1 key={item.idDrink}>
                        <Link to={`/shop/${item.idDrink}`}>{item.strDrink}</Link>
                    </h1>
                ))

            }

        </div>



    )


}

export default Shop;