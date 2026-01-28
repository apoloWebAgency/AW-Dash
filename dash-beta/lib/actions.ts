"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { MetricData } from '@/types/metrics';

// Simulate DB delay for realism
const DELAY_MS = 600;

export async function getMetricData(): Promise<MetricData[]> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

    const dataDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(dataDirectory + '/metrics.json', 'utf8');

    return JSON.parse(fileContents);
}
