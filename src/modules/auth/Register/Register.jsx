import React from "react";
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
import validationForm from "../../../utils/validation/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setShowPassword,
  setErrors,
  setNickName,
} from "../../../stores/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const passwords = useSelector((state) => state.auth.passwords);
  const showPassword = useSelector((state) => state.auth.showPassword);
  const errors = useSelector((state) => state.auth.errors);
  const name = useSelector((state) => state.auth.nickName);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { errors: validationErrors, isValid } = validationForm(
      name,
      email,
      passwords,
      true
    );
    dispatch(setErrors(validationErrors));
    if (isValid) {
      localStorage.setItem("user", JSON.stringify({ name, email, passwords }));
      navigate("/login");
      console.log("Data Register:", { email, passwords, name });
    }
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
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
            error={!!errors.name}
          >
            <TextField
              required
              label="Name"
              value={name}
              onChange={(e) => {
                dispatch(setNickName(e.target.value));
                dispatch(setErrors({ ...errors, name: "" }));
              }}
              placeholder="Jhon Doe"
              error={!!errors.name}
              helperText={errors.name}
            />
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.email}
          >
            <TextField
              required
              label="Email"
              value={email}
              onChange={(e) => {
                dispatch(setEmail(e.target.value));
                dispatch(setErrors({ ...errors, name: "" }));
              }}
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
              value={passwords}
              onChange={(e) => {
                dispatch(setPassword(e.target.value));
                dispatch(setErrors({ ...errors, password: "" }));
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

          <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
            Register
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link href="/login" variant="body2">
              <Typography variant="caption">
                Already have an account? Sign In
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
