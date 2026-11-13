/**
 * ALIENTO - Current Offers & Promotions
 * Easily add, edit or expire offers in the array below.
 */

const offers = [
  {
    id: 'offer-1',
    badge: 'Special Welcome Offer',
    title: 'Complimentary Shapemaster Trial Session',
    description: 'Experience our signature 8-machine low-impact circuit with personal guidance from our friendly team. Perfect for first-time visitors looking for comfortable, supportive movement.',
    expiry: 'Ongoing Welcome Offer for New Visitors',
    terms: 'Valid for first-time female visitors to Aliento Scoresby. Booking is essential.',
    whatsappMessage: 'Hi Aliento, I would like to claim the Complimentary Shapemaster Trial Offer.'
  },
  {
    id: 'offer-2',
    badge: 'Rest & Recover Combo',
    title: 'Wellness Starter Duo: Vibrosaun + Massage Chair',
    description: 'Pair 30 minutes of soothing dry heat sauna and gentle whole-body vibration with a tailored therapeutic massage chair session to completely unwind tight muscles.',
    expiry: 'Limited Slots Available This Month',
    terms: 'Appointments subject to studio availability. Contact us to schedule your duo session.',
    whatsappMessage: 'Hi Aliento, I would like to enquire about the Wellness Starter Duo (Vibrosaun + Massage Chair).'
  },
  {
    id: 'offer-3',
    badge: 'Circulation & Tone',
    title: 'VacuShape Introduction Package',
    description: 'Discover the benefits of gentle walking with low-pressure vacuum assistance. Designed to support healthy circulation and complement your regular weekly wellness routine.',
    expiry: 'Available for New VacuShape Clients',
    terms: 'Includes initial induction and equipment walkthrough with our team.',
    whatsappMessage: 'Hi Aliento, I would like to claim the VacuShape Introduction Package.'
  },
  {
    id: 'offer-4',
    badge: 'Bring a Friend',
    title: 'Women’s Wellness Companion Pass',
    description: 'Movement is always more enjoyable together. Book your trial with a friend, sister, or mother and enjoy your first visit side-by-side in our relaxed Scoresby studio.',
    expiry: 'Ongoing Special',
    terms: 'Both guests must be first-time visitors. Prior booking required.',
    whatsappMessage: 'Hi Aliento, I would like to book a Companion Trial for myself and a friend.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderOffers();
});

/**
 * Render offers into container
 */
function renderOffers() {
  const container = document.getElementById('offersContainer');
  if (!container) return;

  container.innerHTML = offers.map(offer => `
    <div class="offer-card reveal">
      <div class="offer-kicker">${offer.badge}</div>
      <h3>${offer.title}</h3>
      <p>${offer.description}</p>
      <div class="offer-validity">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>${offer.expiry}</span>
      </div>
      <button type="button" class="btn btn-whatsapp" onclick="openWhatsApp('${escapeJs(offer.whatsappMessage)}')">
        <span>Claim This Offer</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
      <div class="offer-terms">* ${offer.terms}</div>
    </div>
  `).join('');

  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

function escapeJs(str) {
  return str.replace(/'/g, "\\'");
}
