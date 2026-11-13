/**
 * ALIENTO - Fitness Awareness & Community Posts
 * Easily add or edit posts in the array below.
 */

const awarenessPosts = [
  {
    id: 'post-1',
    title: 'Why Low-Impact Movement Is a Game-Changer for Women 40+',
    category: 'Women’s Wellness',
    date: '14 September 2026',
    readTime: '4 min read',
    image: 'assets/images/shapemaster.jpg',
    excerpt: 'Gentle, power-assisted resistance protects your joints while encouraging circulation, core strength, and natural mobility without exhausting your nervous system.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  },
  {
    id: 'post-2',
    title: 'The Calming Science of Dry Heat & Gentle Vibration',
    category: 'Healthy Habits',
    date: '02 September 2026',
    readTime: '3 min read',
    image: 'assets/images/vibrosaun.jpg',
    excerpt: 'How combining dry warmth and soothing whole-body vibration creates an environment of deep physical decompression, helping ease muscle tightness after a busy week.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  },
  {
    id: 'post-3',
    title: 'Understanding Vacuum Walking: Moving with Gentle Support',
    category: 'Workout Ideas',
    date: '24 August 2026',
    readTime: '5 min read',
    image: 'assets/images/vacushape.jpg',
    excerpt: 'A closer look at how gentle low-impact walking enclosed in sub-atmospheric pressure supports lower-body circulation and body shaping without high-impact strain.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  },
  {
    id: 'post-4',
    title: '5 Daily Micro-Habits for Sustained Energy Throughout the Day',
    category: 'Lifestyle',
    date: '10 August 2026',
    readTime: '3 min read',
    image: 'assets/images/hero.jpg',
    excerpt: 'Practical, restorative routines you can introduce into your morning and afternoon without overhauling your entire schedule or feeling overwhelmed.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  },
  {
    id: 'post-5',
    title: 'Why Traditional Gyms Don’t Work for Everyone',
    category: 'Fitness Tips',
    date: '28 July 2026',
    readTime: '4 min read',
    image: 'assets/images/shapemaster.jpg',
    excerpt: 'Intimidation, loud music, and aggressive expectations often lead to burnout. Here is how a women-only, supportive setting helps build sustainable consistency.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  },
  {
    id: 'post-6',
    title: 'Spring Wellness Update: What’s New at Aliento Scoresby',
    category: 'Aliento Updates',
    date: '15 July 2026',
    readTime: '2 min read',
    image: 'assets/images/massage-chair.jpg',
    excerpt: 'Welcoming new members, updated trial session slots, and our latest tips for keeping up with comfortable movement as the weather warms up in Victoria.',
    facebookLink: 'https://web.facebook.com/alientoWellbeing'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderAwarenessPosts('All');
  initAwarenessFilters();
});

/**
 * Render awareness posts filtered by category
 * @param {string} selectedCategory
 */
function renderAwarenessPosts(selectedCategory = 'All') {
  const container = document.getElementById('awarenessGrid');
  if (!container) return;

  const filtered = selectedCategory === 'All'
    ? awarenessPosts
    : awarenessPosts.filter(p => p.category === selectedCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
        <p style="color: var(--color-text-muted);">No posts found in this category yet. Check back soon!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(post => `
    <article class="article-card reveal" data-category="${post.category}">
      <div class="article-media">
        <img src="${post.image}" alt="${post.title}" loading="lazy" />
      </div>
      <div class="article-body">
        <div class="article-meta">
          <span class="article-category">${post.category}</span>
          <span aria-hidden="true">·</span>
          <span>${post.date}</span>
          <span aria-hidden="true">·</span>
          <span>${post.readTime}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="article-footer">
          <a href="${post.facebookLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:0.4rem;">
            <span>Read on Facebook</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Re-observe newly created elements for reveal animation
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

/**
 * Filter button click handling
 */
function initAwarenessFilters() {
  const filterBtns = document.querySelectorAll('.awareness-filter-bar .filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter') || 'All';
      renderAwarenessPosts(category);
    });
  });
}
