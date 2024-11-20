"use client"; // これを追加して、Client Componentとして指定します

import { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { PrimaryButton } from "./_component/PrimaryButton";
import { TextButton } from "./_component/TextButton";

const Home = () => {
  const [username, setUsername] = useState<string>(""); // ユーザー名の状態管理
  // const router = useRouter(); // ページ遷移用

  // // Loginボタンのクリックハンドラ
  // const handleLoginClick = () => {
  //   router.push("/new-model"); // /new-modelページに遷移
  // };

  // // SignUpボタンのクリックハンドラ
  // const handleSignUpClick = () => {
  //   router.push("/signup"); // /signupページに遷移
  // };

  return (
    <Container
      sx={{
        position: "relative",
        padding: "100px 0",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
<Typography
  variant="h3"
  component="h1"
  sx={{
    mb: 4,
    color: "#000", // 文字色を黒に変更
    fontFamily: "'Scribble', cursive", // フォントファミリー
    fontSize: "5rem", // フォントサイズ
    
  }}
>
  Decentra Love
</Typography>

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
              color: "##162040", // 入力部分の文字色
            },
            "& .MuiInputLabel-root": {
              color: "#162040", // ラベルの文字色
            },
            "& .MuiInputBase-root.Mui-focused": {
              borderColor: "#162040", // 入力フィールドがフォーカスされている時の枠線色
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#162040", // フォーカス時のラベル文字色
            },
          }}
        />
        <br />

        <PrimaryButton
        disabled={!username.trim()}
        >Login</PrimaryButton>

        <br />
        
       <TextButton>Sign up</TextButton>
      </Box>
    </Container>
  );
};

export default Home;
