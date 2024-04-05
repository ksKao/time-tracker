import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Task } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
	if (typeof date === "string") {
		date = new Date(date);
	}

	// Get day and time components
	const day = date.getDate().toString().padStart(2, "0");
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");

	// Array of month abbreviations
	const monthAbbreviations = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Get month abbreviation based on month index
	const month = monthAbbreviations[date.getMonth()];

	// Construct the formatted string
	const formattedDate = `${day}-${month} ${hour}:${minute}`;

	return formattedDate;
}

export function calculateTotalTime(task: Task) {
	let hours = 0,
		minutes = 0;

	for (const time of task.times) {
		if (!time.end) continue;

		const start = new Date(time.start);
		const end = new Date(time.end);

		const diff = end.getTime() - start.getTime();

		// Convert milliseconds to hours
		hours += Math.floor(diff / 3600000);

		// Get the remainder after dividing by the number of milliseconds in an hour
		const remainder = diff % 3600000;

		// Convert the remainder to minutes
		minutes += Math.round(remainder / 60000);

		if (time.break) hours--;
	}

	if (!hours && !minutes) return undefined;

	// Add this here to prevent minute from overflowing
	hours += Math.floor(minutes / 60);
	minutes = minutes % 60;

	return {
		hours,
		minutes,
	};
}
