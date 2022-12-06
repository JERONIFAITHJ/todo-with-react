import React, { useContext, useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Wrapper from "../../UI/Wrapper";
import ButtonUI from "../../UI/ButtonUI";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { db } from "../../../FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { UserInfoContext } from "../../Store/UserContext";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import TextFieldComponent from "../NewUser/TextFieldComponent";

const buttonStyles = {
  paddingRight: "0.7rem",
  width: "10%",
  height: "100%",
};

const buttonList = [
  {
    id: "googleLogin",
    Icon: <GoogleIcon />,
    desc: "Google Sign in",
    styles: buttonStyles,
  },
  {
    id: "mailLogin",
    Icon: <MailIcon />,
    desc: "Mail Sign in",
    styles: buttonStyles,
  },
];

// const actionCodeSettings = {
//   // URL you want to redirect back to. The domain (www.example.com) for this
//   // URL must be in the authorized domains list in the Firebase Console.
//   url: "http://localhost:3000/auth",
//   // This must be true.
//   handleCodeInApp: true,
// };

function AuthPage() {
  const [inputVisible, setInputVisible] = useState(false);
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [errVal, setErrorVal] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [login, setLogin] = useContext(UserInfoContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        isTyping &&
        (!email.includes("@") ||
          !email.includes(".") ||
          email.startsWith("@") ||
          email.length - email.lastIndexOf(".") < 3)
      ) {
        setIsError(true);
        setErrorVal("Invalid mail format!");
        return;
      }
    }, 3000);
    setIsError(false);
    return () => {
      clearTimeout(timer);
    };
  }, [email, isTyping]);

  //Checking for the type of login preferred by the user
  const clickHandler = (e) => {
    setNewUser(false);
    if (e.currentTarget.id === "googleLogin") {
      console.log("Google Login");
      googleLoginHandler();
    } else {
      setInputVisible(true);
      console.log("Email Login");
    }
  };

  //New User
  const navigateToNewAccountCreation = () => {
    setNewUser(true);
    setInputVisible(false);
  };

  //Reading the email on change
  const emailInputHandler = (e) => {
    setIsTyping(true);
    setEMail(e.target.value);
  };

  //Reading the password on change
  const passwordInputHandler = (e) => {
    setIsTyping(true);
    setPassword(e.target.value);
  };

  //Google login logic
  const googleLoginHandler = async () => {
    setInputVisible(false);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setLogin({ type: "LOGIN", payload: user });
        const docRef = doc(db, "UserData", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("EXISTS");
          navigate("/todo-list");
          return;
        } else {
          console.log("ELSE RUNNING");
          await setDoc(doc(db, "UserData", `${user.uid}`), {
            name: user.displayName,
            password: password,
            mail: user.email,
            userId: user.uid,
            type: "GOOGLE_ACCOUNT",
            createdAt: new Date(),
          });
          navigate("/todo-list");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Mail Login Logic
  const signInSubmitHandler = async (isSignIn) => {
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.startsWith("@") ||
      email.length - email.lastIndexOf(".") < 3
    ) {
      setIsError(true);
      setErrorVal("Invalid error format!");
      return;
    } else if (password.length < 6) {
      setIsError(true);
      isSignIn
        ? setErrorVal("Account password mismatch!")
        : setErrorVal("Password must be at least 6 characters long!");
      return;
    }
    console.log(email);
    if (isSignIn) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          let currUserName;
          try {
            const docRef = doc(db, 'UserData', user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
              currUserName = docSnap.data().name;
            }
            else{
              throw new Error('Error');
            }
          } catch (err) {
            console.log(err);
          }
          // setLogin({ type: "LOGIN", payload: user });
          setLogin({
            type: "LOGIN",
            payload: { ...user, displayName: currUserName },
          });
          navigate("/todo-list");
        })
        .catch((error) => {
          const errorCode = error.code;
          setIsError(true);
          console.log(error);
          setErrorVal(
            `${errorCode.slice(5).split("-").join(" ").toUpperCase()}`
          );
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLogin({
            type: "LOGIN",
            payload: { ...user, displayName: userName },
          });
          await setDoc(doc(db, "UserData", user.uid), {
            name: userName,
            mail: user.email,
            userId: user.uid,
            password: password,
            createdAt: new Date(),
            type: "EMAIL_ACCOUNT",
          });
          navigate("/todo-list");
        })
        .catch((error) => {
          setIsError(true);
          const errorCode = error.code;
          errorCode.includes("email-already-in-use")
            ? setErrorVal("Account already exists!")
            : setErrorVal("Account or password mismatch!");
          const errorMessage = error.message;
          console.log(errorCode);
        });
    }
  };

  return (
    <Wrapper>
      {buttonList.map((val) => (
        <ButtonUI
          key={val.id}
          id={val.id}
          styles={val.styles}
          icon={val.Icon}
          desc={val.desc}
          clickHandler={clickHandler}
        />
      ))}
      {inputVisible && (
        <TextFieldComponent
          setIsTyping={setIsTyping}
          emailInputHandler={emailInputHandler}
          email={email}
          password={password}
          passwordInputHandler={passwordInputHandler}
          isError={isError}
          errVal={errVal}
          isNewUser={false}
          signInSubmitHandler={signInSubmitHandler}
          userName={userName}
          setUserName={setUserName}
        />
      )}
      <ButtonUI
        key="CreateAccount"
        id="CreateAccount"
        styles={buttonStyles}
        icon={<PersonAddIcon />}
        desc="Sign up with mail"
        clickHandler={navigateToNewAccountCreation}
      />
      {newUser && (
        <TextFieldComponent
          setIsTyping={setIsTyping}
          emailInputHandler={emailInputHandler}
          email={email}
          password={password}
          passwordInputHandler={passwordInputHandler}
          isError={isError}
          errVal={errVal}
          isNewUser={true}
          signInSubmitHandler={signInSubmitHandler}
          userName={userName}
          setUserName={setUserName}
        />
      )}
    </Wrapper>
  );
}

export default AuthPage;
