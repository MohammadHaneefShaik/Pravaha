-- Update the registration insert policy to add basic validation
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can create registrations" ON public.registrations;

-- Create a more specific policy that still allows public inserts
-- but only if registrations are enabled (can be checked via application logic)
CREATE POLICY "Public can create registrations"
ON public.registrations FOR INSERT
WITH CHECK (
  -- Allow insert only if all required fields are provided
  full_name IS NOT NULL AND
  email IS NOT NULL AND
  mobile_number IS NOT NULL AND
  college_name IS NOT NULL AND
  department IS NOT NULL AND
  event_name IS NOT NULL
);