"use client";

import React, { useState, useCallback, useEffect, ReactNode } from "react";
import { Container, TextField, Select, MenuItem, Button, Box, Typography, SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const DropArea = styled("div")({
    lineHeight: "200px",
    width: "200px",
    textAlign: "center",
    border: "1px dotted #808080",
    color: "#808080",
    margin: "20px auto",
});

const FilePreview = styled("div")({
    marginTop: "20px",
    textAlign: "center",
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
        <Typography variant="h6">{label}</Typography>
        <Select fullWidth value={value} onChange={onChange} displayEmpty>
            <MenuItem value="">
                <em>選択してください</em>
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </Box>
);

const Home = () => {
    const [name, setName] = useState("");
    const [model1, setModel1] = useState("");
    const [model2, setModel2] = useState("");
    const [model3, setModel3] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const models = [
        { value: "Llama-2-7b-Japanese", label: "Llama-2-7b-Japanese" },
        { value: "haqishen-Llama-3-8B-Japanese", label: "haqishen-Llama-3-8B-Japanese" },
        { value: "umiyuki-Japanese-Chat-Umievo", label: "umiyuki-Japanese-Chat-Umievo" },
    ];

    useEffect(() => { setIsButtonEnabled(model1 !== '' && model2 !== '' && model3 !== ''); }, [model1, model2, model3]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleSubmit = useCallback(() => {
        window.location.href = `http://127.0.0.1:5500/resulthtml.html?select1=${model1}&select2=${model2}&select3=${model3}`;
    }, [model1, model2, model3]);

    return (
        <Container>
            <Box textAlign="center" py={5}>
                <Typography variant="h1">Decentra Love</Typography>
            </Box>

            <Box my={2}>
                <TextField
                    fullWidth
                    label="名前"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Box>

            <Box display="flex" justifyContent="space-around" my={2}>
                <ModelSelector
                    label="モデル1"
                    value={model1}
                    onChange={(e) => setModel1(e.target.value as string)}
                    options={models}
                />
                <ModelSelector
                    label="モデル2"
                    value={model2}
                    onChange={(e) => setModel2(e.target.value as string)}
                    options={models}
                />
                <ModelSelector
                    label="モデル3"
                    value={model3}
                    onChange={(e) => setModel3(e.target.value as string)}
                    options={models}
                />
            </Box>

            

            <DropArea onDragOver={handleDragOver} onDrop={handleDrop}>
                ここにファイルをドロップ
            </DropArea>
            <input type="file" id="userfile" style={{ display: "none" }} onChange={handleFileChange} />
            <FilePreview>
                {file && file.type.startsWith("image/") ? (
                    <img id="img1" src={URL.createObjectURL(file)} alt="Preview" />
                ) : (
                    file && <div className="fileIcon">{file.name}</div>
                )}
            </FilePreview>


            <Box textAlign="center" my={2}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                >
                    決定
                </Button>
            </Box>
        </Container>

    );
};

export default Home;
