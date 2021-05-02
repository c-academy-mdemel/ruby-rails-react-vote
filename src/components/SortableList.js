import React, {useEffect, useState} from 'react';
import SortableList from 'react-sortable-dnd-list'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 100,
    },
    paper: {
        padding: 30,
        width: 700,

    },
    head: {
        fontSize: 20,
        fontWeight: 700,
    },
    addBtn: {
        background: "#00bcd4",
        height: 40
    },
    listItem: {
        fontSize: 15,
        fontFamily:"serif",
        margin: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "beige",
        padding: 5,
        width: 180
    },
}))

function ItemComponent({
                           dragging,
                           dragged,
                           children: {choice, index},
                           ...rest
                       }) {
    const classes = useStyles()
    return (

            <div {...rest} className={classes.listItem}>
                <div className="list__item-content">
                    <div className="list__item-choice">
                        {`${index+1}. ${choice}`}
                    </div>
                </div>
            </div>
    )
}

function SortableListWrapper({initialItems, getNewArray,setIsSorted}) {
    const [items, setItems] = useState(initialItems ? initialItems.map((item,index) => ({choice: item, index})) : [])


    useEffect(() => {
        if (JSON.stringify(initialItems)  !== JSON.stringify(items)) {
            setItems(initialItems ? initialItems.map((item,index) => ({choice: item, index})) : [])
        }
    }, [initialItems])

    function handleChangeOrder(newArray) {
        setItems(newArray)
        getNewArray(newArray)
        setIsSorted(true)
    }

    return (
        <SortableList
            className="list"
            itemComponent={ItemComponent}
            value={items}
            onChange={handleChangeOrder}/>
    )
}

export default SortableListWrapper;
