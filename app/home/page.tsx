import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Home() {
  const cards = Array(4).fill(0);

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
      {cards.map((_, index) => (
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
              NAME
            </Typography>
            <Typography gutterBottom sx={{ color: "text.secondary", mb: 1.0 }}>
              SubTitle1
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.0 }}>
              SubTitle2
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.0 }}>
              SubTitle3
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <SendIcon sx={{ color: "#373e5a" }}></SendIcon>{" "}
              <span style={{ color: "#373e5a", marginLeft: 5 }}>CHAT</span>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}
