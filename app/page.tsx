"use client"; // これを追加して、Client Componentとして指定します

import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { PrimaryButton } from "./_component/PrimaryButton";
import { TextButton } from "./_component/TextButton";
import { useRouter } from "next/navigation";

const Home = () => {
  const [username, setUsername] = useState<string>(""); // ユーザー名の状態管理
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onClickLogin = async () => {
    const Data = {
      username: username,
      password: password,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/login`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(Data),
      method: "POST",
    });
    const res_json = await res.json();
    if (res_json.user_id) {
      localStorage.setItem("user_id", res_json.user_id);
      router.push("/home");
    }
  };

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
      <Box
        sx={{
          backgroundColor: "#373e5a",
          textAlign: "center",
          paddingY: "16px",
        }}
      >
        <Typography sx={{ fontSize: 40, color: "#ff6680" }}>
          MoAによる分散型AIプラットフォーム
        </Typography>
        <Typography sx={{ fontSize: 20, color: "#dadfe8" }}>
          コンピュータ性能に依存しない高精度LLMの実現
        </Typography>
      </Box>
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
            onClick={onClickLogin}
          >
            Login
          </PrimaryButton>

          <br />

          <TextButton
            onClick={() => router.push("/signup")}
            sx={{
              color: "#0a1228",
              "&:hover": { backgroundColor: "#dadfe8", color: "#ff6680" },
            }}
          >
            Sign up
          </TextButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
