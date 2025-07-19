import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * JWT 토큰을 포함한 API 요청을 보내는 헬퍼 함수
 * @param endpoint - API 엔드포인트
 * @param options - fetch 옵션
 * @returns Promise<Response>
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  // Supabase에서 현재 세션 가져오기
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // JWT 토큰이 있으면 Authorization 헤더에 추가
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  return fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });
};

/**
 * GET 요청 헬퍼
 * @param endpoint - API 엔드포인트
 * @returns Promise<any>
 */
export const apiGet = async (endpoint: string): Promise<any> => {
  const response = await apiRequest(endpoint, { method: 'GET' });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * POST 요청 헬퍼
 * @param endpoint - API 엔드포인트
 * @param data - 요청 데이터
 * @returns Promise<any>
 */
export const apiPost = async (endpoint: string, data?: any): Promise<any> => {
  const response = await apiRequest(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * PUT 요청 헬퍼
 * @param endpoint - API 엔드포인트
 * @param data - 요청 데이터
 * @returns Promise<any>
 */
export const apiPut = async (endpoint: string, data?: any): Promise<any> => {
  const response = await apiRequest(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * DELETE 요청 헬퍼
 * @param endpoint - API 엔드포인트
 * @returns Promise<any>
 */
export const apiDelete = async (endpoint: string): Promise<any> => {
  const response = await apiRequest(endpoint, { method: 'DELETE' });
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  
  return response.json();
};
