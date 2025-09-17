import { useState } from "react";
import { FlatList, Image, ImageResizeMode, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Producto = {
  id: string;
  titulo: string;
  precio: string;
  descripcion: string;
  imagenLocal?: any;
  imagenUri?: string;
};

export default function Galeria() {
  const productosIniciales: Producto[] = [
    {
      id: "1",
      titulo: "Camiseta",
      precio: "$1500",
      descripcion: "Camiseta deportiva de algodón",
      imagenLocal: require("../assets/images/camiseta.jpg"), 
    },
    {
      id: "2",
      titulo: "Pantalón",
      precio: "$2500",
      descripcion: "Pantalón casual cómodo",
      imagenLocal: require("../assets/images/pantalon.jpg"), 
    },
    {
      id: "3",
      titulo: "Zapatillas",
      precio: "$5000",
      descripcion: "Zapatillas de running",
     imagenLocal: require("../assets/images/zapatillas.jpg"), 
    },
  ];

  const [filtro, setFiltro] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [resizeMode, setResizeMode] = useState<ImageResizeMode>("cover");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: Producto }) => {
    const esFavorito = favoritos.includes(item.id);
    return (
      <Pressable
        onPress={() => {
          setProductoSeleccionado(item);
          setModalVisible(true);
        }}
        onLongPress={() => toggleFavorito(item.id)}
        style={[styles.card, esFavorito && styles.favorito]}
      >
        <Image
          source={item.imagenLocal ? item.imagenLocal : { uri: item.imagenUri }}
          style={styles.imagen}
          resizeMode="cover"
        />
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.precio}>{item.precio}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar producto..."
        value={filtro}
        onChangeText={setFiltro}
        style={styles.input}
      />

      <FlatList
        data={productosIniciales.filter((p) =>
          p.titulo.toLowerCase().includes(filtro.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            {productoSeleccionado && (
              <>
                <Image
                  source={
                    productoSeleccionado.imagenLocal
                      ? productoSeleccionado.imagenLocal
                      : { uri: productoSeleccionado.imagenUri }
                  }
                  style={styles.imagenGrande}
                  resizeMode={resizeMode}
                />
                <Text style={styles.modalTitulo}>{productoSeleccionado.titulo}</Text>
                <Text style={styles.modalDescripcion}>{productoSeleccionado.descripcion}</Text>

                <View style={styles.buttonsResize}>
                  {(["cover", "contain", "stretch"] as ImageResizeMode[]).map((mode) => (
                    <Pressable
                      key={mode}
                      style={styles.buttonResize}
                      onPress={() => setResizeMode(mode)}
                    >
                      <Text style={styles.buttonText}>{mode}</Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  style={styles.cerrarButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f0f0f0" },
  input: {
    height: 40,
    borderColor: "#003366",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  card: {
    borderWidth: 3,
    borderColor: "#003366",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#cce6ff",
    alignItems: "center",
  },
  favorito: {
    borderColor: "gold",
    borderWidth: 4,
  },
  imagen: { width: 100, height: 100, marginBottom: 5, borderRadius: 10 },
  titulo: { fontSize: 18, fontWeight: "bold", color: "#003366" },
  precio: { fontSize: 16, color: "#003366" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#003366",
    padding: 20,
    borderRadius: 15,
    width: 300,
    alignItems: "center",
  },
  imagenGrande: { width: 250, height: 250, marginBottom: 10, borderRadius: 10 },
  modalTitulo: { fontSize: 22, color: "white", fontWeight: "bold" },
  modalDescripcion: { fontSize: 16, color: "white", marginBottom: 10, textAlign: "center" },
  buttonsResize: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 10 },
  buttonResize: { backgroundColor: "#cce6ff", padding: 5, borderRadius: 8 },
  buttonText: { color: "#003366", fontWeight: "bold" },
  cerrarButton: { backgroundColor: "gold", padding: 10, borderRadius: 10 },
});
