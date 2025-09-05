import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "../firebase"

export function useStorage() {
  /**
   * Téléverse un fichier dans Firebase Storage
   * @param {File} file - Le fichier à téléverser
   * @param {string} path - Le chemin de destination (ex: 'avatars/userId/image.png')
   * @returns {Promise<string>} - L'URL publique du fichier
   */
  const uploadFile = async (file, path) => {
    try {
      const fileRef = storageRef(storage, path)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      return url
    } catch (err) {
      console.error("Erreur d'upload :", err)
      throw err
    }
  }

  /**
   * Supprime un fichier de Firebase Storage
   * @param {string} path - Le chemin du fichier à supprimer
   */
  const deleteFile = async (path) => {
    try {
      const fileRef = storageRef(storage, path)
      await deleteObject(fileRef)
    } catch (err) {
      console.error("Erreur de suppression :", err)
      throw err
    }
  }

  /**
   * Récupère l'URL publique d'un fichier existant
   * @param {string} path - Le chemin du fichier
   * @returns {Promise<string>} - L'URL publique
   */
  const getFileURL = async (path) => {
    try {
      const fileRef = storageRef(storage, path)
      const url = await getDownloadURL(fileRef)
      return url
    } catch (err) {
      console.error("Erreur de récupération d'URL :", err)
      throw err
    }
  }

  return {
    uploadFile,
    deleteFile,
    getFileURL
  }
}