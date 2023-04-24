import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";


// userObject expected ---->
// {
//   email: "",
//   password: "",
//   fullName: "",
// }

const _apiUrl = "https://localhost:7082/api"

const doesUserExist = (firebaseUserId) => {

  return getToken().then((token) => fetch(`${_apiUrl}/UserExists/${firebaseUserId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(resp => resp.ok))
  
}

export const getToken = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};



export const emailAuth = {
  // Register New User
  register: function(userObj, navigate) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((userCredential) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: userObj.fullName,
        }).then(
          function() {
            const userAuth = {
              email: userCredential.user.email,
              displayName: userObj.fullName,
              uid: userCredential.user.uid,
              type: "email",
            };
            // Saves the user to localstorage
            localStorage.setItem("capstone_user", JSON.stringify(userAuth));
            // Navigate us back to home
  
          },
          function(error) {
            console.log("Email Register Name Error");
            console.log("error code", error.code);
            console.log("error message", error.message);
          }
        );
      })
      .catch((error) => {
        console.log("Email Register Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
  // Sign in existing user
  signIn: function(userObj, navigate) {
    return new Promise((res) => {
      const auth = getAuth();
      let existingUser = {};
      signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then((SignInResponse) => {
          existingUser.email = SignInResponse.user.email;
          existingUser.displayName = SignInResponse.user.displayName;
          existingUser.uid = SignInResponse.user.uid;
          existingUser.type = "email";  
          doesUserExist(SignInResponse.user.uid)
          .then((userExists) => {
            if (!userExists) {
              this.signOut();
            } else {
  
              
              // Saves the user to localstorage
              localStorage.setItem("capstone_user", JSON.stringify(existingUser));
              // Navigate us back to home
              console.log(existingUser.displayName + "Signed In")
              navigate("/");
            }
          })
        }
        )
        .catch((error) => {
          console.log("Email SignIn Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    });
  },
  // Sign out
  signOut: function(navigate) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Remove the user from localstorage
        localStorage.removeItem("capstone_user");
        // Navigate us back to home
        navigate("/");
        console.log("Sign Out Success!");
      })
      .catch((error) => {
        console.log("signOut Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
};
