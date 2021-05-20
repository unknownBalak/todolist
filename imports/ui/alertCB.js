export function insertCB(error, res) {
  let response = res
    ? "Congratulation, You assigned a task!"
    : "Something went wrong Please refresh!";
  alert(response);
}
export function removeCB(error, res) {
  let response = res ? "You deleted a Task!!" : "Some Error occured!";

  alert(response);
}
export function checkCB(error, res) {
  let response = !res ? "Something went wrong!" : "";
  if (response) alert(response);
}
export function loginCB(error, res) {
  console.log(error);
  let response = !error
    ? "Congratulation, You logged in Successfully!!"
    : "User doesn't exist or wrong user or password!!";
  alert(response);
}
// export function signUpCB(error, res, username, password) {
//   console.log("This is user in signUp", username);
//   console.log("This is user in signUp", password);
//   if (user) {
//     alert("User Already Exist please login!!");
//   } else {
//     Accounts.createUser({
//       username: username,
//       password: password,
//     });
//     alert("User Registered, Head over to login Page!");
//   }
// }
