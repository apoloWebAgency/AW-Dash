import { promises as fs } from 'fs';
import path from 'path';
import { DashboardData } from '@/types/dashboard';

// Simulate a database delay
const SIMULATE_DELAY = 0; // ms

export async function getDashboardData(): Promise<DashboardData> {
    if (SIMULATE_DELAY > 0) {
        await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY));
    }

    // In a real application, this would be a DB query
    // For now, we read from the JSON file
    const dataDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(dataDirectory + '/db.json', 'utf8');

    return JSON.parse(fileContents);
}

// Example of a specific fetcher if we wanted to split queries
export async function getAppointments() {
    const data = await getDashboardData();
    return data.appointments;
}
