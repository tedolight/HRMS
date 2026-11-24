export default function formatCurrency(amount, options = {}) {
  return `ETB ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, ...options }).format(amount)}`;
}
