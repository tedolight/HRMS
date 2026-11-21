import { api } from '../auth/authService';

export async function getNews(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));
    if (filters.search) params.append('search', filters.search);

    const { data } = await api.get(`/news?${params.toString()}`);
    return { success: true, data: data.news || data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to fetch news articles.';
    return { success: false, error: message };
  }
}

export async function getNewsById(id) {
  try {
    const { data } = await api.get(`/news/${id}`);
    return { success: true, data: data.article || data };
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to fetch news article.';
    return { success: false, error: message };
  }
}
