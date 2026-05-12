// Toggle mobile menu
function toggleMenu(){
  var m=document.getElementById('nav-mobile');
  m.style.display=m.style.display==='flex'?'none':'flex';
}

// Toggle FAQ items
function toggleFaq(btn){
  var ans=btn.nextElementSibling;
  var icon=btn.querySelector('.faq-icon');
  var isOpen=ans.classList.contains('show');
  document.querySelectorAll('.faq-ans.show').forEach(function(a){a.classList.remove('show')});
  document.querySelectorAll('.faq-icon.open').forEach(function(i){i.classList.remove('open')});
  if(!isOpen){ans.classList.add('show');icon.classList.add('open')}
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var id=this.getAttribute('href');
    if(id==='#')return;
    var el=document.querySelector(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});
      var m=document.getElementById('nav-mobile');m.style.display='none';}
  });
});

// ══════════════════════════════════════════════════════════════════
// FORM SUBMISSION HANDLER
// ══════════════════════════════════════════════════════════════════

function submitEnquiry(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;
  const zone = document.getElementById('zoneInterest').value;
  const date = document.getElementById('preferredDate').value || 'Not specified';
  const guestCount = document.getElementById('guestCount').value || 'Not specified';
  const message = document.getElementById('userMessage').value || 'No additional message';

  // Validate required fields
  if (!name || !phone || !zone) {
    showMessage('Please fill in all required fields', 'error');
    return;
  }

  // OPTION 1: Send to WhatsApp (Recommended)
  sendToWhatsApp(name, phone, zone, date, guestCount, message);

  // OPTION 2: Send to Email (uncomment to use)
  // sendToEmail(name, phone, zone, date, guestCount, message);
}

// ══════════════════════════════════════════════════════════════════
// OPTION 1: SEND TO WHATSAPP
// ══════════════════════════════════════════════════════════════════
function sendToWhatsApp(name, phone, zone, date, guestCount, message) {
  // Format the message for WhatsApp
  const whatsappMessage = `
🌿 *NEW ENQUIRY - Mytri Farm*

👤 *Name:* ${name}
📱 *Phone:* ${phone}
🏡 *Zone Interested:* ${zone}
📅 *Preferred Date:* ${date}
👥 *Guest Count:* ${guestCount}
💬 *Message:* ${message}

---
Enquiry submitted via website form
  `.trim();

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Your WhatsApp number (use international format without + or spaces)
  const whatsappNumber = '971556909955';

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Show success message
  showMessage('Redirecting to WhatsApp...', 'success');

  // Open WhatsApp after a brief delay
  setTimeout(() => {
    window.open(whatsappURL, '_blank');

    // Reset form
    document.getElementById('enquiryForm').reset();

    // Update message
    showMessage('Enquiry sent! Please complete sending via WhatsApp.', 'success');
  }, 500);
}

// ══════════════════════════════════════════════════════════════════
// OPTION 2: SEND TO EMAIL (Using mailto:)
// Note: This opens the user's email client
// ══════════════════════════════════════════════════════════════════
function sendToEmail(name, phone, zone, date, guestCount, message) {
  // Your email address
  const emailAddress = 'your-email@example.com'; // REPLACE WITH YOUR EMAIL

  // Format email subject
  const subject = `New Enquiry from ${name} - Mytri Farm`;

  // Format email body
  const body = `
NEW ENQUIRY - Mytri Farm Website

Name: ${name}
Phone: ${phone}
Zone Interested: ${zone}
Preferred Date: ${date}
Guest Count: ${guestCount}

Message:
${message}

---
Enquiry submitted via website contact form
  `.trim();

  // Create mailto URL
  const mailtoURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Show success message
  showMessage('Opening email client...', 'success');

  // Open email client
  setTimeout(() => {
    window.location.href = mailtoURL;

    // Reset form
    document.getElementById('enquiryForm').reset();

    // Update message
    showMessage('Please send the email from your email client.', 'success');
  }, 500);
}

// ══════════════════════════════════════════════════════════════════
// OPTION 3: SEND TO EMAIL (Using a Backend Service)
// For this to work, you need a backend service like:
// - FormSubmit.co (free, no backend needed)
// - EmailJS (free tier available)
// - Your own backend API
// ══════════════════════════════════════════════════════════════════

// Example using FormSubmit.co (uncomment to use):
/*
function sendToEmailService(name, phone, zone, date, guestCount, message) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('zone', zone);
  formData.append('date', date);
  formData.append('guestCount', guestCount);
  formData.append('message', message);

  fetch('https://formsubmit.co/your-email@example.com', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      showMessage('Enquiry sent successfully! We\'ll contact you soon.', 'success');
      document.getElementById('enquiryForm').reset();
    } else {
      showMessage('Failed to send enquiry. Please try WhatsApp instead.', 'error');
    }
  })
  .catch(error => {
    showMessage('Failed to send enquiry. Please try WhatsApp instead.', 'error');
  });
}
*/

// ══════════════════════════════════════════════════════════════════
// HELPER FUNCTION: Show messages
// ══════════════════════════════════════════════════════════════════
function showMessage(text, type) {
  const messageDiv = document.getElementById('formMessage');
  messageDiv.textContent = text;
  messageDiv.className = 'form-message ' + type + ' show';

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.classList.remove('show');
  }, 5000);
}
