import React, { useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import { getData } from "../util/api";



import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { NoEncryption } from '@material-ui/icons';


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
    arrow:{
        width:400,
        height:400,
        border: '0px solid red'

    }
}))


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
                { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                // Shape.fill is bound to Node.data.color
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                { margin: 8, editable: true },  // some room around the text
                new go.Binding('text').makeTwoWay()
            )
        );

    return diagram;
}

function handleModelChange(changes) {
    alert('GoJS model changed!');
}

function Arrow(props) {
    const classes = useStyles()

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
                    { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    { margin: 8, editable: true },  // some room around the text
                    new go.Binding('text').makeTwoWay()
                )
            );
    
        return diagram;
    }
    
    function handleModelChange(changes) {
        alert('GoJS model changed!');
    }
    
    return (
        <div className={classes.root}>
            <p>asd</p>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName={classes.arrow}
                nodeDataArray={[
                    { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
                    { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
                    { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
                    { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
                ]}
                linkDataArray={[
                    { key: -1, from: 0, to: 1 },
                    { key: -2, from: 0, to: 2 },
                    { key: -3, from: 1, to: 1 },
                    { key: -4, from: 2, to: 3 },
                    { key: -5, from: 3, to: 0 }
                ]}
                onModelChange={handleModelChange}
            />
        </div>
    );
}

export default Arrow;
