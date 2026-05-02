import { Log } from './logging_middleware';
import { ACCESS_TOKEN } from './config';

interface Notification {
  ID: string;
  Type: "Result" | "Placement" | "Event";
  Message: string;
  Timestamp: string;
}

const NOTIFICATIONS_API_URL = "http://20.207.122.201/evaluation-service/notifications";

async function runStage1() {
  await Log("frontend", "info", "api", "Starting Stage 1 algorithm");

  try {
    const response = await fetch(NOTIFICATIONS_API_URL, {
      headers: { "Authorization": `Bearer ${ACCESS_TOKEN}` }
    });

    if (!response.ok) {
      const txt = await response.text();
      process.stderr.write(`DEBUG: API failed with ${response.status}: ${txt}\n`);
      await Log("frontend", "error", "api", `Failed to fetch notifications: ${response.status}`);
      return;
    }

    const data: any = await response.json();
    const notifications: Notification[] = data.notifications || [];
    
    await Log("frontend", "info", "api", `Fetched ${notifications.length} notifications`);

    notifications.sort((a, b) => {
      const weight = {
        "Placement": 3,
        "Result": 2,
        "Event": 1
      };

      const weightA = weight[a.Type] || 0;
      const weightB = weight[b.Type] || 0;

      if (weightA !== weightB) {
        return weightB - weightA;
      }

      const timeA = new Date(a.Timestamp).getTime();
      const timeB = new Date(b.Timestamp).getTime();

      return timeB - timeA;
    });

    const top10 = notifications.slice(0, 10);
    
    await Log("frontend", "info", "component", "Successfully sorted and extracted top 10 notifications");

    process.stdout.write(JSON.stringify(top10, null, 2) + "\n");

  } catch (error) {
    process.stderr.write("DEBUG ERROR: " + error + "\n");
    await Log("frontend", "fatal", "api", `Exception in Stage 1: ${error}`);
  }
}

runStage1();
