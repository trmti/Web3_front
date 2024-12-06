"use client";

import React, { useState, useEffect, ReactNode } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Box,
  Tooltip,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";
import { PrimaryButton } from "../_component/PrimaryButton";
import { useRouter } from "next/navigation";

// ModelSelectorコンポーネントのスタイル
const ModelSelect = styled(Select)({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
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
          <Tooltip title={option.label} arrow>
            <Typography noWrap>{option.value}</Typography>
          </Tooltip>
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
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUid = localStorage.getItem("user_id");
    setUid(storedUid);
  }, []);

  const onClickCreate = async () => {
    const Data = {
      user_id: uid,
      model_name: name,
      model_name_1: model1,
      model_name_2: model2,
      model_name_3: model3,
      train_completed: false,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/model`, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(Data),
      method: "POST",
    });
    const res_json = await res.json();
    if (res_json.id) {
      router.push("/home");
    }
  };

  const models = [
    {
      value: "Llama-2-7b-Japanese",
      label:
        "MetaのLlama-2を日本語特化で微調整したモデル。高品質な日本語生成が可能で、対話や要約に適応。",
    },
    {
      value: "haqishen-Llama-3-8B-Japanese",
      label:
        "Haqishen提供の日本語特化モデル。高度な日本語処理と生成能力を持つ8Bパラメータ搭載。",
    },
    {
      value: "umiyuki-Japanese-Chat-Umievo",
      label:
        "umiyukiの日本語チャット特化型モデル。強力な４つの日本語モデルを掛け合わせている。自然な会話と柔軟な応答が可能。",
    },
    {
      value: "lightblue-suzume-llama-3-8B-japanese",
      label:
        "MetaのLlama-3をLightblueが改良した日本語対応モデル。高精度な文脈理解と生成能力を持つ。",
    },
    {
      value: "Llama-3.2-1B-Instruct",
      label:
        "MetaのLlama-3.2の命令調整済多言語モデル。教師あり微調整 と人間によるフィードバックによる強化学習を使用し、有用性と安全性に関して人間の好みに合わせている。軽量でリソースに優しく、多様なタスクに対応可能。",
    },
    {
      value: "Qwen2-0.5B-Instruct",
      label:
        "Alibaba提供のQwen2の軽量モデル。リソース制限環境での対話生成やタスク処理に最適。",
    },
    {
      value: "gemma-2-baku-2b-it",
      label:
        "Google提供のGemma2の日本語対応モデル。テキスト生成能力やコストパフォーマンスを活かしつつ軽量化。",
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
          onClick={onClickCreate}
        >
          決定
        </PrimaryButton>
      </Box>
    </Container>
  );
};

export default Home;
