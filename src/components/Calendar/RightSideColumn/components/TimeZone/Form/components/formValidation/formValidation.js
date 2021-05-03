import { useContext } from "react";
import _ from "lodash";
import { configContext } from "../../../../../../configContext";

export const FormValidation = (
  { location, email, firstName, lastName, phoneNumber },
  callBack
) => {
  const content = useContext(configContext);
  if (_.isEmpty(email)) {
    return callBack({
      isValid: false,
      message: `${content.formValidation[1].text}`,
    });
  } else if (_.isEmpty(firstName) || firstName.length <= 3) {
    return callBack({
      isValid: false,
      message: `${content.formValidation[2].text}`,
    });
  } else if (_.isEmpty(lastName) || lastName.length <= 3) {
    return callBack({
      isValid: false,
      message: `${content.formValidation[3].text}`,
    });
  }

  return callBack({
    isValid: true,
    message: "",
  });
};
