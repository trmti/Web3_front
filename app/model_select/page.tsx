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
import CloseIcon from '@mui/icons-material/Close'; // アイコンを追加
import { PrimaryTypography } from "../_component/PrimaryTypography";

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
  marginLeft:"30px",
});

// ModelSelectorコンポーネントのスタイル
const ModelSelect = styled(Select)({
  "text-overflow": "ellipsis",
  "overflow": "hidden",
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
    <ModelSelect fullWidth value={value} onChange={(event, child) => 
        onChange(event as SelectChangeEvent<string>, child)
      } displayEmpty>
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
  const [currentShowFiles, setCurrentShowFiles] = useState<
    { file: File; isUploaded: boolean }[]
  >([]);
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
      name !== "" &&
        model1 !== "" &&
        model2 !== "" &&
        model3 !== "" &&
        currentShowFiles.some((file) => file.isUploaded)
    );
  }, [name, model1, model2, model3, currentShowFiles]);

  const onUploadFile = async (file: File) => {
    try {
      setCurrentShowFiles((prevFiles) => [
        ...prevFiles,
        { file, isUploaded: false },
      ]);
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 9000 + 1000));
      setCurrentShowFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file.name === file.name ? { ...f, isUploaded: true } : f
        )
      );
    } catch (error) {
      alert(`アップロード中にエラーが発生しました: ${error}`);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const filteringFiles = acceptedFiles.filter(
        (file) =>
          !currentShowFiles.find(
            (showFile) =>
              file.name === showFile.file.name && file.size === showFile.file.size
          )
      );
      if (filteringFiles.length + currentShowFiles.length > 10) {
        alert("最大10ファイルまでアップロードできます。");
        return;
      }
      await Promise.all(filteringFiles.map((file) => onUploadFile(file)));
    },
    [currentShowFiles]
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach(({ code }) => {
        let message = "エラーが発生しました。";
        if (code === "file-too-large") {
          message = `${file.name} のファイルサイズが大きすぎます。50MB以下のファイルをアップロードしてください。`;
        } else if (code === "file-invalid-type") {
          message = `${file.name} のファイル形式が許可されていません。`;
        }
        alert(message);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      accept: {
        "application/json": [],
      },
      maxSize: 50 * 1024 * 1024,
    });

  const handleDeleteFile = (fileName: string) => {
    setCurrentShowFiles((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileName)
    );
  };

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

      <DropAreaContainer>
        <DropArea {...getRootProps()}>
          <input {...getInputProps()} />
          <PrimaryTypography>
            {isDragAccept
              ? "ファイルをアップロードします。"
              : isDragReject
              ? "エラー"
              : "ファイルを登録してください。"}
          <button disabled={isDragReject}>ファイルを選択。または、ドラッグ＆ドロップ</button>
          </PrimaryTypography>
        </DropArea>
        <FileList>
  <PrimaryTypography>
    {currentShowFiles.map((item, index) => (
      <Box key={index}>
        {item.isUploaded ? (
          <Box sx={{ display: "flex",
           alignItems: "center",
            justifyContent: "space-between" }}>

            <Box sx={{ marginRight: "10px" }}>{item.file.name}</Box> {/* ファイル名の右側にスペースを追加 */}
             <PrimaryButton sx={{
                color: "white", // テキストを白に
                backgroundColor: "red", // 背景を赤に
                borderRadius: "20px", // 丸みを帯びたボタン
                padding: "5px 10px", // ボタンの内側の余白
                border: "none", // 枠線なし
                cursor: "pointer", // カーソルをポインタに
                fontSize: "12px", // フォントサイズ調整
                width : "6",
              }}
              onClick={() => handleDeleteFile(item.file.name)}
            >
              削除
            </PrimaryButton>
          </Box>
        ) : (
          <div>{item.file.name} をアップロードしています…</div>
        )}
      </Box>
    ))}
  </PrimaryTypography>
</FileList>


      </DropAreaContainer>

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