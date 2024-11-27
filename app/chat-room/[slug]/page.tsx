"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { TextArea } from "@/app/_component/TextArea";

type Message = {
  type: "user" | "bot" | "detail1" | "detail2" | "detail3";
  content: string;
};

const ChatApp = ({ params }: { params: { slug: string } }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatDetails, setChatDetails] = useState<Message[]>([]);
  const endOfMessages = useRef<HTMLDivElement>(null);

  // ボタンでメッセージ送信
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

      const response = {
        answer: "うるせえだまれ！",
        detail1: "うる",
        detail2: "せえ",
        detail3: "だまれ！",
      };
      const data = await response;

      setChatMessages((prev) => [
        ...prev,
        { type: "user", content: message },
        { type: "bot", content: data.answer },
        // 実験用
        { type: "detail1", content: data.detail1 },
        { type: "detail2", content: data.detail2 },
        { type: "detail3", content: data.detail3 },
      ]);
      setChatDetails((prev) => [
        ...prev,
        { type: "detail1", content: data.detail1 },
        { type: "detail2", content: data.detail2 },
        { type: "detail3", content: data.detail3 },
      ]);
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました。");
    }

    setMessage(""); // メッセージボックスをクリア
  };

  // Enterキーでメッセージ送信
  const keySend = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === "Enter") {
      return;
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  //チャットページの一番下に自動移動
  useEffect(() => {
    if (endOfMessages.current) {
      endOfMessages.current.scrollTop = endOfMessages.current.scrollHeight;
    }
  }, [chatMessages]);

  // ボタンで詳細表示
  const showDetail = async () => {};

  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#dadfe8",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* 左半分 */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          margin: "0 auto",
          padding: 2,
          backgroundColor: "#dadfe8",
          borderRadius: "8px",
        }}
      >
        <Box>
          {/* モデル名 */}
          <Box
            sx={{
              backgroundColor: "#162040",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: 2,
              display: "flex",
              flexGrow: 1,
            }}
          >
            <Typography variant="h6" color="white">
              {params.slug}
            </Typography>
          </Box>
          {/* 詳細表示エリア */}
          <Box
            sx={{
              maxHeight: "400px",
              height: "100%",
              width: "100%",
              overflowY: "auto",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              marginBottom: 2,
            }}
          >
            以下の3つの推論をまとめました
            {chatDetails.map((dtl, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: 1,
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: "8px 16px",
                    borderRadius: "16px",
                    maxWidth: "70%",
                  }}
                >
                  {dtl.content}
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {/* 右半分 */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          margin: "0 auto",
          padding: 2,
          backgroundColor: "#dadfe8",
          borderRadius: "8px",
        }}
      >
        {/* メッセージ表示エリア */}
        <Box
          sx={{
            maxHeight: "400px",
            height: "100%",
            width: "100%",
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
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  padding: "8px 16px",
                  borderRadius: "16px",
                  backgroundColor: msg.type === "user" ? "#373e58" : "#dadfe8",
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
              backgroundColor: "#162040",
            }}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatApp;
