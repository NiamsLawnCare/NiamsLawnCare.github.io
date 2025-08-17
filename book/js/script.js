  // Toggle service details when clicking on a service card
       function toggleService(card) {
    // Close all other service cards
    document.querySelectorAll('.service-card').forEach(item => {
        if (item !== card && !card.contains(event.target)) {
            item.classList.remove('active');
        }
    });
    
    // Toggle the clicked card only if click wasn't inside an input
    if (!event.target.closest('input, select, textarea, button')) {
        card.classList.toggle('active');
    }
}
        
        // Submit order form
        function submitOrder(event, serviceType) {
            event.preventDefault();
            
            const form = event.target;
            const formId = form.id;
            const confirmationId = formId.replace('-form', '-confirmation');
            
            // Get form data
            const formData = new FormData(form);
            const orderDetails = {};
            formData.forEach((value, key) => {
                orderDetails[key] = value;
            });
            
            // Add service type and timestamp
            orderDetails.serviceType = serviceType;
            orderDetails.timestamp = new Date().toISOString();
            
            // In a real implementation, you would send this data to a server
            // For now, we'll store it in localStorage and log it
            saveOrder(orderDetails);
            
            // Show confirmation message
            document.getElementById(confirmationId).style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Scroll to confirmation
            document.getElementById(confirmationId).scrollIntoView({ behavior: 'smooth' });
        }
        
        // Save order to localStorage (simplified version - in real life you'd use a server)
        function saveOrder(order) {
            // Get existing orders or initialize empty array
            const orders = JSON.parse(localStorage.getItem('niamsLawnCareOrders')) || [];
            
            // Add new order
            orders.push(order);
            
            // Save back to localStorage
            localStorage.setItem('niamsLawnCareOrders', JSON.stringify(orders));
            
            // Log to console (for demo purposes)
            console.log('New order received:', order);
            console.log('All orders:', orders);
            
            // In a real implementation, you would send this to your email or a database
            // This is just a placeholder to show the concept
            sendOrderNotification(order);
        }
        
        // Simulate sending a notification (in a real app, this would email you or use a service like Twilio)
        function sendOrderNotification(order) {
            const message = `New Lawn Care Order:
Service: ${order.serviceType}
Name: ${order['weeds-name'] || order['cleanup-name'] || order['mowing-name']}
Phone: ${order['weeds-phone'] || order['cleanup-phone'] || order['mowing-phone']}
Address: ${order['weeds-address'] || order['cleanup-address'] || order['mowing-address']}
Date: ${order['weeds-date'] || order['cleanup-date'] || order['mowing-date']}
Time: ${order['weeds-time'] || order['cleanup-time'] || order['mowing-time']}
            
Details: ${JSON.stringify(order, null, 2)}`;
            
            console.log('Notification would be sent with this content:\n', message);
            alert("New order notification would be sent here. Check console for details.");
        }
        
        // Set minimum date to today on date inputs
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date().toISOString().split('T')[0];
            document.querySelectorAll('input[type="date"]').forEach(input => {
                input.min = today;
            });
        });
        // Calculate and display totals when options change
function calculateTotal() {
    // Lawn Mowing
    const mowingSize = document.querySelector('[name="size"]')?.value;
    if (mowingSize) {
        const mowingPrice = mowingSize.includes('Small') ? 5 : 
                          mowingSize.includes('Medium') ? 10 : 15;
        document.getElementById('mowing-total').textContent = mowingPrice;
    }

    // Yard Cleanup
    const cleanupSize = document.querySelectorAll('[name="size"]')[1]?.value;
    if (cleanupSize) {
        const cleanupPrice = cleanupSize.includes('Small') ? 10 : 
                           cleanupSize.includes('Medium') ? 15 : 20;
        document.getElementById('cleanup-total').textContent = cleanupPrice;
    }

    // Weed Pulling
    const weedHours = document.querySelector('[name="hours"]')?.value;
    if (weedHours) {
        const weedPrice = weedHours.includes('1 hour') ? 5 : 10;
        document.getElementById('weeds-total').textContent = weedPrice;
    }
}

// Add event listeners to all selects
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', calculateTotal);
});

// Payment confirmation popup
function confirmBooking(event, serviceName) {
    const totalElement = document.getElementById(`${serviceName}-total`);
    if (!confirm(`CASH PAYMENT: The ${serviceName} service total will be $${totalElement.textContent}. Payment is due when service is completed. Click OK to confirm your booking.`)) {
        event.preventDefault(); // Cancel form submission if user clicks "Cancel"
    }
}

// Initialize totals on page load
document.addEventListener('DOMContentLoaded', calculateTotal);
