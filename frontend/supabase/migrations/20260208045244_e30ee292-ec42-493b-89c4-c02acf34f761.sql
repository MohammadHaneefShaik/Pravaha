-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW q22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222219*-EL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile_number TEXT NOT NULL,
  college_name TEXT NOT NULL,
  department TEXT NOT NULL,
  event_name TEXT NOT NULL,
  registration_status TEXT NOT NULL DEFAULT 'pending' CHECK (registration_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Public can create registrations
CREATE POLICY "Anyone can create registrations"
ON public.registrations FOR INSERT
WITH CHECK (true);

-- Users can view their own registration by email
CREATE POLICY "Users can view their own registration"
ON public.registrations FOR SELECT
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Admins can view all registrations
CREATE POLICY "Admins can view all registrations"
ON public.registrations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Admins can update registrations
CREATE POLICY "Admins can update registrations"
ON public.registrations FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Admins can delete registrations
CREATE POLICY "Admins can delete registrations"
ON public.registrations FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Create event settings table
CREATE TABLE public.event_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registrations_enabled BOOLEAN NOT NULL DEFAULT true,
  event_name TEXT NOT NULL DEFAULT 'PRAVAHA-2K26',
  event_date TEXT NOT NULL DEFAULT 'April 12-13, 2026',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on event_settings
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view event settings
CREATE POLICY "Anyone can view event settings"
ON public.event_settings FOR SELECT
USING (true);

-- Only admins can update event settings
CREATE POLICY "Admins can update event settings"
ON public.event_settings FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Insert default event settings
INSERT INTO public.event_settings (registrations_enabled, event_name, event_date)
VALUES (true, 'PRAVAHA-2K26', 'April 12-13, 2026');

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at
BEFORE UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_settings_updated_at
BEFORE UPDATE ON public.event_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();