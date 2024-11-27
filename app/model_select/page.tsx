"use client";

import React, { useState, useCallback, useEffect, ReactNode } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { PrimaryButton } from "../_component/PrimaryButton";
import { useRouter } from "next/navigation";
import { useDropzone, FileRejection } from "react-dropzone";

// スタイル定義
const DropAreaContainer = styled(Box)({
  display: "flex",
  alignItems: "center", // 左右に並べるためにアイテムを中央に配置
  justifyContent: "space-between", // 余白を使って左右に配置
  marginBottom: "80px", // 下の余白
});

const DropArea = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "50%", // 幅を調整して左側に寄せる
  height: "85px",
  textAlign: "center",
  border: "1px dotted #373e5a",
  color: "#808080",
});

const FileList = styled("div")({
  width: "50%", // 幅を調整して右側に表示
  textAlign: "center",
  marginTop: "20px",
  marginLeft: "30px",
});

// ModelSelectorコンポーネントのスタイル
const ModelSelect = styled(Select)({
  "text-overflow": "ellipsis",
  overflow: "hidden",
  "white-space": "nowrap",
  maxWidth: "175px", // プルダウンメニューの横幅を設定（必要に応じて調整）
});

// Components
const ModelSelector = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  options: { value: string; label: string }[];
}) => (
  <Box>
    <Typography variant="h6" sx={{ color: "#373e5a", textAlign: "center" }}>
      {label}
    </Typography>
    <ModelSelect
      fullWidth
      value={value}
      onChange={(event, child) =>
        onChange(event as SelectChangeEvent<string>, child)
      }
      displayEmpty
    >
      <MenuItem value="">
        <Typography sx={{ color: "#162040" }}>選択してください</Typography>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </ModelSelect>
  </Box>
);

// Homeコンポーネント
const Home = () => {
  const [name, setName] = useState("");
  const [model1, setModel1] = useState("");
  const [model2, setModel2] = useState("");
  const [model3, setModel3] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();

  const models = [
    { value: "Llama-2-7b-Japanese", label: "Llama-2-7b-Japanese" },
    {
      value: "haqishen-Llama-3-8B-Japanese",
      label: "haqishen-Llama-3-8B-Japanese",
    },
    {
      value: "umiyuki-Japanese-Chat-Umievo",
      label: "umiyuki-Japanese-Chat-Umievo",
    },
  ];

  useEffect(() => {
    setIsButtonEnabled(
      name !== "" && model1 !== "" && model2 !== "" && model3 !== ""
    );
  }, [name, model1, model2, model3]);

  return (
    <Container maxWidth="sm">
      <Box my={"50px"}>
        <TextField
          fullWidth
          label="名前"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Box display="flex" justifyContent="space-around" my={"50px"}>
        {["モデル1", "モデル2", "モデル3"].map((label, index) => (
          <ModelSelector
            key={index}
            label={label}
            value={[model1, model2, model3][index]}
            onChange={(e) =>
              [setModel1, setModel2, setModel3][index](e.target.value as string)
            }
            options={models}
          />
        ))}
      </Box>
      <Box textAlign="center" my={"50px"}>
        <PrimaryButton
          variant="contained"
          color="primary"
          disabled={!isButtonEnabled}
          onClick={() => router.push("/home")}
        >
          決定
        </PrimaryButton>
      </Box>
    </Container>
  );
};

export default Home;
