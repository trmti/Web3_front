import { Button, ButtonProps } from "@mui/material"

export const TextButton = ({children, ...rest}: ButtonProps) =>{
    return (
        <Button
        color="secondary"
        sx={{
          width: "300px",
          fontWeight: "bold",
        }}
        {...rest}
        >
          {children}
        </Button>
      )
  }