
import { StyleSheet, View } from "react-native";
import Card from "../components/Card";
export default function TarjetaScreen() {

  return  (
    <View style={styles.container}>
      <Card text="Tarjeta 1"/>
      <Card text="Tarjeta 2"/>
      <Card text="Tarjeta 3"/>
      <Card text="Tarjeta 4"/>
      <Card text="Tarjeta 5"/>
      <Card text="Tarjeta 6"/>
    </View>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    justifyContent: "center", 
    alignItems: "center",    
  },
});