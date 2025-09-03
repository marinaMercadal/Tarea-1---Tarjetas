//import Counter from "./components/Counter";
import { StyleSheet, View } from "react-native";
import Card from "./components/Card";
export default function Index() {
  //return <Counter />;

  return  (
    <View style={styles.container}>
      <Card text="Tarjeta 1" />
      <Card text="Tarjeta 2" />
      <Card text="Tarjeta 3" />
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