<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login" class="login-form">
      <input v-model="credentials.email" type="email" placeholder="Adresse e-mail" required />
      <input v-model="credentials.password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import { loginUser } from '../api/nextu'; 
import { useRouter } from 'vue-router'; 
export default {
  name: 'PageLogin',
  setup() {
    const router = useRouter(); 
    return {
      credentials: {
        email: '',
        password: ''
      },
      message: '',
      router
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginUser(this.credentials);
        const token = response.token;
        localStorage.setItem('authToken', token);
        this.message = 'Connexion réussie !';
        this.router.push('/home');
      } catch (error) {
        console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
        this.message = 'Erreur lors de la connexion : ' + (error.response ? error.response.data.message : error.message);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 10px;
  color: red;
}
</style>
