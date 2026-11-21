import { api } from '../auth/authService';

export async function submitEnquiry(data) {
  try {
    const response = await api.post('/enquiries', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      category: data.category,
      message: data.message,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to submit enquiry.';
    return { success: false, error: message };
  }
}
