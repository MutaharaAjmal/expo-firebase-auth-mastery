import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";

const ModalDialogBox = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="flex-1 bg-sky-100 p-5">
      <Text className="text-3xl font-bold text-center text-black mb-5">
        Modal Component
      </Text>
      <TouchableOpacity
        // style={styles.openButton}
        className="bg-purple-500  py-3 mb-3  rounded-full "
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-bold text-lg text-center">
          Show Modal
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Beautiful Modal</Text>
            <Text style={styles.modalText}>This is Beautiful Modal</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  closeButton: {
    backgroundColor: "#03dace",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default ModalDialogBox;
