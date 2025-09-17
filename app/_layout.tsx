import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="contador" 
        options={{ 
          title: "Contador",
          tabBarLabel: "Contador"
        }} 
      />
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Tarjeta",
          tabBarLabel: "Tarjeta"
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: "Perfil",
          tabBarLabel: "Perfil"
        }} 
      />
      <Tabs.Screen 
        name="galeria" 
        options={{ 
          title: "Galería",
          tabBarLabel: "Galería"
        }} 
      />
    </Tabs>
  );
}
