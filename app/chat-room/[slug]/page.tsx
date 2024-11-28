"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { TextArea } from "@/app/_component/TextArea";
import { matchesGlob } from "path";
import { BoltRounded } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Description } from "@mui/icons-material";

// type Message = {
//   type: "user" | "bot" | "detail1" | "detail2" | "detail3";
//   content: string;
// };

type Response = {
  messages: {
    message: string;
    response: string;
  }[];
};

type SendMessageBody = {
  message: string;
  response: string;
};

type SendMessageResponse = {
  first: string;
  second: string;
  third: string;
};

type Description = {
  text: string;
};

const ChatApp = ({ params }: { params: { slug: string } }) => {
  const [message, setMessage] = useState("");
  const [chatDetails, setChatDetails] = useState<SendMessageResponse>({
    first: "",
    second: "",
    third: "",
  });
  // const [data, setData] = useState<Response>({
  //   answer: "",
  //   detail1: "",
  //   detail2: "",
  //   detail3: "",
  // });
  const [description, setDescription] = useState<Description>({
    text: "",
  });
  const endOfMessages = useRef<HTMLDivElement>(null);

  // モデルごとのチャットを取得
  const { isPending, error, data } = useQuery<Response>({
    queryKey: ["messages", params.slug],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/model/${params.slug}/message?user_id=${localStorage.getItem("user_id")}`
      ).then((res) => res.json()),
  });

  // モデルごとのチャットを送信
  const mutation = useMutation<SendMessageResponse, unknown, SendMessageBody>({
    mutationFn: ({
      message,
      response,
    }: {
      message: string;
      response: string;
    }) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/model/${params.slug}/message?user_id=${localStorage.getItem("user_id")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            response: response,
          }),
        }
      ).then((response) => response.json());
    },
  });

  // チャットのキャッシュ更新
  const queryClient = useQueryClient();

  // ボタンでメッセージ送信
  const handleSend = async () => {
    if (message.trim() === "") {
      alert("メッセージを入力してください。");
      return;
    }

    // モデルごとのチャットを送信
    mutation.mutate(
      { message: message, response: "ペ二バン最高!" },
      {
        onSuccess: (res) => {
          setChatDetails(res);
          // チャットのキャッシュ更新
          queryClient.invalidateQueries({
            queryKey: ["messages", params.slug],
          });
        },
      }
    );

    // メッセージ入力エリアをクリア
    setMessage("");
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
  }, [data]);

  return (
    <Box
      sx={{
        height: "100%",
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#dadfe8",
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
              fontWeight: "bold",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Typography
              sx={{
                borderRadius: "8px",
                color: "#ffffff",
                fontWeight: "bold",
                background: "#373e5a",
                padding: "4px",
              }}
            >
              最新の応答の詳細は以下になります
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              <br />
            </Typography>
            <>
              {!chatDetails.first &&
              !chatDetails.second &&
              !chatDetails.third ? (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {params.slug}に聞いてみましょう!
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  以下の３つの推論をまとめて作られました。
                </Typography>
              )}
              {chatDetails.first && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "16px",
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
                    {chatDetails.first}
                  </Paper>
                </Box>
              )}
              {chatDetails.second && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "16px",
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
                    {chatDetails.second}
                  </Paper>
                </Box>
              )}
              {chatDetails.first && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "16px",
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
                    {chatDetails.third}
                  </Paper>
                </Box>
              )}
            </>
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
            fontWeight: "bold",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 2,
            marginBottom: 2,
          }}
          ref={endOfMessages}
        >
          {data ? (
            data.messages.map((msg, index) => (
              <>
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "16px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "8px 16px",
                      borderRadius: "16px",
                      backgroundColor: "#373e58",
                      color: "white",
                      maxWidth: "70%",
                    }}
                    // onMouseEnter={() => handleShowDetails(msg)}
                  >
                    {msg.message}
                  </Paper>
                </Box>
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "16px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "8px 16px",
                      borderRadius: "16px",
                      backgroundColor: "#dadfe8",
                      color: "black",
                      maxWidth: "70%",
                    }}
                  >
                    {msg.response}
                  </Paper>
                </Box>
              </>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          )}
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
