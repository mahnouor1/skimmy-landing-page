// Scripted example calls for the walkthrough section.
// Phone numbers use ACMA's reserved example ranges (0491 570 xxx, 5550 xxxx).

export type LogStatus = "Booked" | "Transferred" | "Resolved" | "Missed";

export type PanelItem =
  | { kind: "tag"; label: string }
  | { kind: "lookup"; label: string; doneLabel: string; slots: string[] | null; selected: string | null }
  | { kind: "card"; title: string; rows: [string, string][] }
  | { kind: "check"; label: string; icon: "mail" | "user" | "phone" };

export type LogRow = { name: string; phone: string; status: LogStatus; time: string };

export type PanelOp =
  | { op: "add"; item: PanelItem }
  | { op: "slots"; slots: string[] }
  | { op: "select"; value: string }
  | { op: "log"; row: LogRow };

export type Line = {
  who: "skimmy" | "caller";
  text: string;
  /** Panel changes, in ms after this line starts. */
  panel?: { at: number; do: PanelOp }[];
};

export type Walkthrough = {
  id: string;
  tab: string;
  /** Shorter tab label for small screens. */
  short: string;
  business: string;
  priorLog: LogRow[];
  lines: Line[];
};

export const WALKTHROUGHS: Walkthrough[] = [
  {
    id: "clinic",
    tab: "Healthcare clinic",
    short: "Clinic",
    business: "Greenlife Clinic",
    priorLog: [
      { name: "Tom Nguyen", phone: "0491 570 156", status: "Resolved", time: "9:12 AM" },
      { name: "Mia Clarke", phone: "(03) 5550 1234", status: "Transferred", time: "8:47 AM" },
    ],
    lines: [
      { who: "skimmy", text: "Hello! Thank you for calling Greenlife Clinic. I'm Skimmy, your AI receptionist. How can I help you today?" },
      {
        who: "caller",
        text: "Hi, I'd like to book an appointment with a doctor.",
        panel: [{ at: 150, do: { op: "add", item: { kind: "tag", label: "Intent: Book appointment" } } }],
      },
      { who: "skimmy", text: "Of course! May I know which doctor you'd like to see?" },
      {
        who: "caller",
        text: "A general physician, preferably tomorrow.",
        panel: [
          {
            at: 100,
            do: { op: "add", item: { kind: "lookup", label: "Checking calendar...", doneLabel: "Tomorrow · General physician", slots: null, selected: null } },
          },
          { at: 850, do: { op: "slots", slots: ["10:00 AM", "2:00 PM"] } },
        ],
      },
      { who: "skimmy", text: "Sure! We have appointments available tomorrow at 10 AM and 2 PM. Which one works for you?" },
      { who: "caller", text: "2 PM would be great.", panel: [{ at: 200, do: { op: "select", value: "2:00 PM" } }] },
      { who: "skimmy", text: "Perfect! May I have your full name to book the appointment?" },
      { who: "caller", text: "Sarah Ahmed." },
      {
        who: "skimmy",
        text: "Thank you, Sarah. Your appointment is booked for tomorrow at 2 PM with our general physician. Is there anything else I can help you with?",
        panel: [
          {
            at: 700,
            do: {
              op: "add",
              item: {
                kind: "card",
                title: "Appointment booked",
                rows: [
                  ["Patient", "Sarah Ahmed"],
                  ["With", "General physician"],
                  ["When", "Tomorrow 2:00 PM"],
                ],
              },
            },
          },
          { at: 1700, do: { op: "add", item: { kind: "check", label: "Confirmation email sent", icon: "mail" } } },
          { at: 2600, do: { op: "log", row: { name: "Sarah Ahmed", phone: "0491 570 006", status: "Booked", time: "Just now" } } },
        ],
      },
    ],
  },
  {
    id: "realestate",
    tab: "Real estate agency",
    short: "Real estate",
    business: "Harbourview Realty",
    priorLog: [
      { name: "Liam Walsh", phone: "0491 570 157", status: "Booked", time: "10:03 AM" },
      { name: "Unknown caller", phone: "(02) 5550 7781", status: "Missed", time: "9:40 AM" },
    ],
    lines: [
      { who: "skimmy", text: "Hi, thanks for calling Harbourview Realty. I'm Skimmy. How can I help?" },
      {
        who: "caller",
        text: "Hi, is the three-bedroom on Ocean Street still available?",
        panel: [
          {
            at: 100,
            do: { op: "add", item: { kind: "lookup", label: "Finding listing...", doneLabel: "3 bed · Ocean Street · Inspections", slots: null, selected: null } },
          },
          { at: 800, do: { op: "slots", slots: ["Sat 10:30 AM", "Sat 11:15 AM"] } },
        ],
      },
      { who: "skimmy", text: "Yes, it is! There's an open inspection this Saturday at 10:30 AM or 11:15 AM. Would either suit you?" },
      { who: "caller", text: "11:15 works.", panel: [{ at: 200, do: { op: "select", value: "Sat 11:15 AM" } }] },
      { who: "skimmy", text: "Great. Can I get your name and mobile number?" },
      { who: "caller", text: "James Lee, 0491 570 110." },
      {
        who: "skimmy",
        text: "Thanks, James. You're booked for Saturday at 11:15 AM. I'll email you the details now.",
        panel: [
          {
            at: 600,
            do: {
              op: "add",
              item: {
                kind: "card",
                title: "Inspection booked",
                rows: [
                  ["Buyer", "James Lee"],
                  ["Property", "3 bed, Ocean Street"],
                  ["When", "Saturday 11:15 AM"],
                ],
              },
            },
          },
          { at: 1500, do: { op: "add", item: { kind: "check", label: "Confirmation email sent", icon: "mail" } } },
        ],
      },
      { who: "caller", text: "Could someone call me about the price guide?" },
      {
        who: "skimmy",
        text: "Of course. I've asked the listing agent to call you back today. Anything else?",
        panel: [
          { at: 600, do: { op: "add", item: { kind: "check", label: "Callback sent to listing agent", icon: "user" } } },
          { at: 1500, do: { op: "log", row: { name: "James Lee", phone: "0491 570 110", status: "Booked", time: "Just now" } } },
        ],
      },
    ],
  },
  {
    id: "afterhours",
    tab: "After-hours call",
    short: "After hours",
    business: "Greenlife Clinic",
    priorLog: [
      { name: "Ella Morris", phone: "0491 570 313", status: "Resolved", time: "7:58 PM" },
      { name: "Unknown caller", phone: "(07) 5550 4410", status: "Missed", time: "6:21 PM" },
    ],
    lines: [
      {
        who: "skimmy",
        text: "Hi, you've reached Greenlife Clinic. We're closed right now, but I'm Skimmy and I can still help. What do you need?",
        panel: [{ at: 100, do: { op: "add", item: { kind: "tag", label: "After hours · 9:42 PM" } } }],
      },
      { who: "caller", text: "I need to move my appointment tomorrow morning." },
      { who: "skimmy", text: "No problem. Can I have your full name?" },
      {
        who: "caller",
        text: "Priya Nair.",
        panel: [
          {
            at: 100,
            do: { op: "add", item: { kind: "lookup", label: "Finding booking...", doneLabel: "Priya Nair · Tomorrow 9:00 AM · Free slots", slots: null, selected: null } },
          },
          { at: 850, do: { op: "slots", slots: ["Thu 9:00 AM", "Thu 3:30 PM"] } },
        ],
      },
      { who: "skimmy", text: "Thanks, Priya. I can see your 9 AM booking tomorrow. I can move you to Thursday at 9 AM or 3:30 PM. Which suits?" },
      { who: "caller", text: "Thursday at 3:30, please.", panel: [{ at: 200, do: { op: "select", value: "Thu 3:30 PM" } }] },
      {
        who: "skimmy",
        text: "Done. You're now booked for Thursday at 3:30 PM, and I've emailed you the new time. Anything else?",
        panel: [
          {
            at: 500,
            do: {
              op: "add",
              item: {
                kind: "card",
                title: "Appointment moved",
                rows: [
                  ["Patient", "Priya Nair"],
                  ["From", "Tomorrow 9:00 AM"],
                  ["To", "Thursday 3:30 PM"],
                ],
              },
            },
          },
          { at: 1400, do: { op: "add", item: { kind: "check", label: "Confirmation email sent", icon: "mail" } } },
        ],
      },
      { who: "caller", text: "No, that's all. Thanks!" },
      {
        who: "skimmy",
        text: "You're welcome, Priya. Have a good night!",
        panel: [{ at: 500, do: { op: "log", row: { name: "Priya Nair", phone: "0491 570 737", status: "Booked", time: "9:43 PM" } } }],
      },
    ],
  },
];
