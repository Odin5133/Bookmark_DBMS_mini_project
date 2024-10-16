import * as React from "react";
import { useState, useEffect } from "react";
import { IconDirectionSignFilled } from "@tabler/icons-react";

type Timex = {
  years: number;
  months: number;
  days: number;
  hours: number;
};

type Urlx = {
  url: string;
  description: string;
  timeStamp: string;
};

function BookmarkTemplate({ url, description, timeStamp }: Urlx) {
  const [time, setTime] = useState<Timex>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
  });
  var date1 = new Date();
  var date2 = new Date(timeStamp);

  function interval(date1: Date, date2: Date) {
    if (date1 > date2) {
      // swap
      var result: Timex = interval(date2, date1);
      result.years = -result.years;
      result.months = -result.months;
      result.days = -result.days;
      result.hours = -result.hours;
      return result;
    }
    var result = {
      years: date2.getFullYear() - date1.getFullYear(),
      months: date2.getMonth() - date1.getMonth(),
      days: date2.getDate() - date1.getDate(),
      hours: date2.getHours() - date1.getHours(),
    };
    if (result.hours < 0) {
      result.days--;
      result.hours += 24;
    }
    if (result.days < 0) {
      result.months--;
      // days = days left in date1's month,
      // plus days that have passed in date2's month
      var copy1 = new Date(date1.getTime());
      copy1.setMonth(copy1.getMonth() + 1);
      copy1.setDate(0); // last day of the previous month
      result.days = copy1.getDate() - date1.getDate() + date2.getDate();
    }
    if (result.months < 0) {
      result.years--;
      result.months += 12;
    }
    return result;
  }

  useEffect(() => setTime(interval(date2, date1)), []);

  return (
    <div className="mt-8 rounded-xl border border-gray-700 bg-black bg-opacity-10 bg-clip-padding p-4 text-white backdrop-blur-xl backdrop-filter sm:mx-20">
      <div className="rounded-xl border border-gray-700 bg-black bg-opacity-20 bg-clip-padding px-4 py-2 text-white backdrop-blur-xl backdrop-filter">
        <div>
          <span className="px-2 text-lg font-semibold">Url</span>
          <div
            className="mt-2 flex items-center justify-between rounded-xl
bg-purple-300 bg-opacity-20 bg-clip-padding px-4 py-2
backdrop-blur-xl backdrop-filter"
          >
            <span className="truncate text-sm text-gray-300">
              {url.replace(/^(https?:\/\/)?(www\.)?/, "")}
            </span>
            <IconDirectionSignFilled
              size="24"
              className="ml-2 flex-shrink-0 cursor-pointer text-violet-500"
              onClick={() => window.open(url, "_blank")}
            />
          </div>
        </div>
        <div className="mt-4">
          <span className="px-2 text-lg font-semibold">Description</span>
          <div className="mt-2">
            <p className="line-clamp-3 px-3 text-sm text-gray-300">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <span className="flex w-full justify-end text-sm text-gray-400">
            {time.years !== 0
              ? `~${time.years} years ago`
              : time.months !== 0
                ? `~${time.months} months ago`
                : time.days !== 0
                  ? `~${time.days} days ago`
                  : time.hours !== 0
                    ? `~${time.hours} hours ago`
                    : "~Just now"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookmarkTemplate;
