import { api } from '../auth/authService';

export async function getJobs(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.department) params.append('department', filters.department);
    if (filters.type) params.append('type', filters.type);
    if (filters.level) params.append('level', filters.level);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const { data } = await api.get(`/jobs?${params.toString()}`);
    return { success: true, data: data.jobs || data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to fetch job listings.';
    return { success: false, error: message };
  }
}

export async function getJobById(id) {
  try {
    const { data } = await api.get(`/jobs/${id}`);
    return { success: true, data: data.job || data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to fetch job details.';
    return { success: false, error: message };
  }
}

export async function searchJobs(query) {
  try {
    const { data } = await api.get(`/jobs/search`, {
      params: { q: query },
    });
    return { success: true, data: data.jobs || data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Job search failed.';
    return { success: false, error: message };
  }
}
