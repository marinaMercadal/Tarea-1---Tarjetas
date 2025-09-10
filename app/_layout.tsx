import { Tabs } from "expo-router";

export default function Layout() {
  return (<Tabs>
    <Tabs.Screen name= "contador" options={{title:"Contador"}}/>
    <Tabs.Screen name= "index" options={{title:"Tarjeta"}}/>
    <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    
  </Tabs>);
}
