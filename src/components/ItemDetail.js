import React, { useState, useEffect, Fragment } from 'react'


function Item({ match }) {

    useEffect(() => {
        // console.log(match);

        setTimeout(() => {
            fetchItem();
        }, 500);

        // fetchItem();
        // console.log(match)

    }, []);

    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({});

    const fetchItem = async () => {
        const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`);
        const item = await data.json();

        console.log(item);

        setItem(item.drinks[0]);
        setLoading(false);

    };

    return (
        <Fragment>
            {
                loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) :
                    (
                        <div>
                            <h1>{item.strDrink}</h1>
                            <h2>{item.strCategory}</h2>
                            <img src={item.strDrinkThumb} alt="drink" />
                        </div>
                    )
            }

        </Fragment>
    )

    // if (loading) {
    //     return (
    //         <div>
    //             <h1>Loading...</h1>
    //         </div>
    //     )
    // }
    // else {
    //     return (
    //         <div>
    //             <h1>{item.strDrink}</h1>
    //             <h2>{item.strCategory}</h2>
    //             <img src={item.strDrinkThumb} alt="drink" />

    //         </div>
    //     )
    // }

}

export default Item;