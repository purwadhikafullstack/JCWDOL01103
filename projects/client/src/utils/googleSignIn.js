import { jwtDecode } from "jwt-decode";

export const googleSignInInit = (callback) => {
  window.google.accounts.id.initialize({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    callback: callback,
  });
};

export const onClickGoogleSignIn = () => {
  const googleLoginWrapper = document.createElement("div");
  googleLoginWrapper.style.display = "none";
  googleLoginWrapper.classList.add("custom-google-button");

  document.body.appendChild(googleLoginWrapper);

  window.google.accounts.id.renderButton(googleLoginWrapper, {
    type: "icon",
    width: "200",
  });

  const googleLoginWrapperButton =
    googleLoginWrapper.querySelector("div[role=button]");

  return googleLoginWrapperButton.click();
};

export const onClickGoogleSignOut = (email) => {
  window.google.accounts.id.revoke(email, done => {
    return
  });
}
