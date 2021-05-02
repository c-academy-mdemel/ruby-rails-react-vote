import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        placeContent: "center",
        paddingTop: 100,
        background: "linear-gradient(169deg, rgba(6,110,221,1) 0%, rgba(96,153,229,1) 0%, rgba(193,199,238,1) 16%, rgba(255,255,255,1) 67%)"
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
        display: "flex",
        margin: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "beige",
        padding: 5,
        width: 180
    },
    arrow: {
        width: 400,
        height: 400,
        border: '0px solid red'

    }
}))



function Arrow(props) {
    const classes = useStyles()
    const [res, setRes] = useState(JSON.parse(localStorage.getItem("finalResult")))

    console.log(res);
    function initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
            $(go.Diagram,
                {
                    'undoManager.isEnabled': true,  // must be set to allow for model change listening
                    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                        })
                });

        // define a simple Node template
        diagram.nodeTemplate =
            $(go.Node, 'Auto',  // the Shape will go around the TextBlock
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'RoundedRectangle',
                    { name: 'SHAPE', fill: 'white', strokeWidth: 0, width: 40, height: 40, margin: 30 },
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    { margin: 8, editable: true },  // some room around the text
                    new go.Binding('text').makeTwoWay()
                )
            );
        diagram.linkTemplate =
            $(go.Link,
                // get the link spots from the link data
                new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
                new go.Binding("toSpot", "toSpot", go.Spot.parse),
                $(go.Shape),
                $(go.Shape, { toArrow: "Standard" })
            );
        return diagram;
    }




    function createNodeArray(lockArray) {
        let nodeArray = []
        for (let i = 0; i < lockArray.length; i++) {
            nodeArray.push({ key: i, text: i, color: 'lightblue' },);
        }
        return nodeArray;
    }

    function createEdgeArray(lockArray) {
        let linkDataArray = []
        let count = 1;
        for (let i = 0; i < lockArray.length; i++) {
            const line = lockArray[i];
            for (let j = 0; j < line.length; j++) {
                const isConnected = line[j];
                if (isConnected) {
                    linkDataArray.push({ key: -count, from: j, to: i },);
                    count = count - 1;
                }

            }

        }
        return linkDataArray;
    }
    console.log(createNodeArray(res.data.arrow_lock));
    return (
        <div style={{}}>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName={classes.arrow}
                nodeDataArray={createNodeArray(res.data.arrow_lock)}
                linkDataArray={createEdgeArray(res.data.arrow_lock)}
            />
        </div>
    );
}

export default Arrow;
