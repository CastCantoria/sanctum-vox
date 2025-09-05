import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export async function uploadFileAndGetURL(file, path) {
  const storage = getStorage()
  const ref = storageRef(storage, path)
  await uploadBytes(ref, file)
  return await getDownloadURL(ref)
}

export async function deleteFile(path) {
  const storage = getStorage()
  const ref = storageRef(storage, path)
  await deleteObject(ref)
}