import api from './api';

const orderService = {
  // Customer endpoints
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },

  getMyOrders: () => {
    return api.get('/orders/my-orders');
  },

  getOrderDetails: (id) => {
    return api.get(`/orders/${id}`);
  },

  // Admin/Employee endpoints
  getAllOrders: () => {
    return api.get('/orders/all');
  },

  updateOrderStatus: (id, status) => {
    return api.put(`/orders/${id}/status`, null, { params: { status } });
  },

  getOrdersByStatus: (status) => {
    return api.get(`/orders/status/${status}`);
  },

  cancelOrder: (id) => {
    return api.patch(`/orders/${id}/cancel`);
  },

  exportInvoice: (id) => {
    return api.get(`/orders/${id}/invoice`, {
      responseType: 'blob'
    });
  },

  // Revenue statistics endpoints
  getMonthlyRevenue: (yearMonth) => {
    return api.get('/orders/revenue/monthly', {
      params: { yearMonth }
    });
  },

  getQuarterlyRevenue: (year, quarter) => {
    return api.get('/orders/revenue/quarterly', {
      params: { year, quarter }
    });
  },

  getCustomRangeRevenue: (startDate, endDate) => {
    return api.get('/orders/revenue/custom', {
      params: { startDate, endDate }
    });
  }
};

export default orderService;