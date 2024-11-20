'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from '@mui/material';

type Message = {
  type: 'user' | 'bot';
  content: string;
};

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      alert('メッセージを入力してください。');
      return;
    }

    const url = 'http://192.168.11.10:8000/create_task';
    const params = new URLSearchParams(window.location.search);
    const select1Value = params.get('select1');
    const select2Value = params.get('select2');
    const select3Value = params.get('select3');

    const newUserMessage: Message = { type: 'user', content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Question: inputMessage,
        Model_Names: [select1Value, select2Value, select3Value],
        Aggregator_Name: 'Llama-2-7b-Japanese',
        Wait_Task_Num: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newBotMessage: Message = { type: 'bot', content: data.answer };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('エラーが発生しました。');
      });

    setInputMessage('');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 0, border: 1, borderColor: 'grey.300' }}>
      {/* ヘッダー */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'grey.300',
          backgroundColor: 'grey.100',
        }}
      >
        <Typography variant="h6">Decentra Love</Typography>
      </Box>

      {/* メッセージリスト */}
      <Box
        sx={{
          p: 2,
          height: '400px',
          overflowY: 'auto',
          backgroundColor: 'grey.50',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Paper
              sx={{
                p: 1,
                maxWidth: '70%',
                backgroundColor: msg.type === 'user' ? 'primary.light' : 'grey.200',
              }}
            >
              <Typography variant="body1">{msg.content}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* メッセージ入力 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderTop: 1,
          borderColor: 'grey.300',
          backgroundColor: 'grey.100',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="メッセージを入力してください..."
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={handleSendMessage}
        >
          送信
        </Button>
      </Box>
    </Container>
  );
};

export default ChatPage;
