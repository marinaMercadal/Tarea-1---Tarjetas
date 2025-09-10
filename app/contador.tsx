
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Counter() {

  var valorInicial = 0;
  const [contador, setContador] = useState(valorInicial);

  function aumentar() { setContador(contador + 1); }
  function restar() { setContador(contador - 1); }
  function resetear() { setContador(valorInicial); }

  

  return (
  
    <View style={styles.completeScreenStyle}>
      <View style={styles.counterContainer}>
        <Text style={styles.text}>Contador  {contador}</Text>

        <View style={[{ marginTop: 30 }, styles.buttons]}>
   
          <Pressable  onPress={restar}><Text style={styles.buttonText}> - </Text> </Pressable>
          <Pressable  onPress={resetear}><Text style={styles.buttonText}> ↺ </Text> </Pressable>
           <Pressable  onPress={aumentar}><Text style={styles.buttonText}> + </Text> </Pressable>
          


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
    borderColor: "#003366",
    borderRadius: 35,
    backgroundColor: "#cce6ff",
    padding: 50
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
   

  },
  
  buttonText: {
    color:"#003366",
    fontSize: 40,
    fontWeight:"300"

  }
})