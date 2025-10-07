import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageResizeMode,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BACKEND_URL } from "../config";

type Producto = {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagenUri?: string | null;
};

export default function Galeria() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [resizeMode, setResizeMode] = useState<ImageResizeMode>("cover");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const [nuevoModalVisible, setNuevoModalVisible] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    titulo: "",
    precio: "",
    descripcion: "",
    imagenUri: "",
  });

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const fetchProductos = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/products`);
      if (!res.ok) throw new Error("Error en la respuesta del servidor");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const crearProducto = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: nuevoProducto.titulo,
          precio: Number(nuevoProducto.precio),
          descripcion: nuevoProducto.descripcion,
          imagenUri: nuevoProducto.imagenUri || null,
        }),
      });
      if (!res.ok) throw new Error("Error creando producto");
      const prod = await res.json();
      setProductos((prev) => [...prev, prod]);
      setNuevoModalVisible(false);
      setNuevoProducto({ titulo: "", precio: "", descripcion: "", imagenUri: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Producto }) => {
    const esFavorito = favoritos.includes(item.id);
    const source =
      item.imagenUri && item.imagenUri.trim() !== ""
        ? { uri: item.imagenUri }
        : require("../assets/images/camiseta.jpg"); // placeholder local

    return (
      <Pressable
        onPress={() => { setProductoSeleccionado(item); setModalVisible(true); }}
        onLongPress={() => toggleFavorito(item.id)}
        style={[styles.card, esFavorito && styles.favorito]}
      >
        <Image source={source} style={styles.imagen} resizeMode="cover" />
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

      <Pressable
        style={styles.nuevoButton}
        onPress={() => setNuevoModalVisible(true)}
      >
        <Text style={styles.buttonText}>Nuevo producto</Text>
      </Pressable>

      <FlatList
        data={productos.filter((p) =>
          p.titulo.toLowerCase().includes(filtro.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal producto */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            {productoSeleccionado && (
              <>
                <Image
                  source={
                    productoSeleccionado.imagenUri && productoSeleccionado.imagenUri.trim() !== ""
                      ? { uri: productoSeleccionado.imagenUri }
                      : require("../assets/images/camiseta.jpg")
                  }
                  style={styles.imagenGrande}
                  resizeMode={resizeMode}
                />
                <Text style={styles.modalTitulo}>{productoSeleccionado.titulo}</Text>
                <Text style={styles.modalDescripcion}>{productoSeleccionado.descripcion}</Text>

                <View style={styles.buttonsResize}>
                  {(["cover", "contain", "stretch"] as ImageResizeMode[]).map((mode) => (
                    <Pressable key={mode} style={styles.buttonResize} onPress={() => setResizeMode(mode)}>
                      <Text style={styles.buttonText}>{mode}</Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable style={styles.cerrarButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal nuevo producto */}
      <Modal visible={nuevoModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <TextInput
              placeholder="Título"
              value={nuevoProducto.titulo}
              onChangeText={(t) => setNuevoProducto((p) => ({ ...p, titulo: t }))}
              style={styles.inputModal}
            />
            <TextInput
              placeholder="Precio"
              value={nuevoProducto.precio}
              keyboardType="numeric"
              onChangeText={(t) => setNuevoProducto((p) => ({ ...p, precio: t }))}
              style={styles.inputModal}
            />
            <TextInput
              placeholder="Descripción"
              value={nuevoProducto.descripcion}
              onChangeText={(t) => setNuevoProducto((p) => ({ ...p, descripcion: t }))}
              style={styles.inputModal}
            />
            <TextInput
              placeholder="URL imagen"
              value={nuevoProducto.imagenUri}
              onChangeText={(t) => setNuevoProducto((p) => ({ ...p, imagenUri: t }))}
              style={styles.inputModal}
            />

            <Pressable style={styles.nuevoButton} onPress={crearProducto}>
              <Text style={styles.buttonText}>Guardar</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={() => setNuevoModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f0f0f0" },
  input: { height: 40, borderColor: "#003366", borderWidth: 2, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10, backgroundColor: "white" },
  inputModal: { height: 40, borderColor: "#003366", borderWidth: 2, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10, backgroundColor: "white", width: "100%" },
  card: { borderWidth: 3, borderColor: "#003366", borderRadius: 20, padding: 10, marginBottom: 10, backgroundColor: "#cce6ff", alignItems: "center" },
  favorito: { borderColor: "gold", borderWidth: 4 },
  imagen: { width: 100, height: 100, marginBottom: 5, borderRadius: 10 },
  titulo: { fontSize: 18, fontWeight: "bold", color: "#003366" },
  precio: { fontSize: 16, color: "#003366" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modal: { backgroundColor: "#003366", padding: 20, borderRadius: 15, width: 300, alignItems: "center" },
  imagenGrande: { width: 250, height: 250, marginBottom: 10, borderRadius: 10 },
  modalTitulo: { fontSize: 22, color: "white", fontWeight: "bold" },
  modalDescripcion: { fontSize: 16, color: "white", marginBottom: 10, textAlign: "center" },
  buttonsResize: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 10 },
  buttonResize: { backgroundColor: "#cce6ff", padding: 5, borderRadius: 8 },
  cerrarButton: { backgroundColor: "gold", padding: 10, borderRadius: 10, marginBottom: 5 },
  nuevoButton: { backgroundColor: "#003366", padding: 10, borderRadius: 10, marginVertical: 5 },
  cancelButton: { backgroundColor: "red", padding: 10, borderRadius: 10, marginTop: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
