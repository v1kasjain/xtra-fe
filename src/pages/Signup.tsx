import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Error = {
  name?: string;
  email?: string;
  password?: string;
};

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Error>({});
  const navigate = useNavigate();

  const validateForm = () => {
    let error = {} as Error;
    if (!name) {
      error.name = "Name is required";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.email = "Invalid email address";
    }
    if (!password || password.length < 6) {
      error.password = "Password must be at least 6 characters";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        localStorage.setItem("userName", name);
        console.log("Signup successful!");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container>
      <Box
        sx={{
          border: "1px solid #11212d",
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <img src="/images/home-page-conf.png" width={650} />
          <Stack>
            <Typography variant="h5" gutterBottom>
              SignUp
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e?.target?.value)}
              />
              <TextField
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
              />
              <TextField
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
              />
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>{" "}
                or <Link to={`http://localhost:3000/`}>Click to Login</Link>
              </Box>
            </form>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignupForm;
