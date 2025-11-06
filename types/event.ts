export interface Event {
  id: string;
  program_type: string;
  program_id: string;
  program_name: string;
  program_photo_url?: string; // Photo URL from program
  location_id: string;
  location_name: string;
  start_time: string; // ISO string
  end_time: string | null; // ISO string or null
  created_by: string;
  updated_by: string;
  description?: string; // <-- Make sure this is here

}
