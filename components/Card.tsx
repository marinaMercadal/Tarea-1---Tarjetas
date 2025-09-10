
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
type CardProps = {
    text: string,
}

export default function Card(props: CardProps) {
    const [textColor, setTextColor] = useState("#003366");
    const [backGroundColor, setbackGroundColor] = useState("#cce6ff");
    function changeColor(){
        if(textColor==="#003366"){
            setTextColor("#cce6ff");
            setbackGroundColor("#003366")
        }else{
            setTextColor("#003366");
            setbackGroundColor("#cce6ff")
        }
    }


    return (
        <Pressable onPress={changeColor} >
           
                <Text style={[styles.card,{color:textColor,backgroundColor: backGroundColor}]}>{props.text}</Text>
           
        </Pressable>

    );
}


const styles = StyleSheet.create({
    card: {
        
        fontSize: 30,
        textAlign: "center",
        paddingVertical: 20,       
        paddingHorizontal: 40,
        padding: 7,
        margin: 7,
        alignSelf: "flex-start",
         borderWidth: 4,
        borderColor: "#003366",
        borderRadius: 35,
    },
});