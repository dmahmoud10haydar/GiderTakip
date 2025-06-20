document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("UserForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    const newUser = { name, email, age };

    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Kullanıcı eklendi:", data);
        form.reset(); 
        alert("Kullanıcı başarıyla eklendi!");
        loadUsers(); // ✅ Listeyi güncelle
      } else {
        const errorData = await response.json();
        alert("Hata oluştu: " + errorData.error);
      }
    } catch (error) {
      console.error("İstek hatası:", error);
      alert("Sunucu bağlantı hatası.");
    }
  });

  // Kullanıcıları listeleme fonksiyonu
  async function loadUsers() {
    try {
      const response = await fetch("/users");
      const users = await response.json();

      const tableBody = document.querySelector("#userTable tbody");
      tableBody.innerHTML = ""; 

      users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td><button onclick="deleteUser('${user._id}')">Sil</button></td>
        `;

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Kullanıcıları getirme hatası:", error);
    }
  }

  loadUsers(); 

  async function deleteUser(id) {
  try {
    const response = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Kullanıcı başarıyla silindi!");
      loadUsers(); // Listeyi güncelle
    } else {
      const errorData = await response.json();
      alert("Silme hatası: " + errorData.error);
    }
  } catch (error) {
    console.error("Silme isteği hatası:", error);
    alert("Sunucuya bağlanılamadı.");
  }
}
});
