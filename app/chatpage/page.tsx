'use client';
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

type Message = {
  type: 'user' | 'bot';
  content: string;
};

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

    const handleSend = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (message.trim() === "") {
                alert("メッセージを入力してください。");
                return;
            }

            const queryString = window.location.search;
            const params = new URLSearchParams(queryString);

            const select1Value = params.get("select1");
            const select2Value = params.get("select2");
            const select3Value = params.get("select3");

            try {
                //   const response = await fetch("http://192.168.11.10:8000/create_task", {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //       Question: message,
                //       Model_Names: [select1Value, select2Value, select3Value],
                //       Aggregator_Name: "Llama-2-7b-Japanese",
                //       Wait_Task_Num: 1,
                //     }),
                //   });
                const response = { 'answer': 'うるせえだまれ！' }
                const data = await response;
                setChatMessages((prev) => [
                    ...prev,
                    { type: "user", content: message },
                    { type: "bot", content: data.answer },
                ]);
            } catch (error) {
                console.error("Error:", error);
                alert("エラーが発生しました。");
            }

            setMessage(""); // メッセージボックスをクリア
        };
    }

  return (
    <Box
          sx={{
          
        maxWidth: "600px",
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#eee",
        borderRadius: "8px",
      }}
    >
      {/* ヘッダー */}
      <Box
        sx={{
          backgroundColor: "#ddd",
          padding: "8px",
          borderRadius: "4px",
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Decentra Love</Typography>
      </Box>

      {/* メッセージ表示エリア */}
      <Box
        sx={{
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: 2,
          marginBottom: 2,
        }}
      >
        {chatMessages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "8px 16px",
                borderRadius: "16px",
                backgroundColor:
                  msg.type === "user" ? "blue" : "rgba(0,0,255,0.1)",
                color: msg.type === "user" ? "white" : "black",
                maxWidth: "70%",
              }}
            >
              {msg.content}
            </Paper>
          </Box>
        ))}
      </Box>

      {/* メッセージ入力エリア */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSend}
          placeholder="メッセージを入力"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{ height: "56px" }}
        >
          送信
        </Button>
      </Box>
    </Box>
  );
};

export default ChatApp;
