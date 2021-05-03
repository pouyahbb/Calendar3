import React, { useContext } from "react";
// Material
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Other
import AddToCalenedar from "./components/AddToCalendar/AddToCalendar";
import BodyContent from "./components/BodyContent/BodyContent";
import classes from "./confirm.module.scss";
import { Grid } from "@material-ui/core";
import { configContext } from "../configContext";

export const Confirm = ({ date, time, timeZone }) => {
  const content = useContext(configContext);
  // For responsive
  const matches = useMediaQuery("(max-width : 950px)");
  const matches2 = useMediaQuery(`(max-width : 500px)`);

  let tenMinuteAfter = +time.split(":")[1].split("-")[0] + 10;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.Confirm}
    >
      <Grid item xs className={classes.ConfirmHeader}>
        <p> {content.confirmPage[0].text} </p>
        <span> {content.confirmPage[1].text} </span>
        <div className={classes.AddToCalendar}>
          <AddToCalenedar
            time={time}
            date={date}
            timeZone={timeZone}
            tenMinuteAfter={tenMinuteAfter}
          />
        </div>
      </Grid>
      <Grid
        item
        xs
        style={{ marginLeft: matches2 && "1rem" }}
        className={classes.ConfirmBody}
      >
        <BodyContent
          matches={matches}
          time={time}
          date={date}
          timeZone={timeZone}
          tenMinuteAfter={tenMinuteAfter}
        />
      </Grid>
    </Grid>
  );
};

export default Confirm;
