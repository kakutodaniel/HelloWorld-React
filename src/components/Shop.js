import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'


function Shop() {


    useEffect(() => {
        setTimeout(() => {
            fetchItems()
        }, 500)

    }, []);

    const [loading, setLoading] = useState(true);
    const [items_, setItems_] = useState([]);
    const [items, setItems] = useState([]);
    const [txtSearch, setTxtSearch] = useState('');

    const fetchItems = async () => {
        const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const items = await data.json();

        // console.log(items);

        setItems(items.drinks);
        setItems_(items.drinks);
        setLoading(false);

    };

    const onChangeSearch = (e) => {
        const vl = e.target.value;
        setTxtSearch(vl);

        // console.log(items_);

        let filtered = items_.filter(item => item.strDrink.toLowerCase().indexOf(vl.toLowerCase()) >= 0);

        // console.log(filtered);
        // console.log(items);

        setItems(filtered);
    }

    const data = items.map(item => (
        <h1 key={item.idDrink}>
            <Link to={`/shop/${item.idDrink}`}>{item.strDrink}</Link>
        </h1>
    ));

    return (
        <Fragment>
            {
                loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )
                    : (
                        <div>
                            <input type="textbox" placeholder="Search" value={txtSearch} onChange={onChangeSearch} />
                            {data}
                        </div>
                        // <input type="textbox" placeholder="Search" value={txtSearch} onChange={onChangeSearch} />
                        // {data}
                        //             {

                        //     items.map(item => (
                        //         <h1 key={item.idDrink}>
                        //             <Link to={`/shop/${item.idDrink}`}>{item.strDrink}</Link>
                        //         </h1>
                        //     ))

                        // }


                    )

            }

        </Fragment>
    )

}

export default Shop;