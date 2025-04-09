const axios = require("axios").default;

/* Scénario : 
  -1 : connexion compte existant
  -2 : inscription
  -3 : connexion nouveau compte
  -4 : test d'authentification au token
  -5 : suppression du compte créé
*/

const testAuth = async () => {
  const Authroute = "http://localhost:4500"; //Exposition direct au service (éviter les blocages routes privées NGINX)

  const rand = Math.floor(Math.random() * 100000);

  try {
    console.log(" -  [1]  Login existant...");
    const login = await axios.post(`${Authroute}/login`, {
      name: "JohnDoe",
      email: "john.d@example.com",
      password: "hashed1",
    });
    console.log("✅ OK : ", login.data);

    console.log(" -  [2] Register...");
    const register = await axios.post(`${Authroute}/register`, {
      name: `testUser${rand}`,
      email: `test${rand}@test.tst`,
      password: "123456",
      role: "User",
    });
    console.log("✅ OK : ", register.data);

    console.log(" -  [3] Login...");
    const login2 = await axios.post(`${Authroute}/login`, {
        name: `testUser${rand}`,
        email: `test${rand}@test.tst`,
        password: "123456",
      },
      {
        withCredentials: true,
      }
    );    
    const cookie = login2.headers["set-cookie"];
    if (!cookie || !cookie.length) {
      throw new Error("Pas de cookie reçu !");
    }
    console.log("✅ OK : ", login2.data);

    console.log(" -  [4] Vérification authenticate (cookie)...");

    const auth = await axios.get(`${Authroute}/authenticate`, {
      headers: {
        Cookie: cookie.join(";"),
      },
      withCredentials: true,
    });
    console.log("✅ OK : ", auth.data);

    try {
      console.log(` - Nettoyage user test (ID: testUser${rand})...`);
      const deleteRes = await axios.delete(`${Authroute}/${auth.data.id}`);
      console.log("✅ OK :", deleteRes.data);
    } catch (err) {
      console.warn("⚠️ KO (nettoyage manuel a faire) :", err.response?.data || err.message);
    }

  } catch (err) {
    console.error("❌ KO :", err.response?.data || err.message);
    process.exit(1);
  }
};

console.log("✅ Auth Service OK:");

testAuth();
