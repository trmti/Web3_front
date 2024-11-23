"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";

const mockChatRooms = [
  {
    id: 1,
    name: "デフォルト",
    selectedModel1: "hogehoge",
    selectedModel2: "unko",
    selectedModel3: "tinko",
  },
  {
    id: 2,
    name: "お嬢様モデル",
    selectedModel1: "hogehoge",
    selectedModel2: "unko",
    selectedModel3: "tinko",
  },
  {
    id: 3,
    name: "農業モデル",
    selectedModel1: "hogehoge",
    selectedModel2: "unko",
    selectedModel3: "tinko",
  },
  {
    id: 4,
    name: "医療モデル",
    selectedModel1: "hogehoge",
    selectedModel2: "unko",
    selectedModel3: "tinko",
  },
];

export default function Home() {
  const cards = Array(4).fill({ id: 1 });
  const router = useRouter();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 2,
        marginTop: 5,
      }}
    >
      {mockChatRooms.map((value, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 200,
            flex: "1 1 calc(25.0% - 16px)",
            boxSizing: "border-box",
            color: "#dadfe8",
          }}
        >
          <CardContent>
            <Typography
              sx={{ color: "#373e5a", mb: 2.0 }}
              variant="h5"
              component="div"
            >
              {value.name}
            </Typography>
            <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.0 }}>
              {value.selectedModel1}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.0 }}>
              {value.selectedModel2}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.0 }}>
              {value.selectedModel3}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => router.push(`/chat-room/${value.id}`)}
            >
              <SendIcon sx={{ color: "#373e5a" }}></SendIcon>{" "}
              <span style={{ color: "#373e5a", marginLeft: 5 }}>CHAT</span>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
