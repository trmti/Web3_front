import {
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PrimaryTypography } from "../_component/PrimaryTypography";
import Link from "next/link";
import { ethers, Result } from "ethers";
import { abi } from "../_consists/abi";

const addressIndex = 0;
const goodIndex = 1;
const badIndex = 2;
const speedIndex = 3;

const fetchBlockchain = async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc-amoy.polygon.technology"
  );
  const contract = new ethers.Contract(
    "0x322527d78D5B297d5cC0be9E8a75A2701c661FDB",
    abi,
    provider
  );
  const result: Result[][] = await contract.getAllEvaluations();
  const blockchains = result[addressIndex].map((val, idx) => {
    return {
      address: val,
      good: Number(result[goodIndex][idx]),
      bad: Number(result[badIndex][idx]),
      speed: Number(result[speedIndex][idx]),
    };
  });
  return blockchains.sort((a, b) => {
    const aEvaluation = a.good + a.speed - a.bad;
    const bEvaluation = b.good + b.speed - b.bad;
    if (aEvaluation > bEvaluation) {
      return -1;
    }
    if (aEvaluation < bEvaluation) {
      return 1;
    }
    return 0;
  });
};

export default async function GPU() {
  const blockchains = await fetchBlockchain();
  return (
    <Container
      maxWidth={"lg"}
      sx={{ pt: "16px", display: "flex", flexDirection: "column", gap: "32px" }}
    >
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
      <Box>
        <Stack flexDirection={"row"} alignItems={"center"} gap={"16px"}>
          <PrimaryTypography fontWeight={"bold"} fontSize={"20px"}>
            最新のGPU評価
          </PrimaryTypography>
          <Typography color="#b8b8b8" fontSize={"20px"} fontWeight={"semibold"}>
            ※評価の高い順に並べます
          </Typography>
        </Stack>
        <TableContainer component={Paper} sx={{ mt: "8px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Wallet Address</TableCell>
                <TableCell>Good</TableCell>
                <TableCell>Bad</TableCell>
                <TableCell>Speed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blockchains.map((blockchain) => (
                <TableRow key={String(blockchain.address)}>
                  <TableCell scope="row">{blockchain.address}</TableCell>
                  <TableCell>{blockchain.good}</TableCell>
                  <TableCell>{blockchain.bad}</TableCell>
                  <TableCell>{blockchain.speed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
