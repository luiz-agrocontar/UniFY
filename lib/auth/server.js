import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from '@/lib/auth/constants';
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase/server';

export async function authenticateUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const invalidCredentialsMessage = 'Erro ao validar suas credenciais. Tente novamente.';

  if (normalizedEmail === DEFAULT_USER_EMAIL && password === DEFAULT_USER_PASSWORD) {
    return {
      success: true,
      user: {
        email: DEFAULT_USER_EMAIL,
        source: 'demo',
      },
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: invalidCredentialsMessage,
    };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error || !data.user) {
    return {
      success: false,
      error: invalidCredentialsMessage,
    };
  }

  return {
    success: true,
    user: {
      email: data.user.email ?? normalizedEmail,
      source: 'supabase',
    },
  };
}
