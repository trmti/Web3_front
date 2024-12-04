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
            <Typography noWrap>{option.label}</Typography>
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
          onClick={onClickCreate}
        >
          決定
        </PrimaryButton>
      </Box>
    </Container>
  );
};

export default Home;
