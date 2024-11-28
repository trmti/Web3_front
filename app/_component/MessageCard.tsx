import { Box, BoxProps, Paper } from "@mui/material";

// ユーザのメッセージカード
export const UserMessageCard = ({
  message,
  sx,
  ...rest
}: { message: string } & BoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "16px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        ...sx,
      }}
      {...rest}
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
      >
        {message}
      </Paper>
    </Box>
  );
};

// モデルのメッセージカード
export const BotMessageCard = ({
  response,
  sx,
  ...rest
}: { response: string } & BoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "16px",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        ...sx,
      }}
      {...rest}
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
        {response}
      </Paper>
    </Box>
  );
};
