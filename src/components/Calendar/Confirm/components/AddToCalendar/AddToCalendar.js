import React, { useState, useContext } from "react";
// Material
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// Other
import {
  makeGoogleCalendarUrl,
  makeOutlookCalendarUrl,
  makeYahooCalendarUrl,
  makeICSCalendarUrl,
} from "./../addToCalendarConfig";
import moment from "moment";
import { configContext } from "../../../configContext";
import classes from "./addToCalendar.module.scss";

export const AddToCalendar = ({ time, date, timeZone, tenMinuteAfter }) => {
  const content = useContext(configContext);
  const [dropDown, setDropDown] = useState(false);
  // This is for addToclandar that change the format of time to the date
  let startDateTime = moment(
    `${date.split("-").join(" ")} ${time.split("-")[0]}`
  );
  let endDateTime = moment(startDateTime).add(10, "m");
  const event = {
    details: `${content.confirmPage[2].text} ${time.split("-").join(" ")}-${
      time.split(":")[0]
    }:${tenMinuteAfter} on ${date} `,
    endsAt: endDateTime.format(),
    location: timeZone,
    timezone: { timeZone },
    startsAt: startDateTime.format(),
    name: `${content.confirmPage[3].text}`,
  };

  return (
    <>
      <Button
        onClick={() => setDropDown((current) => !current)}
        variant="contained"
        color="primary"
      >
        <AddCircleOutlineIcon
          style={{ marginRight: ".3rem", fontSize: "1rem" }}
        />{" "}
        Add To Calendar
      </Button>
      <div
        style={{
          dispaly: !dropDown ? "none" : "flex",
          visibility: !dropDown ? "hidden" : "visible",
        }}
      >
        <div className={classes.AddToCalendarLists}>
          {content.addToCalendarContent.map((calendar) => {
            return (
              <div className={classes.AddToCalendarList}>
                <Button
                  color="link"
                  className={classes.AddToCalendarListItem}
                  href={
                    calendar.name === "makeGoogleCalendarUrl"
                      ? makeGoogleCalendarUrl(event)
                      : calendar.name === "makeOutlookCalendarUrl"
                      ? makeOutlookCalendarUrl(event)
                      : calendar.name === "makeYahooCalendarUrl"
                      ? makeYahooCalendarUrl(event)
                      : makeICSCalendarUrl(event)
                  }
                  target={calendar.target}
                >
                  {calendar.text}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddToCalendar;
