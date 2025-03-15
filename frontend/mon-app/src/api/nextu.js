import axios from "axios";

// Méthodes pour Users
export const getUsers = async () => {
  const response = await axios.get("http://localhost:3000/api/v1/nextu/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/v1/nextu/users/${id}`);
  return response.data;
};

export const postUser = async (userData) => {
  const response = await axios.post("http://localhost:3000/api/v1/nextu/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`http://localhost:3000/api/v1/nextu/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/nextu/users/${id}`);
  return response.data;
};

// Méthodes pour publications
export const getPublication = async () => {
  const response = await axios.get("http://localhost:3000/api/v1/nextu/posts");
  return response.data;
};

export const getPublicationById = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/v1/nextu/posts/${id}`);
  return response.data;
};

export const postPublication = async (postData) => {
  const response = await axios.post("http://localhost:3000/api/v1/nextu/posts", postData);
  return response.data;
};

export const updatePublication = async (id, postData) => {
  const response = await axios.put(`http://localhost:3000/api/v1/nextu/posts/${id}`, postData);
  return response.data;
};

export const deletePublication = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/nextu/posts/${id}`);
  return response.data;
};


export const getImage = async () => {
  try {
    const response = await axios.get("http://localhost:3001/multer/images");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des images :", error);
  }
};


export const postImage = async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.imageUrl[0]); 
  formData.append("name", data.name);
  formData.append("age", data.age);            

  try {
    const response = await axios.post("http://localhost:3001/multer/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    throw error; 
  }
};

export const createAdmin = async (adminData) => {
  const response = await axios.post("http://localhost:3000/api/v1/nextu/admins", adminData);
  return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post("http://localhost:3000/api/v1/nextu/login", credentials);
    return response.data; // Assurez-vous que cela renvoie le token
};
