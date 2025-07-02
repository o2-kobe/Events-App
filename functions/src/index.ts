import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";
// import { defineSecret, defineString } from "firebase-functions/params";
import nodemailer, { Transporter } from "nodemailer";

admin.initializeApp();
const db = admin.firestore();

// skip Params/Secrets entirely
const SMTP_EMAIL = "eventgctu@gmail.com";
const SMTP_PASS = "qngk dozm hzso czpb"; // DON'T commit real creds!
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;

// --- helper ---
function getTransporter(): Transporter {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: { user: SMTP_EMAIL, pass: SMTP_PASS },
  });
}

async function sendEmail(to: string, subject: string, text: string) {
  const transporter = getTransporter(); // create at runtime
  await transporter.sendMail({
    from: `"eventGCTU" <${SMTP_EMAIL}>`,
    to,
    subject,
    text,
  });
}

// Fire on new event creation
export const notifyAllUsersNewEvent = onDocumentCreated(
  { document: "events/{eventID}", region: "europe-west1" },
  async (event: any) => {
    const snap = event.data;
    if (!snap) return;

    const ev = snap.data();
    if (!ev) return;

    // Fetch every user
    const usersSnap = await db.collection("users").get();

    // Prepare email content
    const subject = `New Event: ${ev.name}`;
    const body = [
      `Hello,`,
      ``,
      `A new event has just been added to eventGCTU:`,
      `\t• Title: ${ev.name}`,
      `\t• When: ${new Date(ev.startDateTime).toLocaleString("en-GB", {
        timeZone: "Africa/Accra",
      })}`,
      `\t• Where: ${ev.location}`,
      ``,
      `View event at https://events-app-laud-tettehs-projects.vercel.app/events/${ev.id} to learn more and set your reminders!`,
      ``,
      `— The eventGCTU Team`,
    ].join("\n");

    // Send to all users in parallel
    await Promise.all(
      usersSnap.docs.map((doc) => {
        const user = doc.data();
        return sendEmail(
          user.email,
          subject,
          `Hi ${user.username},\n\n${body}`
        );
      })
    );
  }
);

// ---------------- Reminder Helpers ----------------
interface ReminderDoc {
  userID: string;
  eventID: string;
}

async function fetchEventAndUser(eventID: string, userID: string) {
  const [eventSnap, userSnap] = await Promise.all([
    db.collection("events").doc(eventID).get(),
    db.collection("users").doc(userID).get(),
  ]);
  return {
    event: eventSnap.exists ? eventSnap.data() : null,
    user: userSnap.exists ? userSnap.data() : null,
  } as { event: any | null; user: any | null };
}

function isSameDay(dateA: Date, dateB: Date) {
  return (
    dateA.getUTCFullYear() === dateB.getUTCFullYear() &&
    dateA.getUTCMonth() === dateB.getUTCMonth() &&
    dateA.getUTCDate() === dateB.getUTCDate()
  );
}

// Scheduled: 6:00 GMT daily — remind day before
export const remindUsersDayBefore = onSchedule(
  { schedule: "0 6 * * *", timeZone: "Etc/UTC", region: "europe-west1" },
  async () => {
    const now = new Date();
    const tomorrow = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    );

    const remindersSnap = await db.collection("reminders").get();
    const tasks: Promise<void>[] = [];
    remindersSnap.forEach((reminderDoc) => {
      const { userID, eventID } = reminderDoc.data() as ReminderDoc;
      tasks.push(
        (async () => {
          const { event, user } = await fetchEventAndUser(eventID, userID);
          if (!event || !user) return;
          const eventDate = new Date(event.startDateTime);
          if (!isSameDay(eventDate, tomorrow)) return;

          const subject = `Reminder: ${event.name} is tomorrow!`;
          const body = `Hi ${
            user.username
          },\n\nThis is a friendly reminder that the event "${
            event.name
          }" takes place tomorrow (${eventDate.toUTCString()}) at ${
            event.location
          }.\n\nView event at https://events-app-laud-tettehs-projects.vercel.app/events/${
            event.id
          }\n\nRegards,\neventGCTU Team`;
          await sendEmail(user.email, subject, body);
        })()
      );
    });

    await Promise.all(tasks);
  }
);

// Scheduled: 6:00 GMT daily — remind day of event
export const remindUsersDayOf = onSchedule(
  { schedule: "0 6 * * *", timeZone: "Etc/UTC", region: "europe-west1" },
  async () => {
    const today = new Date();
    const remindersSnap = await db.collection("reminders").get();
    const tasks: Promise<void>[] = [];
    remindersSnap.forEach((reminderDoc) => {
      const { userID, eventID } = reminderDoc.data() as ReminderDoc;
      tasks.push(
        (async () => {
          const { event, user } = await fetchEventAndUser(eventID, userID);
          if (!event || !user) return;
          const eventDate = new Date(event.startDateTime);
          if (!isSameDay(eventDate, today)) return;

          const subject = `Today: ${event.name}`;
          const body = `Hi ${user.username},\n\nYour event "${event.name}" is happening today at ${event.location}.\n\nView event at https://events-app-laud-tettehs-projects.vercel.app/events/${event.id}\n\nSee you there!\n\n— eventGCTU Team`;
          await sendEmail(user.email, subject, body);
        })()
      );
    });

    await Promise.all(tasks);
  }
);
