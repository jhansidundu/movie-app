const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

// Initialize Firebase functions
admin.initializeApp();

// Your custom proxy function
exports.tmdbProxy = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "GET, POST");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    // Handle preflight requests
    response.status(204).send("");
    return;
  }
  const tmdbApiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTkyOWY0YmVkYWZjZTNkMDliY2YyNGY3Yzk1ODA1NSIsInN1YiI6IjY0YzRmYjNhY2FkYjZiMDEwNjZjYmU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbr9_n_HBlSNbKCc550a1RYwRTMxLJ1pl89hAl49dM0";
  const tmdbUrl = "https://api.themoviedb.org/3" + request.url;

  try {
    const tmdbResponse = await axios.get(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${tmdbApiKey}`,
        "Access-Control-Allow-Origin": "*",
      },
    });

    // Set CORS headers to allow requests from your React app
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST");
    response.json(tmdbResponse.data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});
