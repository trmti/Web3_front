import { Button, ButtonProps } from "@mui/material";

export const PrimaryButton = ({ children, sx, ...rest }: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      // onClick={handleSignUpClick}
      // sx={{
      //   width: "300px",
      //   borderRadius: "5px",
      //   border: "1px solid #3483d7",
      //   fontWeight: "bold",
      // }}
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
