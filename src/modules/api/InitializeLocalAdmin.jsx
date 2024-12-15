import AdminsApi from "./AdminsApi";

const initializeAdmins = () => {
  const usersKey = "admins"; 
  const existingUsers = JSON.parse(localStorage.getItem(usersKey)) || [];

  if (existingUsers.length === 0) {
    const adminsApi = AdminsApi(); 
    const admins = adminsApi.getAdmins(); 

    localStorage.setItem(usersKey, JSON.stringify(admins));
    console.log("Admins initialized in localStorage.");
  } else {
    console.log("Admins already exist in localStorage.");
  }
};

export default initializeAdmins;