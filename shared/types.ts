// Shared types for UCC Care Mental Health Platform

export interface User {
  id: string;
  email: string;
  role: 'student' | 'counselor' | 'admin';
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  email_verified: boolean;
  two_factor_enabled: boolean;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  student_id?: string;
  phone?: string;
  academic_year?: string;
  program?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  preferences: Record<string, any>;
  consent_counseling: boolean;
  consent_data_processing: boolean;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  tracking_id: string;
  student_id?: string;
  counselor_id?: string;
  is_anonymous: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  title?: string;
  description: string;
  contact_preference?: string;
  submitted_at: string;
  assigned_at?: string;
  resolved_at?: string;
  last_update: string;
}

export interface ReportUpdate {
  id: string;
  report_id: string;
  author_id?: string;
  content: string;
  is_private: boolean;
  update_type: string;
  created_at: string;
}

export interface MoodLog {
  id: string;
  student_id: string;
  mood_level: 'very_low' | 'low' | 'neutral' | 'good' | 'very_good';
  notes?: string;
  date: string;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  student_id: string;
  title?: string;
  content: string;
  mood_before?: 'very_low' | 'low' | 'neutral' | 'good' | 'very_good';
  mood_after?: 'very_low' | 'low' | 'neutral' | 'good' | 'very_good';
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  content?: string;
  resource_type: 'article' | 'video' | 'audio' | 'resource';
  category: string;
  tags: string[];
  url?: string;
  duration_minutes?: number;
  difficulty_level?: string;
  view_count: number;
  rating: number;
  is_featured: boolean;
  status: 'published' | 'draft' | 'archived';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CounselorCase {
  id: string;
  counselor_id: string;
  report_id: string;
  assigned_at: string;
  priority_override?: 'low' | 'medium' | 'high' | 'urgent';
  private_notes?: string;
  estimated_sessions?: number;
  is_active: boolean;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  success: boolean;
  user: Omit<User, 'password_hash'>;
  message: string;
}

export interface ReportSubmissionResponse {
  success: boolean;
  trackingId: string;
  message: string;
}

export interface ReportStatusResponse {
  success: boolean;
  report: {
    id: string;
    status: string;
    priority: string;
    submittedAt: string;
    lastUpdate: string;
    counselor: string;
    isAnonymous: boolean;
  };
  updates: Array<{
    id: string;
    timestamp: string;
    type: string;
    message: string;
    author: string;
  }>;
}

export interface ResourcesResponse {
  success: boolean;
  resources: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    category: string;
    tags: string[];
    duration: string;
    rating: number;
    views: number;
    featured: boolean;
    url: string;
    createdBy: string;
  }>;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

// Form types
export interface StudentRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  phone?: string;
  year: string;
  program: string;
  emergencyContact: string;
  emergencyPhone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  consentCounseling: boolean;
}

export interface ReportSubmissionForm {
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  contactPreference?: string;
  isAnonymous: boolean;
  studentId?: string;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}
