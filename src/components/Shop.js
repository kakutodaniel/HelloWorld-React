import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Shop() {


    useEffect(() => {
        fetchItems();

    }, []);

    const [items_, setItems_] = useState([]);
    const [items, setItems] = useState([]);
    const [txtSearch, setTxtSearch] = useState('');

    const fetchItems = async () => {
        const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
        const items = await data.json();

        // console.log(items);

        setItems(items.drinks);
        setItems_(items.drinks);

    };

    function onChangeSearch(e) {
        const vl = e.target.value;
        setTxtSearch(vl);

        // console.log(items_);

        let filtered = items_.filter(item => item.strDrink.toLowerCase().indexOf(vl.toLowerCase()) >= 0);

        // console.log(filtered);
        // console.log(items);

        setItems(filtered);
    }


    return (
        <div>
            <input type="textbox" placeholder="Search" value={txtSearch} onChange={onChangeSearch} />
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