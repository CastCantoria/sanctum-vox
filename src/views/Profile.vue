<script setup>
import { ref, onMounted } from "vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import { useAuth } from "../composables/useAuth"
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"

const { user, role, updateProfile, changePassword } = useAuth()

const isEditing = ref(false)
const displayName = ref("")
const phone = ref("")
const avatar = ref(null)
const preview = ref("")

const oldPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showSuccessMessage = ref(false)

onMounted(() => {
  if (user.value) {
    displayName.value = user.value.displayName || ""
    phone.value = user.value.phoneNumber || ""
    preview.value = user.value.photoURL || "/assets/avatar.png"
  }
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
  showSuccessMessage.value = false
}

const handleAvatarChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    avatar.value = file
    preview.value = URL.createObjectURL(file)
  }
}

const saveChanges = async () => {
  try {
    // Mise à jour du profil
    await updateProfile(user.value, {
      displayName: displayName.value,
      phoneNumber: phone.value,
      photoURL: avatar.value ? URL.createObjectURL(avatar.value) : user.value.photoURL
    })

    // Rafraîchir l'avatar dans le header
    user.value.photoURL = avatar.value ? URL.createObjectURL(avatar.value) : user.value.photoURL

    // Changement de mot de passe si demandé
    if (oldPassword.value || newPassword.value || confirmPassword.value) {
      if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
        alert("Veuillez remplir tous les champs de mot de passe.")
        return
      }
      if (newPassword.value !== confirmPassword.value) {
        alert("Le nouveau mot de passe et sa confirmation ne correspondent pas.")
        return
      }

      const credential = EmailAuthProvider.credential(user.value.email, oldPassword.value)
      await reauthenticateWithCredential(user.value, credential)
      await changePassword(newPassword.value)
      showSuccessMessage.value = true

      oldPassword.value = ""
      newPassword.value = ""
      confirmPassword.value = ""
    }

    isEditing.value = false
  } catch (err) {
    alert("Erreur : " + err.message)
  }
}
</script>
<template>
  <div class="page">
    <Header />

    <section class="profile">
      <h1>Mon profil</h1>

      <div v-if="user">
        <!-- Avatar -->
        <div class="avatar-wrapper">
          <img :src="preview" alt="Avatar" class="avatar" />
          <input
            v-if="isEditing"
            type="file"
            @change="handleAvatarChange"
            accept="image/*"
            class="file-input"
          />
        </div>

        <!-- Nom -->
        <p>
          <strong>Nom :</strong>
          <span v-if="!isEditing">{{ displayName }}</span>
          <input v-else v-model="displayName" class="input" />
        </p>

        <!-- Email -->
        <p><strong>Email :</strong> {{ user.email }}</p>

        <!-- Téléphone -->
        <p>
          <strong>Téléphone :</strong>
          <span v-if="!isEditing">{{ phone || '—' }}</span>
          <input v-else v-model="phone" class="input" />
        </p>

        <!-- Rôle -->
        <p><strong>Rôle :</strong> {{ role || '—' }}</p>

        <!-- Changement de mot de passe -->
        <div v-if="isEditing" class="password-update">
          <label class="label">Ancien mot de passe</label>
          <div class="password-field">
            <input
              :type="showOldPassword ? 'text' : 'password'"
              v-model="oldPassword"
              class="input"
              placeholder="••••••••"
            />
            <span class="eye" @click="showOldPassword = !showOldPassword">
              {{ showOldPassword ? '🙈' : '👁️' }}
            </span>
          </div>

          <label class="label">Nouveau mot de passe</label>
          <div class="password-field">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="input"
              placeholder="••••••••"
            />
            <span class="eye" @click="showNewPassword = !showNewPassword">
              {{ showNewPassword ? '🙈' : '👁️' }}
            </span>
          </div>

          <label class="label">Confirmer le nouveau mot de passe</label>
          <div class="password-field">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="input"
              placeholder="••••••••"
            />
            <span class="eye" @click="showConfirmPassword = !showConfirmPassword">
              {{ showConfirmPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <!-- Message de succès -->
        <p v-if="showSuccessMessage" class="success-message">
          ✅ Profil et/ou mot de passe mis à jour avec succès.
        </p>

        <!-- Actions -->
        <div class="actions">
          <button class="btn" @click="toggleEdit">
            {{ isEditing ? 'Annuler' : 'Modifier' }}
          </button>
          <button v-if="isEditing" class="btn save" @click="saveChanges">
            Enregistrer
          </button>
        </div>
      </div>

      <div v-else>
        <p>Vous n'êtes pas connecté.</p>
      </div>
    </section>

    <Footer />
  </div>
</template>
<style scoped>
.page {
  background-color: #000;
  color: #FFD700;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile {
  padding: 2rem;
  background-color: #111;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #ccc;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #FFD700;
  object-fit: cover;
}

.file-input {
  margin-top: 0.5rem;
  color: #FFD700;
}

.input {
  background-color: #222;
  border: 1px solid #FFD700;
  border-radius: 6px;
  padding: 0.4rem;
  color: #FFD700;
  margin-top: 0.3rem;
  flex: 1;
}

.label {
  font-weight: bold;
  color: #FFD700;
  margin-top: 1rem;
}

.password-update {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.password-field {
  display: flex;
  align-items: center;
}

.eye {
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;
}

.success-message {
  margin-top: 1rem;
  color: #00ff99;
  font-size: 0.95rem;
  font-style: italic;
  text-align: center;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  background-color: #FFD700;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

.btn.save {
  background-color: #FFA500;
}

.btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 600px) {
  .profile {
    padding: 1rem;
  }
  h1 {
    font-size: 1.6rem;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>