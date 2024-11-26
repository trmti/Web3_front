"use client"; // これを追加して、Client Componentとして指定します

import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { PrimaryButton } from "../_component/PrimaryButton";
import { TextButton } from "../_component/TextButton";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { PrimaryTypography } from "../_component/PrimaryTypography";

const Home = () => {
  const [username, setUsername] = useState<string>(""); // ユーザー名の状態管理
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, confirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const router = useRouter();

  // リアルタイムでパスワードの一致を確認
  useEffect(() => {
    if (confirmpassword && password !== confirmpassword) {
      setPasswordError("パスワードが一致しません。");
    } else {
      setPasswordError(""); // エラーメッセージをクリア
    }
  }, [password, confirmpassword]);

  return (
    <Stack
      direction="row"
      justifyContent="Center"
      paddingY="100px"
      paddingX="100px"
    >
      <Box flexBasis={"50%"} alignSelf={"centergit"}>
        <Image src="/god.png" alt="this is GOD" width={700} height={700} />
      </Box>
      <Box flexBasis={"50%"}>
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
          <Box
            sx={{
              textAlign: "center",
              width: "70%",
            }}
          >
            <PrimaryTypography sx={{ fontSize: "30px" }}>
              新規登録
            </PrimaryTypography>
            <TextField
              label="ユーザーネーム"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{
                mb: 3,
                width: "100%",
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
              label="パスワード"
              variant="outlined"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                width: "100%",
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
              label="パスワード(確認)"
              variant="outlined"
              type="password"
              value={confirmpassword}
              error={Boolean(passwordError)}
              helperText={passwordError}
              required
              onChange={(e) => confirmPassword(e.target.value)}
              sx={{
                mb: 3,
                width: "100%",
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
              sx={{ width: "100%" }}
              disabled={
                !(
                  username.trim() &&
                  password.trim() &&
                  confirmpassword.trim() &&
                  password.trim() == confirmpassword.trim()
                )
              }
              onClick={() => router.push("../")}
            >
              登録
            </PrimaryButton>

            <br />
          </Box>
        </Container>
      </Box>
    </Stack>
  );
};

export default Home;
