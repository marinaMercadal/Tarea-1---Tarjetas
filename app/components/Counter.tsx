
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Counter() {

  var valorInicial = 0;
  const [contador, setContador] = useState(valorInicial);

  function aumentar() { setContador(contador + 1); }
  function restar() { setContador(contador - 1); }
  function resetear() { setContador(valorInicial); }

  const colores = ["lightgreen", "lightblue", "lightpink", "lightyellow", "orange", "violet"];

  function getBackgroundColor() {
    if (contador === 0) return "white";
    const index = Math.floor(Math.random() * colores.length);
    return colores[index];
  }

  return (
    //<View style={[styles.completeScreenStyle, { backgroundColor: getBackgroundColor() }]}>
    <View style={styles.completeScreenStyle}>
      <View style={styles.counterContainer}>
        <Text style={styles.text}>Contador  {contador}</Text>

        <View style={[{ marginTop: 30 }, styles.buttons]}>
          <Button  title="Boton"></Button>
          <Pressable style={styles.button} onPress={aumentar}><Text style={styles.buttonText}> + </Text> </Pressable>
          <Pressable style={styles.button} onPress={restar}><Text style={styles.buttonText}> - </Text> </Pressable>
          <Pressable style={styles.button} onPress={resetear}><Text style={styles.buttonText}> ↺ </Text> </Pressable>


        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  completeScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  counterContainer: {

    borderWidth: 4,
    borderColor: "#01264bff",
    borderRadius: 35,
    backgroundColor: "#acd1f5ff",
    padding: 50
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    
  },
  buttons: {
  
    alignItems: "center",
    flexDirection: "row",
    gap: 30,

  },
  button: {
    
    //borderWidth: 2,
    //borderColor: "#01264bff",
    //backgroundColor: "#rgba(211, 232, 252, 1)",
    //borderRadius: 50,
    //padding: 6,
    //marginHorizontal: 5,

  },
  buttonText: {
    color:"#3782f2ff",
    fontSize: 30,
    fontWeight:"300"

  }
})