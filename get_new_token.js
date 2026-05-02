const fs = require('fs');

const myDetails = {
  email: "ap3783@srmist.edu.in",
  name: "Aditya Prasad",
  mobileNo: "7480046084",
  githubUsername: "aditya290404",
  rollNo: "RA2311003011138",
  accessCode: "QkbpxH",
  clientID: "95a17205-4afd-4864-b2c7-d6b3055dd681",
  clientSecret: "tVbDpwjwUxbmjpna"
};

async function getNewToken() {
  console.log("Fetching New Access Token...");
  try {
    const authRes = await fetch("http://20.207.122.201/evaluation-service/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myDetails)
    });

    const authData = await authRes.json();

    if (!authRes.ok) {
      throw new Error("Auth Failed: " + JSON.stringify(authData));
    }

    console.log("✅ Auth Successful!");
    console.log("NEW access_token:", authData.access_token);

    fs.writeFileSync('config.ts', `export const ACCESS_TOKEN = "${authData.access_token}";\n`);
    console.log("✅ config.ts has been updated automatically!");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
  }
}

getNewToken();
