
const ordersContainer = document.querySelector("#orders-container");

const statuses = [
  "Order Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

function renderOrders() {
  const orders = getOrders();

  if (!orders.length) {
    ordersContainer.innerHTML = `
      <div class="bg-white border rounded-xl p-8 text-center">
        <h2 class="text-xl font-bold mb-2">No orders yet</h2>
        <p class="text-slate-500 mb-5">
          Your placed orders will appear here.
        </p>
        <a href="index.html" class="text-teal-700 font-semibold">
          Start Shopping
        </a>
      </div>
    `;
    return;
  }

  ordersContainer.innerHTML = orders.map(order => {
    const currentStatus = Number(order.statusIndex) || 0;

    const itemsHTML = order.items.map(item => `
      <div class="flex items-center gap-4 py-3 border-b">
        <img src="${item.thumbnail}"
          alt="${item.title}"
          class="w-16 h-16 object-contain">

        <div class="flex-1">
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-sm text-slate-500">
            Quantity: ${item.quantity}
          </p>
        </div>

        <p class="font-semibold">
          ₹${(item.price * item.quantity * 96.29).toFixed(2)}
        </p>
      </div>
    `).join("");

    const timelineHTML = statuses.map((status, index) => {
      const completed = index <= currentStatus;

      return `
        <div class="flex gap-4 relative pb-6">
          <div class="w-7 h-7 shrink-0 rounded-full flex items-center
            justify-center text-sm font-bold
            ${completed
              ? "bg-teal-700 text-white"
              : "bg-slate-200 text-slate-500"}">
            ${completed ? "✓" : index + 1}
          </div>

          <div>
            <p class="font-semibold ${
              completed ? "text-teal-800" : "text-slate-400"
            }">
              ${status}
            </p>
            <p class="text-sm text-slate-500">
              ${index === currentStatus
                ? "Current order status"
                : index < currentStatus
                  ? "Step completed"
                  : "Upcoming"}
            </p>
          </div>
        </div>
      `;
    }).join("");

    return `
      <section class="bg-white border border-slate-200
        rounded-xl p-5 sm:p-7">

        <div class="flex flex-wrap justify-between gap-3 mb-5">
          <div>
            <p class="text-sm text-slate-500">Order ID</p>
            <h2 class="font-bold text-lg">${order.id}</h2>
          </div>

          <div>
            <p class="text-sm text-slate-500">Order Date</p>
            <p class="font-medium">
              ${new Date(order.date).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        <div class="bg-teal-50 rounded-lg p-4 mb-6">
          <p class="text-sm text-teal-800">Current Status</p>
          <h3 class="text-xl font-bold text-teal-800">
            ${statuses[currentStatus] || statuses[0]}
          </h3>
        </div>

        <h3 class="font-bold text-lg mb-3">Products Ordered</h3>
        ${itemsHTML}

        <div class="flex justify-between py-5 border-b mb-6">
          <span class="font-semibold">Total Amount</span>
          <span class="text-xl font-bold text-teal-700">
            ₹${Number(order.total).toFixed(2)}
          </span>
        </div>

        <h3 class="text-lg font-bold mb-5">Delivery Progress</h3>
        <div>${timelineHTML}</div>
      </section>
    `;
  }).join("");
}

renderOrders();
