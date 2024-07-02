const getToken = async () => {
//   const tokenUrl = "https://devauth.mybeacon.ca/oauth/token";
//   const clientId = "8oPYDXz0Q7e9d9zVFY6rQBCgHoLQicKy";
//   const username = "testuser08588@gmail.com";
//   const password = "Test@123";
//   const realm = "Username-Password-Authentication";

//   console.log("Making token request...");

//       //Sending request body as query string

//     const queryString = new URLSearchParams({
//       client_id: clientId,
//       grant_type: "http://auth0.com/oauth/grant-type/password-realm",
//       username: username,
//       password: password,
//       realm: realm,
//     }).toString();

  

//     const response =   http.post(`${tokenUrl}?${queryString}`, null, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     console.log("Token response received:", response.data);
    const idToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjJ5eTNwN2lJUko3enRHcTlLMFNEZiJ9.eyJ1c2VySWQiOiJ1c3JfMWVkZTY5OWMtMGQwOC00ZWVmLWEzNzktODU0YWYxMWI2NzQzIiwibmlja25hbWUiOiJ0ZXN0dXNlcjA4NTg4IiwibmFtZSI6InRlc3R1c2VyMDg1ODhAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzU4YmU1ZjA0NzNiYzFhMzY1ODE0OGI5YzM1N2ZmOWE0P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdGUucG5nIiwidXBkYXRlZF9hdCI6IjIwMjQtMDYtMjhUMDU6MDE6MDMuNjU4WiIsImVtYWlsIjoidGVzdHVzZXIwODU4OEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2YXV0aC5teWJlYWNvbi5jYS8iLCJhdWQiOiI4b1BZRFh6MFE3ZTlkOXpWRlk2clFCQ2dIb0xRaWNLeSIsImlhdCI6MTcxOTU1MjA4OCwiZXhwIjoxNzIwMTU2ODg4LCJzdWIiOiJhdXRoMHw2NjJmYjFlN2NiMTA4MmI4ZWE4MGU4OGQiLCJhdXRoX3RpbWUiOjE3MTk1NTA4NjMsInNpZCI6Il9oVmpNZVY2blNlaXNXRGxEd2F1dlhXX290UjdyQW9TIn0.odLFN904FdKV9P0ZACfEK2H9EogVM99-eydy2xzAybunPdjnHrb85GfCxd4fdud78Bai5c6zYttG6Njj0HwCM3spuWPC4lASNLcmqew5FCw2JRqx5aYHp7aa42kTEevt_2m44yugl46DrAbLzO3VLlwwbsFaUWzroJYuGwLZDZbnPjhbWEx7fn-mL06AJgV5qyCSNV79cliY7oTU7OZb13YW5xTC04w-V6wpFATThw_ASTu38R1DweGlIineeKWuzFr152Jt-5AL_cUXCT89SoXscOcJkoOQNtSqvpAvLJ_zfwVEL2jVKatHTCUL-NQqpkC15gL2D53XeBA_BK18FQ";




    return idToken;
  
};


const makeAuthorization = async () => {
  try {

    console.log(`Getting token`)

    const idToken =  await getToken()
    // console.log(idToken);

    if (!idToken) {
      console.log(`ID token is not available `);
      return;
    }

    const apiURL = "https://dev.api.beaconbank.ca/planning_lists?pageSize=100"; // get planning list API
console.log("Sending request")
    const response = http.get(apiURL, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    
//console.log(JSON.stringify(json(response.body)))
    // Extracting IDs
    const planningListIds = json(response.body).planning_lists.map((list) => list.id);
    // console.log("Ids:", planningListIds);
    

    
    // Deleting planning lists one by one
    for (const planningListId of planningListIds) {
      await deletePlanningList(idToken, planningListId);
    }

  } catch (error) {
    console.error("Error fetching or deleting planning lists:", error);
  }
};

const deletePlanningList = async (idToken, planningListId) => {
  try {
    const apiURL = `https://dev.api.beaconbank.ca/planning_lists/${planningListId}`;

    http.delete(apiURL, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    // console.log(`Deleted planning list with ID: ${planningListId}`);
  } catch (error) {
    console.error(
      `Error deleting planning list with ID ${planningListId}:`,
      error
    );
  }
};

makeAuthorization();