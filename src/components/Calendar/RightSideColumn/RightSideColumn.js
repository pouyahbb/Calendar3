import React, { useContext } from "react";
// Animation
import { Fade } from "react-reveal";
// Material
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import LanguageIcon from "@material-ui/icons/Language";
// Other
import TimeZone from "./components/TimeZone/TimeZone";
import timeZone from "moment-timezone";
import { withRouter } from "react-router-dom";
import classes from "./style/rightSide.module.scss";
import { configContext } from "./../configContext";

export const RightSideColumn = ({
  dateAccept,
  handleAcceptedDate,
  handleChange,
  date,
  routeName,
  location,
  timeZoneSelect,
  handleTimeZoneChange,
}) => {
  const content = useContext(configContext);

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item>
        <h6 className={classes.Text}>
          {location.search === "" ? (
            <Fade>{content.rightSideColumn[1].text}</Fade>
          ) : location.search === `?date=${routeName}` ? (
            `${content.rightSideColumn[0].text}`
          ) : (
            `${content.rightSideColumn[2].text}`
          )}
        </h6>
      </Grid>
      <Grid item className={classes.RightSideBodyContent}>
        {dateAccept ? (
          <TimeZone
            date={date}
            timeZone={timeZoneSelect}
            routeName={routeName}
          />
        ) : (
          <div className={classes.RightSideDatePicker}>
            <Fade>
              <Grid container>
                <Grid item>
                  <DatePicker
                    disableToolbar
                    disablePast
                    variant="static"
                    label="Only calendar"
                    helperText="No year selection"
                    value={date}
                    onChange={handleChange}
                    onAccept={handleAcceptedDate}
                  />
                </Grid>

                <Grid item>
                  <Autocomplete
                    options={timeZone.tz.names()}
                    getOptionLabel={(option) => option ?? ""}
                    autoHighlight
                    forcePopupIcon
                    handleHomeEndKeys
                    renderOption={(option) => (
                      <span
                        style={{
                          color: "#333",
                          margin: ".2rem",
                          fontSize: "13px",
                        }}
                      >
                        {option}
                      </span>
                    )}
                    value={timeZoneSelect}
                    onChange={(e, value) => {
                      handleTimeZoneChange(value);
                    }}
                    selectOnFocus
                    style={{ width: 300 }}
                    defaultValue={timeZone.tz.guess()}
                    renderInput={(params) => (
                      <div className={classes.RightSideTimeZoneContainer}>
                        <LanguageIcon
                          className={classes.RightSideTimeZonIcon}
                        />
                        <TextField
                          fullWidth
                          {...params}
                          label={content.rightSideColumn[3].text}
                          variant="standard"
                        />
                      </div>
                    )}
                  />
                </Grid>
              </Grid>
            </Fade>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default withRouter(RightSideColumn);
