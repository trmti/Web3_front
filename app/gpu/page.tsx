import { Container } from "@mui/material";
import { PrimaryTypography } from "../_component/PrimaryTypography";
import Link from "next/link";

const GPU = () => {
  return (
    <Container maxWidth={"md"} sx={{ pt: "16px" }}>
      <Link
        href={
          "https://gossamer-lion-194.notion.site/GPU-810a6331c78749d4a4879dce02076273?pvs=4"
        }
        target="_blank"
      >
        <PrimaryTypography
          fontSize={"24px"}
          sx={{ textDecoration: "underline" }}
        >
          新しくGPU投資する方へ
        </PrimaryTypography>
      </Link>
    </Container>
  );
};

export default GPU;
