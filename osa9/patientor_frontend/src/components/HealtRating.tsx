import React from "react";
import { HealthCheckRating } from "../types";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const HealtRating: React.FC<{
  healthCheckRating: HealthCheckRating | undefined;
}> = ({ healthCheckRating }) =>
  healthCheckRating !== undefined && healthCheckRating === 0 ? (
    <FavoriteIcon />
  ) : healthCheckRating === 1 ? (
    <Brightness2Icon />
  ) : healthCheckRating === 2 ? (
    <BrightnessMediumIcon />
  ) : healthCheckRating === 3 ? (
    <PriorityHighIcon />
  ) : null;

export default HealtRating;
