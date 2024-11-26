import { Typography, TypographyProps } from "@mui/material";

export const PrimaryTypography = ({
  children,
  sx,
  ...rest
}: TypographyProps) => {
  return (
    <Typography sx={{ color: "#373e5a", ...sx }} {...rest}>
      {children}
    </Typography>
  );
};
