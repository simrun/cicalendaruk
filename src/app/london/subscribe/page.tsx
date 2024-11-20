"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { useState } from "react";

import Callout from "@/components/Callout";
import Expandable from "@/components/Expandable";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import NavBar from "@/components/NavBar";

export default function Page() {
  // There isn't good documentation on how to build subscribe to ICS links for
  // the major calendar apps. This was gathered from many sources, including:
  // https://stackoverflow.com/questions/75119105/how-to-create-a-subscribtion-link-to-ics-webcal-calendars

  const [includeRestOfUK, setIncludeRestOfUK] = useState(true);

  const calendarName = includeRestOfUK
    ? "CI Calendar London & UK"
    : "CI Calendar London";
  const icsHttpsUrl = `https://cicalendar.uk/subscribe.ics?london=all${includeRestOfUK ? "&restofuk=multiday" : ""}`;
  const icsWebcalUrl = icsHttpsUrl.replace("https://", "webcal://");
  // Only seems to work (on desktop web) with webcal or http (not https) scheme :-|
  // Using /render instead of /r seems better supported on Android at first
  // glance (after the Google Calendar app opens, instead of doing nothing it
  // asks if you want to add the calendar) but this only provides false hope
  // since as of Sept 2024 adding ICS calendars on Android always fails. So
  // stick to /r which at least fails slightly more obviously.
  const googleCalendarUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(icsWebcalUrl)}`;

  return (
    <>
      <MaxWidthContainer>
        <NavBar
          breadcrumb={[
            ["London", "/london"],
            // There isn't room to append Subscribe on mobile.
            ["Subscribe", undefined, "max-[519px]:hidden"],
          ]}
        />

        <div className="prose mt-1 prose-blockquote:font-normal">
          <p>
            You can subscribe to this calendar so the latest CI events in London
            automatically appear in your calendar app.
          </p>
          <p className="mb-0">
            Choose whether to include events from the rest of the UK:
          </p>
          <div className="ml-7">
            <input
              type="checkbox"
              id="include-rest-of-uk"
              checked={includeRestOfUK}
              onChange={(e) => setIncludeRestOfUK(e.target.checked)}
            />{" "}
            <label htmlFor="include-rest-of-uk">
              Include rest of UK (multi-day intensives and CI festivals only)
            </label>
          </div>
          <p>Then select your calendar app to see instructions:</p>
          <Expandable>
            <Expandable.Summary>
              Google Calendar{" "}
              <img
                src="/google-calendar-icon-24dp.svg"
                width="18"
                height="18"
                className="not-prose relative bottom-[calc(2rem/16)] ml-0.5 inline"
                alt=""
              />
            </Expandable.Summary>
            <p>Select your platform:</p>
            <Expandable>
              <Expandable.Summary>To subscribe on Android</Expandable.Summary>
              <p className="italic">
                If you are signed in to multiple Google Accounts, you’ll need to
                subscribe on a computer instead.
              </p>
              <ol>
                <li>
                  <em>Long-press</em> the following link and select{" "}
                  <em>“Open in new tab”</em> (it won’t work if you just click
                  it):
                  <div className="ml-7">
                    <a href={googleCalendarUrl}>Add to Google Calendar</a>
                  </div>
                </li>
                <li>
                  Now switch to the Google Calendar tab you just opened (e.g. by
                  swiping the address bar leftwards). You should be on the
                  Google Calendar <em>website</em> (not app!).
                </li>
                <li>Accept the prompt it shows to add the calendar.</li>
                <li>Wait up to a minute, for the events to show up.</li>
                <li>
                  Open the Google Calendar app&nbsp;
                  <img
                    src="/google-calendar-icon-24dp.svg"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />
                  .
                </li>
                <li>
                  In the top left, tap Menu{" "}
                  <img
                    src="/android-menu-icon-24dp.png"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />
                  .
                </li>
                <li>
                  Tap Settings{" "}
                  <img
                    src="/android-settings-icon-24dp.png"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />
                  .
                </li>
                <li>
                  Tap “{calendarName}”. If you don’t find the calendar listed,
                  tap “Show more”.
                </li>
                <li>At the top of the page, make sure Sync is on.</li>
              </ol>
              <p>
                Note: It might take some time for your events to show up after
                you turn on sync. (If you still have trouble, try{" "}
                <a href="https://support.google.com/calendar/answer/6261951">
                  Google’s sync troubleshooting tips
                </a>
                .)
              </p>
            </Expandable>
            <Expandable>
              <Expandable.Summary>
                To subscribe on iPhone/iPad
              </Expandable.Summary>
              <ol>
                {/*
                <li>
                  Make sure you have the{" "}
                  <a href="https://apps.apple.com/gb/app/google-calendar-get-organised/id909319292">
                    Google&nbsp;Calendar&nbsp;app
                  </a>
                  &nbsp;
                  <img
                    src="/google-calendar-icon-24dp.svg"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />{" "}
                  installed.
                </li>
                */}
                <li>
                  Click the following link:
                  <div className="ml-7">
                    <a href={googleCalendarUrl}>Add to Google Calendar</a>
                  </div>
                </li>
                <li>
                  {/*
                  It'll open in the browser according to
                  https://support.google.com/calendar/answer/37100?co=GENIE.Platform%3DiOS#:~:text=Google%20Calendar%20opens%20in%20a%20browser
                  Hence making sure the app is installed above is commented out.
                  */}
                  Google Calendar should open. Accept the prompt it shows to add
                  the calendar.
                </li>
              </ol>
              <p>
                You should now see the “{calendarName}” calendar appear in your
                list of calendars on both iOS and web.
              </p>
              <p className="font-bold">
                TODO: Please can someone confirm to John that this works on iOS?
              </p>
            </Expandable>
            <Expandable>
              <Expandable.Summary>
                To subscribe on a computer
              </Expandable.Summary>
              <ol>
                <li>
                  Click the following link:
                  <div className="ml-7">
                    <a href={googleCalendarUrl}>Add to Google Calendar</a>
                  </div>
                </li>
                <li>
                  The Google Calendar website should open, and show a prompt to
                  add the calendar.
                </li>
                <li className="italic">
                  If you are signed in to multiple Google Accounts, check that
                  the profile photo in the top right is the account you want to
                  use. If not, click Cancel on the prompt, switch account by
                  clicking your profile photo, and then the prompt to add the
                  calendar should reappear.
                </li>
                <li>Accept the prompt to add the calendar.</li>
              </ol>
              <p>
                You should now see the “{calendarName}” calendar appear in your
                list of calendars on web.
              </p>
              <p>
                If you also have Android phones/tablets, you’ll additionally
                need to configure each device to sync the calendar before it
                will show up there, by following{" "}
                <a href="https://support.google.com/calendar/answer/6261951#zippy=%2Cconfirm-that-the-correct-calendar-is-synced:~:text=Confirm%20that%20the%20correct%20calendar%20is%20synced">
                  these instructions
                </a>
                , copied here:
              </p>
              <ol start={3}>
                <li>
                  Open the Google Calendar app&nbsp;
                  <img
                    src="/google-calendar-icon-24dp.svg"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />{" "}
                  on your Android device.
                </li>
                <li>
                  In the top left, tap Menu{" "}
                  <img
                    src="/android-menu-icon-24dp.png"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />
                  .
                </li>
                <li>
                  Tap Settings{" "}
                  <img
                    src="/android-settings-icon-24dp.png"
                    width="18"
                    height="18"
                    className="my-0 inline"
                    alt=""
                  />
                  .
                </li>
                <li>
                  Tap “{calendarName}”. If you don’t find the calendar listed,
                  tap “Show more”.
                </li>
                <li>At the top of the page, make sure Sync is on.</li>
              </ol>
              <p>
                Note: It might take some time for your events to show up after
                you turn on sync. (If you still have trouble, try{" "}
                <a href="https://support.google.com/calendar/answer/6261951">
                  Google’s sync troubleshooting tips
                </a>
                .)
              </p>
            </Expandable>
            <Callout type="tip">
              Once added you should be able to easily show/hide the CI Calendar
              London calendar by toggling its checkbox in the left-hand sidebar.
              (Click{" "}
              <img
                src="/android-menu-icon-24dp.png"
                width="18"
                height="18"
                className="my-0 inline"
                alt=""
              />{" "}
              to show the sidebar; on mobile, the calendar might appear under
              “Show more”.)
            </Callout>
          </Expandable>
          <Expandable>
            <Expandable.Summary>
              iOS/macOS Calendar app{" "}
              <img
                src="/apple-icon-24dp.svg"
                width="18"
                height="18"
                className="not-prose relative bottom-[calc(3rem/16)] ml-0.5 inline"
                alt=""
              />
            </Expandable.Summary>
            <ol>
              <li>
                Click the following link:
                <div className="ml-7">
                  <a href={icsWebcalUrl}>Add to calendar</a>
                </div>
              </li>
              <li>Choose iCloud from the Location dropdown, if applicable.</li>
              <li>
                Choose a short interval from the Auto-refresh dropdown, if
                applicable.
              </li>
            </ol>
            <p>
              If you subscribed on iOS, you’ll need to subscribe separately on
              any other Apple devices you use. If you subscribed on macOS and
              chose iCloud from the Location dropdown, it{" "}
              <a href="https://support.apple.com/en-gb/102301">should sync</a>{" "}
              to your other Apple devices.
            </p>
            <Callout type="tip">
              Once added you should be able to easily show/hide the CI Calendar
              London calendar by toggling its checkbox. On iOS this is in the
              Calendars list at the bottom of the screen. On macOS this is in
              the left sidebar.
            </Callout>
          </Expandable>
          <Expandable>
            <Expandable.Summary>
              Microsoft Outlook{" "}
              <img
                src="/outlook-icon-24dp.svg"
                width="18"
                height="18"
                className="not-prose relative bottom-[calc(2rem/16)] ml-1 inline"
                alt=""
              />
            </Expandable.Summary>
            <ol className="lower-alpha-bracket">
              <li>
                If you use MS Office 365, try clicking the following link:
                <div className="ml-7">
                  <a
                    href={`https://outlook.office.com/calendar/0/addfromweb?name=${encodeURIComponent(calendarName)}&url=${encodeURIComponent(icsHttpsUrl)}`}
                  >
                    Add to Outlook calendar
                  </a>
                </div>
              </li>
              <li>
                If you use the free Outlook.com, try clicking the following
                link:
                <div className="ml-7">
                  <a
                    href={`https://outlook.live.com/calendar/0/addfromweb?name=${encodeURIComponent(calendarName)}&url=${encodeURIComponent(icsHttpsUrl)}`}
                  >
                    Add to Outlook.com calendar
                  </a>
                </div>
              </li>
              <li>
                If neither of those work, try clicking the following link:
                <div className="ml-7">
                  <a href={icsWebcalUrl}>Add to calendar</a>
                </div>
              </li>
              <li>
                If that doesn’t work,{" "}
                <a href="https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c">
                  follow your calendar’s instructions
                </a>{" "}
                to <em>subscribe</em> to the following ICS (iCal) URL:
                <div className="ml-7">
                  <a className="break-all" href={icsHttpsUrl}>
                    {icsHttpsUrl}
                  </a>
                </div>
              </li>
            </ol>
          </Expandable>
          <Expandable>
            <Expandable.Summary>Other</Expandable.Summary>
            <ol className="lower-alpha-bracket">
              <li>
                Try clicking the following link:
                <div className="ml-7">
                  <a href={icsWebcalUrl}>Add to calendar</a>
                </div>
              </li>
              <li>
                If that doesn’t work, follow your calendar’s instructions to
                subscribe to the following ICS (iCal) URL:
                <div className="ml-7">
                  <a className="break-all" href={icsHttpsUrl}>
                    {icsHttpsUrl}
                  </a>
                </div>
              </li>
            </ol>
          </Expandable>
          <Callout type="note">
            New/updated events might take several hours to sync to your
            calendar.
          </Callout>
        </div>
      </MaxWidthContainer>
    </>
  );
}
