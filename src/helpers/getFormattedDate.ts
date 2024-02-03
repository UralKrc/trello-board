export function getFormattedDate(): string {
  const timestamp = new Date();
  return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
  }).format(timestamp);
}