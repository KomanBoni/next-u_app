<template>
  <div class="home-container">
    <div class="post-tabs">
      <button @click="activeTab = 'post'" :class="{ active: activeTab === 'post' }">Publier</button>
      <button @click="activeTab = 'poll'" :class="{ active: activeTab === 'poll' }">Sondage</button>
    </div>

  
    <div class="create-post">
      <div v-if="activeTab === 'post'">
        <textarea v-model="description" placeholder="Exprimez-vous..." class="newpost-text"></textarea>

        <div class="options">
          <button @click="toggleImageInput"><i class="fas fa-image"></i> Ajouter une image</button>
        </div>

        <div v-if="showImageInput" class="image-upload-container">
          <input type="file" @change="handleFileUpload" class="file-input" />
          <img v-if="imageUrl" :src="imageUrl" alt="Image sélectionnée" class="preview-image" />
        </div>

        <button @click="submitPost" class="publish-btn">Publier</button>
      </div>

      <div v-if="activeTab === 'poll'">
        <input v-model="pollQuestion" placeholder="Posez une question..." class="poll-input" />
        <input v-model="pollOption" placeholder="Ajouter une option" @keyup.enter="addPollOption" class="poll-input" />
        <ul class="poll-options-list">
          <li v-for="(option, index) in poll" :key="index" class="poll-option">
            {{ option }}
            <button @click="removePollOption(index)" class="remove-poll-option">❌</button>
          </li>
        </ul>

        <button @click="submitPoll" class="publish-btn">Créer le sondage</button>
      </div>
    </div>

    <!-- Fil d'actualité -->
    <div class="posts-container">
      <div class="post" v-for="(post, i) in posts" :key="i">
        <div class="post-header">
          <h3>Utilisateur Anonyme</h3>
          <span>{{ formattedDate(post.date) }}</span>
        </div>
        <h5 v-if="post.description">{{ post.description }}</h5>
        <img v-if="post.image" :src="post.image" alt="Image de publication" class="post-image" />

        <div v-if="post.poll">
          <h6>{{ post.poll.question }}</h6>
          <div class="poll-options">
            <button v-for="(option, index) in post.poll.options" :key="index" class="poll-btn">
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lien vers la page de profil -->
    <router-link to="/profile" class="profile-link">Voir mon profil</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      activeTab: "post",
      description: "",
      showImageInput: false,
      imageUrl: null,
      pollQuestion: "",
      poll: [],
      pollOption: "",
      showPollInput: false,
    };
  },
  methods: {
    toggleImageInput() {
      this.showImageInput = !this.showImageInput;
    },
    handleFileUpload(event) {
      const file = event?.target?.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },
    addPollOption() {
      if (this.pollOption && this.pollOption.trim() && this.poll.length < 4) {
        this.poll.push(this.pollOption.trim());
        this.pollOption = "";
      }
    },
    removePollOption(index) {
      this.poll.splice(index, 1);
    },
    async submitPost() {
      const newPost = {
        description: this.description,
        date: new Date(),
        image: this.imageUrl,
        poll: this.poll.length > 0 ? this.poll : null
      };
      
      this.posts.push(newPost);
      
      this.description = "";
      this.imageUrl = null;
      this.poll = [];
      this.showImageInput = false;
      this.showPollInput = false;
      
      console.log("Publication réussie :", newPost);
    },
    submitPoll() {
      if (!this.pollQuestion.trim() || this.poll.length < 2) return;
      const newPost = {
        description: null,
        date: new Date(),
        poll: {
          question: this.pollQuestion,
          options: [...this.poll],
        },
      };
      this.posts.unshift(newPost);
      this.resetPoll();
    },
    resetPost() {
      this.description = "";
      this.imageUrl = null;
      this.showImageInput = false;
    },
    resetPoll() {
      this.pollQuestion = "";
      this.poll = [];
      this.pollOption = "";
    },
    formattedDate(date) {
      return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    },
  },
};
</script>

<style>
/* Rendre la page pleine hauteur */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f0f2f5;
}

.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
  margin: auto;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.post-tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.post-tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #ddd;
  transition: 0.3s;
}

.post-tabs button.active {
  background-color: #007bff;
  color: white;
}

.create-post {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

textarea, .poll-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.poll-options-list {
  list-style: none;
  padding: 0;
}

.poll-option {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f4f4f4;
  margin-bottom: 5px;
  border-radius: 5px;
}

.poll-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
}

.publish-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.publish-btn:hover {
  background: #0056b3;
}

/* Fil d'actualité en plein écran */
.posts-container {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 10px;
}

.post {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

.post-image {
  max-width: 100%;
  border-radius: 5px;
  margin-top: 10px;
}

.profile-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff; /* Couleur de fond du lien */
  color: white; /* Couleur du texte */
  border-radius: 4px; /* Coins arrondis */
  text-decoration: none; /* Pas de soulignement */
  transition: background-color 0.3s; /* Transition pour l'effet de hover */
}

.profile-link:hover {
  background-color: #0056b3; /* Couleur de fond au survol */
}
</style>