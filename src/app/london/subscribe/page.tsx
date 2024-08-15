/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CI Calendar UK | London | Subscribe",
  description: "Lets you subscribe to the London calendar feed",
};

export default function Page() {
  // There isn't good documentation on how to build subscribe to ICS links for
  // the major calendar apps. This was gathered from many sources, including:
  // https://stackoverflow.com/questions/75119105/how-to-create-a-subscribtion-link-to-ics-webcal-calendars

  const calendarName = "CI Calendar London (merged)";
  // This is the "Get shareable link" (which is accessible by anyone whilst
  // "Make available to public" remains ticked; if that were unticked only
  // people under "Share with specific people or groups" would have access).
  const googleCalendarUrl =
    "https://calendar.google.com/calendar?cid=NDUzYmRhNzgyOWZiMWIwMThhZjYyZGYyNmYyNTNlNjI2N2ZlOTZlNDY3ZDM0ZTZhN2Q0ODBiMmVlMTA4YjU0NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";
  // This is the "Public address in iCal format".
  const icsHttpsUrl =
    "https://calendar.google.com/calendar/ical/453bda7829fb1b018af62df26f253e6267fe96e467d34e6a7d480b2ee108b544%40group.calendar.google.com/public/basic.ics";
  const icsWebcalUrl = icsHttpsUrl.replace("https://", "webcal://");
  return (
    <>
      <div className="m-auto max-w-prose">
        <NavBar
          breadcrumb={[
            ["London", "/london"],
            // There isn't room to append Subscribe on mobile.
            ["Subscribe", undefined, "max-[519px]:hidden"],
          ]}
        />

        <div className="mt-3 p-1">
          <p>
            You can subscribe to this calendar so the latest CI events in London
            automatically appear in your calendar app.
          </p>
          <p>Select your calendar app to see instructions:</p>
          <details className="expandable">
            <summary>Google Calendar</summary>
            <p className="italic">
              If you’re viewing this page on a desktop/laptop computer but you
              also use Google Calendar on an Android phone, it’s easier to
              subscribe from the Android phone. Send a link to{" "}
              <Link href="#">the current page</Link> to your phone and continue
              in your phone’s browser.
            </p>
            <p>Select your platform:</p>
            <details className="expandable">
              <summary>To subscribe on Android</summary>
              <ol>
                <li>
                  Make sure you have the{" "}
                  <a href="https://play.google.com/store/apps/details?id=com.google.android.calendar">
                    Google&nbsp;Calendar&nbsp;app
                  </a>
                  &nbsp;
                  <img
                    src="/google-calendar-icon-24dp.svg"
                    width="18"
                    height="18"
                    className="inline"
                    alt=""
                  />{" "}
                  installed.
                </li>
                <li>
                  Click the following link:
                  <blockquote>
                    <a className="font-bold" href={googleCalendarUrl}>
                      Add to Google Calendar
                    </a>
                  </blockquote>
                </li>
                <li>
                  The Google Calendar app should open. Accept the prompt it
                  shows to add the calendar.
                </li>
              </ol>
              <p>
                You should now see the “{calendarName}” calendar appear in your
                list of calendars on both Android and web.
              </p>
            </details>
            <details className="expandable">
              <summary>To subscribe on iPhone/iPad</summary>
              <ol>
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
                    className="inline"
                    alt=""
                  />{" "}
                  installed.
                </li>
                <li>
                  Click the following link:
                  <blockquote>
                    <a className="font-bold" href={googleCalendarUrl}>
                      Add to Google Calendar
                    </a>
                  </blockquote>
                </li>
                <li>
                  {/*
                  It'll open in the browser according to
                  https://support.google.com/calendar/answer/37100?co=GENIE.Platform%3DiOS#:~:text=Google%20Calendar%20opens%20in%20a%20browser
                  So perhaps making sure the app is installed above is unnecessary?
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
            </details>
            <details className="expandable">
              <summary>To subscribe on a computer</summary>
              <ol>
                <li>
                  Click the following link:
                  <blockquote>
                    <a className="font-bold" href={googleCalendarUrl}>
                      Add to Google Calendar
                    </a>
                  </blockquote>
                </li>
                <li>
                  The Google Calendar website should open. Accept the prompt it
                  shows to add the calendar.
                </li>
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
                    className="inline"
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
                    className="inline"
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
                    className="inline"
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
            </details>
            <p className="tip-callout">
              Once added you should be able to easily show/hide the CI Calendar
              London calendar by toggling its checkbox in the left-hand sidebar.
              (Click{" "}
              <img
                src="/android-menu-icon-24dp.png"
                width="18"
                height="18"
                className="inline"
                alt=""
              />{" "}
              to show the sidebar; on mobile, the calendar might appear under
              “Show more”.)
            </p>
          </details>
          <details className="expandable">
            <summary>Apple Calendar</summary>
            <p className="italic">
              If you’re viewing this page on iOS and you also use Apple Calendar
              on macOS,{" "}
              <a href="https://support.apple.com/en-gb/102301#:~:text=Before%20you%20can%20see%20a%20calendar%20subscription%20on%20all%20your%20devices%2C%20first%20subscribe%20to%20the%20calendar%20on%20your%20Mac.%20If%20you%20subscribe%20to%20the%20calendar%20on%20your%20iOS%20device%2C%20iCloud%20won%27t%20update%20it%20to%20your%20other%20devices.">
                it’s better to subscribe from your Mac
              </a>
              . Send a link to <Link href="#">the current page</Link> to your
              Mac and continue in its browser.
            </p>
            <ol>
              <li>
                Click the following link:
                <blockquote>
                  <a className="font-bold" href={icsWebcalUrl}>
                    Add to calendar
                  </a>
                </blockquote>
              </li>
              <li>Choose iCloud from the Location menu, if applicable.</li>
            </ol>
            <p className="font-bold">
              TODO: Please can someone confirm to John that this works on iOS
              (and that this fails to sync to macOS)?
            </p>
            <p className="font-bold">
              TODO: Please can someone confirm to John that this works on macOS
              (and syncs to iOS)?
            </p>
            {/*
            If clicking the link doesn't work, copy-pasting the ICS URL into the New Calendar Subscription menu might work:
            https://support.apple.com/en-us/102301. And that page has the ominous warning:
            > Before you can see a calendar subscription on all your devices, subscribe to the calendar on your Mac first.
            > If you subscribe to the calendar on your iOS device, iCloud won't update it to your other devices.
            */}
            <p className="note-callout">
              New/updated events might take several hours to sync to your
              calendar. On macOS, Apple Calendar lets you choose the
              “Auto-refresh” frequency for each calendar you add.
            </p>
          </details>
          <details className="expandable">
            <summary>Microsoft Outlook</summary>
            <ol className="lower-alpha-bracket">
              <li>
                If you use MS Office 365, try clicking the following link:
                <blockquote>
                  <a
                    className="font-bold"
                    href={`https://outlook.office.com/calendar/0/addfromweb?name=${encodeURIComponent(calendarName)}&url=${encodeURIComponent(icsHttpsUrl)}`}
                  >
                    Add to Outlook calendar
                  </a>
                </blockquote>
              </li>
              <li>
                If you use the free Outlook.com, try clicking the following
                link:
                <blockquote>
                  <a
                    className="font-bold"
                    href={`https://outlook.live.com/calendar/0/addfromweb?name=${encodeURIComponent(calendarName)}&url=${encodeURIComponent(icsHttpsUrl)}`}
                  >
                    Add to Outlook.com calendar
                  </a>
                </blockquote>
              </li>
              <li>
                If neither of those work, try clicking the following link:
                <blockquote>
                  <a className="font-bold" href={icsWebcalUrl}>
                    Add to calendar
                  </a>
                </blockquote>
              </li>
              <li>
                If that doesn’t work,{" "}
                <a href="https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c">
                  follow your calendar’s instructions
                </a>{" "}
                to <em>subscribe</em> to the following ICS (iCal) URL:
                <blockquote>
                  <a className="break-all" href={icsHttpsUrl}>
                    {icsHttpsUrl}
                  </a>
                </blockquote>
              </li>
            </ol>
            <p className="note-callout">
              New/updated events might take several hours to sync to your
              calendar.
            </p>
          </details>
          <details className="expandable">
            <summary>Other</summary>
            <ol className="lower-alpha-bracket">
              <li>
                Try clicking the following link:
                <blockquote>
                  <a className="font-bold" href={icsWebcalUrl}>
                    Add to calendar
                  </a>
                </blockquote>
              </li>
              <li>
                If that doesn’t work, follow your calendar’s instructions to
                subscribe to the following ICS (iCal) URL:
                <blockquote>
                  <a className="break-all" href={icsHttpsUrl}>
                    {icsHttpsUrl}
                  </a>
                </blockquote>
              </li>
            </ol>
            <p className="note-callout">
              New/updated events might take several hours to sync to your
              calendar.
            </p>
          </details>
        </div>
      </div>
    </>
  );
}
