"use client"; // これを追加して、Client Componentとして指定します

import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { PrimaryButton } from "../_component/PrimaryButton";
import { TextButton } from "../_component/TextButton";
import { useRouter } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState<string>(""); // ユーザー名の状態管理
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // // Loginボタンのクリックハンドラ
  // const handleLoginClick = () => {
  //   router.push("/new-model"); // /new-modelページに遷移
  // };

  // // SignUpボタンのクリックハンドラ
  // const handleSignUpClick = () => {
  //   router.push("/signup"); // /signupページに遷移
  // };

  return (
    <Box>
      <Container
        sx={{
          position: "relative",
          padding: "100px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              mb: 3,
              width: "300px",
              "& .MuiInputBase-root": {
                color: "#162040", // 入力部分の文字色
              },
              "& .MuiInputLabel-root": {
                color: "#162040", // ラベルの文字色
              },
              "& .MuiInputBase-root.Mui-focused": {
                borderColor: "#373e5a", // 入力フィールドがフォーカスされている時の枠線色
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#162040", // フォーカス時のラベル文字色
              },
            }}
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              width: "300px",
              "& .MuiInputBase-root": {
                color: "#162040", // 入力部分の文字色
              },
              "& .MuiInputLabel-root": {
                color: "#162040", // ラベルの文字色
              },
              "& .MuiInputBase-root.Mui-focused": {
                borderColor: "#373e5a", // 入力フィールドがフォーカスされている時の枠線色
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#162040", // フォーカス時のラベル文字色
              },
            }}
          />
          <br />

          <PrimaryButton
            disabled={!(username.trim() && password.trim())}
            onClick={() => router.push("../")}
          >
            Registration
          </PrimaryButton>

          <br />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
