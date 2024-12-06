"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { TextArea } from "@/app/_component/TextArea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BotMessageCard, UserMessageCard } from "@/app/_component/MessageCard";

type Response = {
  messages: {
    message: string;
    response: string;
  }[];
  model: {
    name: string;
  };
};

type SendMessageBody = {
  message: string;
};

type SendMessageResponse = {
  response_1: string;
  response_2: string;
  response_final: string;
};

type Description = {
  text: string;
};

const ChatApp = ({ params }: { params: { slug: string } }) => {
  const [message, setMessage] = useState("");
  const [chatDetails, setChatDetails] = useState<SendMessageResponse>({
    response_1: "",
    response_2: "",
    response_final: "",
  });
  const endOfMessages = useRef<HTMLDivElement>(null);
  const [sendingMessage, setSendingMessage] = useState("");

  // モデルごとのチャットを取得
  const { isPending, error, data } = useQuery<Response>({
    queryKey: ["messages", params.slug],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/model/${params.slug}/message?user_id=${localStorage.getItem("user_id")}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      ).then((res) => res.json()),
  });

  // モデルごとのチャットを送信
  const { mutate, isPending: isPendingSendMessage } = useMutation<
    SendMessageResponse,
    unknown,
    SendMessageBody
  >({
    mutationFn: async ({ message }: { message: string }) => {
      return await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Question: message,
          ModelID: params.slug,
        }),
      }).then((response) => response.json());
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

    setSendingMessage(message);
    // モデルごとのチャットを送信
    mutate(
      { message: message },
      {
        onSuccess: (res) => {
          console.log(res);
          setChatDetails(res);
          setSendingMessage("");
          // チャットのキャッシュ更新
          queryClient.invalidateQueries({
            queryKey: ["messages", params.slug],
          });
        },
        onError: () => {
          setSendingMessage("");
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
  }, [data, sendingMessage, isPendingSendMessage]);

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
            {data ? (
              <Typography variant="h6" color="white">
                {data.model.name}
              </Typography>
            ) : (
              <Skeleton
                width={"100%"}
                sx={{ fontSize: "22px", backgroundColor: "#dadfe8" }}
              />
            )}
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
            <>
              {!chatDetails.response_1 &&
              !chatDetails.response_2 &&
              !chatDetails.response_final ? (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "black",
                    marginTop: "16px",
                  }}
                >
                  {data?.model.name}に聞いてみましょう!
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "16px",
                    marginBottom: "16px",
                    color: "black",
                  }}
                >
                  以下の３つの推論をまとめて作られました。
                </Typography>
              )}
              {chatDetails.response_1 && (
                <BotMessageCard>{chatDetails.response_1}</BotMessageCard>
              )}
              {chatDetails.response_2 && (
                <BotMessageCard>{chatDetails.response_2}</BotMessageCard>
              )}
              {chatDetails.response_final && (
                <BotMessageCard>{chatDetails.response_final}</BotMessageCard>
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
            data.messages.map((msg) => (
              <>
                <UserMessageCard message={msg.message} key={msg.message} />
                <BotMessageCard key={msg.response}>
                  {msg.response}
                </BotMessageCard>
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
          {sendingMessage && <UserMessageCard message={sendingMessage} />}
          {isPendingSendMessage && (
            <BotMessageCard paperProps={{ sx: { width: "70%" } }}>
              <>
                <Skeleton width={"100%"} sx={{ backgroundColor: "#ff6680" }} />
                <Skeleton width={"100%"} sx={{ backgroundColor: "#ff6680" }} />
                <Skeleton width={"70%"} sx={{ backgroundColor: "#ff6680" }} />
              </>
            </BotMessageCard>
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
            sx={{ color: "#000" }}
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
