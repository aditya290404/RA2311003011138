import { ACCESS_TOKEN } from '../../../config';
import { Log } from '../../../logging_middleware';

const NOTIFICATIONS_API_URL = "/evaluation-service/notifications";

export interface Notification {
  ID: string;
  Type: "Result" | "Placement" | "Event";
  Message: string;
  Timestamp: string;
}

export async function fetchNotifications(limit?: number, page?: number, type?: string): Promise<Notification[]> {
  try {
    let url = NOTIFICATIONS_API_URL;
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());
    if (type && type !== "All") params.append("notification_type", type);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      await Log("frontend", "error", "api", `Failed to fetch from ${url}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    await Log("frontend", "info", "api", `Successfully fetched ${data.notifications?.length || 0} notifications`);
    return data.notifications || [];
  } catch (error) {
    await Log("frontend", "fatal", "api", `Error in fetchNotifications: ${error}`);
    return [];
  }
}
