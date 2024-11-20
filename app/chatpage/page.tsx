'use client'

import React, { useState } from 'react';
import './chatpage.css';

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
    <div className="container">
      <div id="bms_chat_header">
        <div id="bms_chat_user_status">
          <div id="bms_chat_user_name">Decentra Love</div>
        </div>
      </div>
      <div id="bms_messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`bms_message ${msg.type === 'user' ? 'bms_right' : 'bms_left'}`}
          >
            <div className="bms_message_box">
              <div className="bms_message_content">
                <div className="bms_message_text">{msg.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="bms_send">
        <textarea
          id="bms_send_message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        ></textarea>
        <div id="bms_send_btn" onClick={handleSendMessage}>
          送信
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
