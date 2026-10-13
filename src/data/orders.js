// Order data layer — localStorage based (demo-grade, no backend)

const STORAGE_KEY = 'jzh_tours_orders'

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

function generateOrderId() {
  const ts = Date.now()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${ts}-${rand}`
}

export function createOrder(orderData) {
  const orders = loadOrders()
  const order = {
    id: generateOrderId(),
    productId: orderData.productId,
    productTitle: orderData.productTitle,
    productPrice: orderData.productPrice,
    quantity: orderData.quantity,
    totalAmount: orderData.productPrice * orderData.quantity,
    customer: {
      fullName: orderData.fullName,
      email: orderData.email,
      phone: orderData.phone || '',
      passportNumber: orderData.passportNumber,
      nationality: orderData.nationality,
      travelDate: orderData.travelDate,
      specialRequests: orderData.specialRequests || '',
    },
    payment: {
      method: 'credit_card',
      cardLast4: orderData.cardLast4,
      status: 'paid',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  orders.push(order)
  saveOrders(orders)
  return order
}

export function getOrders() {
  return loadOrders()
}

export function getOrderById(id) {
  return loadOrders().find(o => o.id === id)
}

export function getOrdersByEmail(email) {
  return loadOrders().filter(o => o.customer.email.toLowerCase() === email.toLowerCase())
}

export function updateOrderStatus(id, status) {
  const orders = loadOrders()
  const order = orders.find(o => o.id === id)
  if (order) {
    order.status = status
    saveOrders(orders)
  }
  return order
}

export function getOrderStats() {
  const orders = loadOrders()
  const stats = {
    totalRevenue: 0,
    totalOrders: orders.length,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    productCount: {},
  }
  for (const o of orders) {
    if (o.status === 'completed' || o.status === 'confirmed') {
      stats.totalRevenue += o.totalAmount
    }
    if (stats[o.status] !== undefined) stats[o.status]++
    stats.productCount[o.productId] = (stats.productCount[o.productId] || 0) + 1
  }
  stats.topProducts = Object.entries(stats.productCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({ id, count }))
  return stats
}
