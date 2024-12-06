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
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";

type ModelResponse = {
  models: {
    id: number;
    name: string;
    train_completed: boolean;
    base_models: { id: number; name: string }[];
  }[];
};

export default function Home() {
  const router = useRouter();
  const { isPending, error, data } = useQuery<ModelResponse>({
    queryKey: ["models"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/model?user_id=${localStorage.getItem("user_id")}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      ).then((res) => res.json()),
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        justifyContent: "space-around",
        gap: 2,
        marginTop: 5,
      }}
    >
      {data &&
        data.models.map((value, index) => (
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

              {value.base_models.map((value, index) => (
                <Typography
                  key={value.id}
                  sx={{ color: "text.secondary", mb: 1.0 }}
                >
                  {value.name}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                disabled={!value.train_completed}
                sx={{ ":disabled": { opacity: 0.3 } }}
                onClick={() => router.push(`/chat-room/${value.id}`)}
              >
                <SendIcon sx={{ color: "#373e5a" }}></SendIcon>{" "}
                <span style={{ color: "#373e5a", marginLeft: 5 }}>CHAT</span>
              </Button>
              <Button
                size="small"
                disabled={!value.train_completed}
                sx={{ ":disabled": { opacity: 0.3 } }}
                onClick={() => router.push("/learn")}
              >
                <EditIcon sx={{ color: "#373e5a" }}></EditIcon>{" "}
                <span style={{ color: "#373e5a", marginRight: 1 }}>learn</span>
              </Button>
            </CardActions>
          </Card>
        ))}
    </Container>
  );
}
