import React from "react";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) {
    return null; // or some other default value
  }
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 0) {
    return null; // or some other default value
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${nameParts[0][0].toUpperCase()}${
      nameParts.length > 1 ? nameParts[1][0].toUpperCase() : ""
    }`,
  };
}

export default function BackgroundLetterAvatars({ name }) {
  const avatarProps = stringAvatar(name) || {}; // or some other default value
  return <Avatar {...avatarProps} />;
}
