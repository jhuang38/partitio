import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";

export default function MenuItems({items = [], actionMap = []}) {
    return (
        <List disablePadding = {true}>
            {
            items.map((text, index) => 
                <ListItem key = {index} sx = {{
                    minWidth: 200
                }}
                disablePadding={true}
                >
                    <ListItemButton onClick = {actionMap[index]}>
                        <ListItemText>
                        {text}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                
            )
            }
        </List>
        
    )
}