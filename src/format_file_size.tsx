
const lookup: Record<string, [number, string[]]> = {
	"SI": [1000, ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']],
	"SI-Full": [1000, ['kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'petabytes', 'exabytes', 'zettabytes', 'yottabytes']],
	"IEC": [1024, ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']]
}
/**
 * Format bytes as human-readable text.
 * Derived from answer by mpen here https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 * 
 * @param bytes {number=} Number of bytes.
 * @param units {"SI"|"SI-Full"|"IEC"} SI is in multiples of 1000. IEC is in multiples of 1024.
 * @param decimal_places {number} decimal places to display.
 * 
 * @return Formatted string.
 */
export default function format_file_size(bytes: number, units: "SI" | "IEC" | "SI-Full" = "SI", decimal_places = 1) {
	const [thresh, units_to_use] = lookup[units];
	if (Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}
	let u = -1;
	const r = 10 ** decimal_places;
	do {
		bytes /= thresh;
		++u;
	} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units_to_use.length - 1);
	return bytes.toFixed(decimal_places) + ' ' + units_to_use[u];
}