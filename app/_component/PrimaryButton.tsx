import { Button, ButtonProps } from "@mui/material"

export const PrimaryButton = ({children, ...rest}: ButtonProps) =>{
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
          backgroundColor: "#162040",
          color: "#dadfe8",
          fontWeight: "bold",
          borderRadius: "5px",
          ":disabled": { backgroundColor: "#ccc", cursor: "not-allowed" },
        }}
        {...rest}
      >
        {children}
      </Button>
    )
}