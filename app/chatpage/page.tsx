'use client';
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { TextArea } from "./component/TextArea";

type Message = {
  type: 'user' | 'bot';
  content: string;
};

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const endOfMessages = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
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
  }
  
  const keySend = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === 'Enter') {
      return
    }
    else if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (endOfMessages.current) {
        endOfMessages.current.scrollTop = endOfMessages.current.scrollHeight;
    }
  }, [chatMessages])

  return (
    <Box 
      sx={{   
        maxWidth: "600px",
        height: '100%',
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#dadfe8",
        borderRadius: "8px",
      }}
    >
      {/* ヘッダー */}
      <Box
        sx={{
          backgroundColor: "#162040",
          padding: "8px",
          borderRadius: "4px",
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color='white' >Decentra Love</Typography>
      </Box>

      {/* メッセージ表示エリア */}
      <Box
        sx={{
          maxHeight: "400px",
          height: '100%',
          overflowY: "auto",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: 2,
          marginBottom: 2,
        }}
        ref={endOfMessages}
      >
        {chatMessages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
              marginBottom: 1,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "8px 16px",
                borderRadius: "16px",
                backgroundColor:
                  msg.type === "user" ? "#373e58" : "#dadfe8",
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
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={keySend}
          placeholder="メッセージを入力"
          minRows={2}
          maxRows={3}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{
            height: "100%", 
            backgroundColor: '#162040'
          }}
        >
          送信
        </Button>
      </Box>
    </Box>
  );
};

export default ChatApp;
