const validationForm = (name,email,password, isRegister = false) => {
  let errors = {email:'',password:''}
  let isValid = true

  if (!email) {
    errors.email = 'Email is requerid'
    isValid = false
  }else if (!/\S+@\S+\.\S+/.test(email)){
    errors.email = 'email is invalid';
    isValid = false;
  }
  if (!password) {
    errors.password = 'password is requerid'
    isValid = false
  }else if (password.length < 6){
    errors.password = 'The password must be at least 6 characters long';
    isValid = false;
  }
  if(isRegister && !name){
    errors.name = 'Name is requerid'
    isValid=false
  }
    return {name,errors,isValid}

}
export default validationForm