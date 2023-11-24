import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const NoQuizLevelsMessage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <Box textAlign="center">
        <ErrorOutline style={{ fontSize: "60px", color: "#f44336" }} />
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Oops! No Quiz Levels Available
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          It seems there are no quiz levels at the moment. Please check back
          later.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          Go Home
        </Button>
      </Box>
    </Grid>
  );
};

export default NoQuizLevelsMessage;
