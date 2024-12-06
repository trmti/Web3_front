import { Button, ButtonProps } from "@mui/material";

export const PrimaryButton = ({ children, sx, ...rest }: ButtonProps) => {
  return (
    <Button
      color="secondary"
      sx={{
        mb: 2,
        width: "300px",
        backgroundColor: "#373e5a",
        color: "#dadfe8",
        fontWeight: "bold",
        "&:hover": { borderColor: "#373e5a" },
        ":disabled": { backgroundColor: "#ccc", cursor: "not-allowed" },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
