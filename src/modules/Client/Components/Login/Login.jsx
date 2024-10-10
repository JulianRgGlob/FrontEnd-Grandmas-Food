import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import validationForm from "../../../common/validation";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors, isValid } = validationForm(null, email, password);
    setErrors(errors);
    console.log("click");
    if (isValid) {
      <div style={{ color: "red", marginTop: "5px" }}>{"User Not Found"}</div>;
      const loggedUser = JSON.parse(localStorage.getItem("user"))
      console.log(loggedUser)
      console.log(loggedUser.email);
      console.log(loggedUser.password);
      if (email === loggedUser.email && password === loggedUser.password) {
        localStorage.setItem("loggedin",true)
        navigate("/");
      } else {
        setErrorMessage("Incorrect Credentials")
      }
    }else{
  
      setErrorMessage("User not found")
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign in
        </Typography>
        <Box
          component="form"
          sx={{ width: 500, maxWidth: "100%" }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.email}
          >
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" }); 
              }}
              margin="normal"
              placeholder="user@email.com"
              error={!!errors.email}
              helperText={errors.email}
            />
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.password}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" }); 
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.password && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {errors.password}
              </div>
            )}
          </FormControl>

          {errorMessage && (
            <div style={{ color: "red", marginTop: "5px" }}>{errorMessage}</div>
          )}
          <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href="/forgotPass" variant="body2" margin="normal">
              <Typography variant="caption">Forgot password?</Typography>
            </Link>

            <Link href="/register" variant="body2">
              <Typography variant="caption">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
