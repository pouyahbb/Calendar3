import React, { useState, useContext } from "react";
// Material
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
// Other
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import classes from "./autoComplete.module.scss";
import { withRouter } from "react-router-dom";
import { configContext } from "./../../../../../../configContext";

export const AutoComplete = ({ field, handleOptionSelect }) => {
  const [address, setAddress] = useState("");
  const content = useContext(configContext);
  // console.log(context)
  return (
    <PlacesAutocomplete value={address} onChange={setAddress}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <Autocomplete
            id="size-small-standard"
            size="small"
            options={suggestions}
            autoHighlight
            renderOption={(option) => (
              <>
                <LocationOnOutlinedIcon className={classes.RenderOptionIcon} />
                <span className={classes.RenderOptionSpan}>
                  {option.description}
                </span>
              </>
            )}
            forcePopupIcon
            handleHomeEndKeys
            getOptionSelected={(option, value) =>
              handleOptionSelect(option, value)
            }
            loading={loading && true}
            loadingText={<CircularProgress />}
            noOptionsText={content.autoCompleteContent[0].text + `"${address}"`}
            selectOnFocus
            getOptionLabel={(option) => option.description ?? ""}
            renderInput={(params) => (
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <LocationOnIcon />
                </Grid>
                <Grid xs item>
                  <TextField
                    {...params}
                    variant="standard"
                    required
                    label={field.label}
                    {...getInputProps({
                      placeholder: content.autoCompleteContent[1].text,
                    })}
                  />
                </Grid>
              </Grid>
            )}
          />
        );
      }}
    </PlacesAutocomplete>
  );
};

export default withRouter(AutoComplete);
