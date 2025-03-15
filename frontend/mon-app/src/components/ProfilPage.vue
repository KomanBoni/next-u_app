<template>
  <div class="profile-container">
    <h1>Profil de l'utilisateur</h1>
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-group">
        <label for="firstname">Prénom</label>
        <input v-model="user.firstname" id="firstname" required />
      </div>
      <div class="form-group">
        <label for="lastname">Nom de famille</label>
        <input v-model="user.lastname" id="lastname" required />
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input v-model="user.email" id="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="birthday">Date de naissance</label>
        <input v-model="user.birthday" id="birthday" type="date" required />
      </div>
      <button type="submit">Mettre à jour le profil</button>
    </form>
    <p v-if="message">{{ message }}</p>

   
    <router-link to="/home" class="back-home-button">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'ProfilPage',
  data() {
    return {
      user: {
        firstname: 'Boni', 
        lastname: 'Koman', 
        email: 'komanboni@gmail.com', 
        birthday: '2005-05-30' 
      },
      message: ''
    };
  },
  methods: {
    updateProfile() {
      // Simuler la mise à jour du profil
      this.message = 'Profil mis à jour avec succès !';
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: linear-gradient(135deg, #ffffff, #f4f4f9);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s ease-in-out;
  background: #fff;
  outline: none;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
}

button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

button:hover {
  background: linear-gradient(135deg, #0056b3, #003f80);
  box-shadow: 0 4px 15px rgba(0, 91, 187, 0.3);
}

.message {
  margin-top: 15px;
  font-size: 14px;
  color: #28a745;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 600px) {
  .profile-container {
    max-width: 90%;
    padding: 20px;
  }
}

.back-home-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-home-button:hover {
  background-color: #218838;
}
</style>
