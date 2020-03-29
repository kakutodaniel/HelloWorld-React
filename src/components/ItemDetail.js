import React, { useState, useEffect } from 'react'


function Item({ match }) {

    useEffect(() => {
        fetchItem();
        // console.log(match)

    }, []);

    const [item, setItem] = useState({});

    const fetchItem = async () => {
        const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
        const item = await data.json();

        console.log(item);

        setItem(item.drinks[0]);

    };

    return (
        <div>
            <h1>{item.strDrink}</h1>
            <h2>{item.strCategory}</h2>
            <img src={item.strDrinkThumb} alt="drink" />

        </div>



    )


}

export default Item;