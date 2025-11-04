// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1tp6YofgW8ugDw9AbolOdaiIMocQ1TnI",
  authDomain: "blog-71629.firebaseapp.com",
  projectId: "blog-71629",
  storageBucket: "blog-71629.firebasestorage.app",
  messagingSenderId: "1076976398015",
  appId: "1:1076976398015:web:e7597ec17d4c18a841600a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Elementos
const authSection = document.getElementById("auth-section");
const blogSection = document.getElementById("blog-section");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const createPostBtn = document.getElementById("create-post-btn");
const postsContainer = document.getElementById("posts-container");

// Login
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("Erro ao logar: " + e.message);
  }
});

// Cadastro
registerBtn.addEventListener("click", async () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("Erro ao cadastrar: " + e.message);
  }
});

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));

// Criar post (só logado)
createPostBtn.addEventListener("click", async () => {
  const title = document.getElementById("post-title").value;
  const desc = document.getElementById("post-desc").value;
  const img = document.getElementById("post-img").value;

  if(!title || !desc) return alert("Preencha título e descrição");

  try {
    await addDoc(collection(db, "posts"), {
      title,
      description: desc,
      imageUrl: img,
      createdAt: new Date()
    });
    document.getElementById("post-title").value = "";
    document.getElementById("post-desc").value = "";
    document.getElementById("post-img").value = "";
    loadPosts();
  } catch(e) {
    alert("Erro ao criar post: " + e.message);
  }
});

// Carregar posts em ordem do mais recente
async function loadPosts() {
  postsContainer.innerHTML = "";
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const data = doc.data();
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      ${data.imageUrl ? `<img src="${data.imageUrl}"/>` : ""}
    `;
    postsContainer.appendChild(postDiv);
  });
}

// Monitorar estado de login
onAuthStateChanged(auth, user => {
  if(user) {
    authSection.style.display = "none";
    blogSection.style.display = "block";
    loadPosts();
  } else {
    authSection.style.display = "block";
    blogSection.style.display = "none";
  }
});
