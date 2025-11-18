"use client";

import clsx from "clsx";
import { useState } from "react";

const Clock = ({ classes }: { classes?: string }) => {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [time, setTime] = useState(formattedTime);
  setTimeout(() => setTime(formattedTime), 60000);

  return (
    <div
      className={clsx(
        "rounded-[50px] border border-platinum-10 px-5 py-2.5",
        classes
      )}
    >
      {time}
    </div>
  );
};

export default Clock;
