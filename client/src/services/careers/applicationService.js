import { api } from '../auth/authService';

export async function submitApplication(data) {
  try {
    const isFormData = data instanceof FormData;
    const config = isFormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};

    const response = await api.post('/applications', data, config);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to submit application.';
    return { success: false, error: message };
  }
}

export async function trackApplication(refNumber) {
  try {
    const { data } = await api.get(`/applications/track/${refNumber}`);
    return { success: true, data: data.application || data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to track application.';
    return { success: false, error: message };
  }
}
