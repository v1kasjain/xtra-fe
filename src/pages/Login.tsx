import { Error } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, redirect } from "react-router-dom";

type ErrorProps = {
  email?: string;
  password?: string;
  cred?: string;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorProps>({});

  const navigate = useNavigate();
  const validateForm = () => {
    let error = {} as ErrorProps;

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
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        // if (!response.ok) {
        //   throw new Error(`API call failed with status ${response.status}`);
        // }

        const data = await response.json();

        if (data?.error) {
          setErrors({ cred: "No records found, please signup" });
        }

        if (data?.error) {
          console.log("Error in API call", data.error);
        }

        if (data?.name) {
          localStorage.setItem("userName", data?.name);
        }

        if (data?.token) {
          localStorage.setItem("token", data?.token);
        }

        console.log("Signup successful!");
        setTimeout(() => {
          // Redirect to a different page
          navigate("/dashboard");
        }, 2000);
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
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                value={password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => setPassword(e?.target?.value)}
              />
              <Box mt={2}>
                <Button type="submit" variant="contained">
                  Login
                </Button>{" "}
                or{" "}
                <Link to={`http://localhost:3000/signup`}>
                  Click here to Signup
                </Link>
              </Box>
            </form>
            <Box mt={8}>{errors && errors.cred}</Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default Login;
