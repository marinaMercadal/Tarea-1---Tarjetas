import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Perfil() {
  const [nombre, setNombre] = useState("Marina Mercadal");
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);


  return (

    <View style={styles.container}>
      <View style={styles.cuadro}>
        <Text style={styles.nombre}>{nombre}</Text>
      </View>

      <Pressable style={styles.boton} onPress={() => { setModalVisible(true) }}>
        <Text style={styles.texto}>Cambiar nombre</Text>
      </Pressable>

      <Modal
  visible={modalVisible}
  transparent={true}
  animationType="fade"
>
 
  <View style={styles.modalBackground}>
   
    <View style={styles.modal}>
      <Text style={styles.texto}>Nuevo nombre:</Text>
      <TextInput placeholder="Ingrese un nombre"
        style={styles.input}
        onChangeText={setNuevoNombre}
        
      />
      <Pressable 
        onPress={() => {
          setNombre(nuevoNombre);
          setModalVisible(false);
        }}
      >
        <Text style={styles.texto}>Guardar</Text>
      </Pressable>
    </View>
  </View>
</Modal>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cuadro: {
    width: 200,
    height: 100,
    backgroundColor: "#cce6ff",
    borderColor: "#003366",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  nombre: {
    color: "#003366",
    fontSize: 20,
    fontWeight: "bold",
  },
  boton: {
    margin: 20,
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  texto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
modalBackground: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)", // 👈 fondo transparente
},
modal: {
  backgroundColor: "#003366",
  alignItems: "center",
  padding: 20,
  borderRadius: 10,
  width: 250,
},
input: {
  backgroundColor: "white",
  width: "100%",
  marginVertical: 10,
  padding: 8,
  borderRadius: 5,
},

});
