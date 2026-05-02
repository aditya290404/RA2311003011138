const myDetails = {
  email: "ap3783@srmist.edu.in",
  name: "Aditya Prasad",
  mobileNo: "7480046084",
  githubUsername: "aditya290404",
  rollNo: "RA2311003011138",
  accessCode: "QkbpxH"
};

async function getCredentials() {
  try {
    const regRes = await fetch("http://20.207.122.201/evaluation-service/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myDetails)
    });
    const regData = await regRes.json();
    console.log("REG DATA:", regData);
    
    // Even if registration fails (already registered), we try auth if we have clientID and Secret
    // But wait, the previous run got clientID: 95a17205-4afd-4864-b2c7-d6b3055dd681
    const authPayload = {
      ...myDetails,
      clientID: regData.clientID || "95a17205-4afd-4864-b2c7-d6b3055dd681",
      clientSecret: regData.clientSecret || "tvbDpwjwUxbmjpna"
    };

    const authRes = await fetch("http://20.207.122.201/evaluation-service/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authPayload)
    });

    const authData = await authRes.json();
    if (authRes.ok && authData.access_token) {
        console.log("SUCCESS");
        require('fs').writeFileSync('config.ts', `export const ACCESS_TOKEN = "${authData.access_token}";\n`);
    } else {
        console.log("AUTH FAILED", authData);
    }
  } catch (error) {
    console.error("ERROR", error.message);
  }
}
getCredentials();
